package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

var (
	localhostRegex = regexp.MustCompile(`https?://(?:localhost|127\.0\.0\.1)(?::\d+)?(?:/[^\s"']*)?`)
	nodeEnvDevRegex = regexp.MustCompile(`(?:NODE_ENV\s*===?\s*['"]development['"]|NODE_ENV\s*!==?\s*['"]production['"])`)
	envUsageRegex  = regexp.MustCompile(`(?:process\.env\.([A-Z0-9_]+)|os\.(?:getenv|Getenv)\(["']([A-Z0-9_]+)["']\)|\$env:([A-Z0-9_]+))`)
	debugFlagRegex = regexp.MustCompile(`(?i)(?:^|[\s,;{])(?:"?debug"?\s*[:=]\s*(?:true|1)|"?verbose"?\s*[:=]\s*(?:true|1)|"?log_level"?\s*[:=]\s*["']debug["'])`)
)

func isTestFile(path string) bool {
	lower := strings.ToLower(filepath.ToSlash(path))
	if strings.Contains(lower, "/test/") || strings.Contains(lower, "/tests/") || strings.Contains(lower, "/__tests__/") {
		return true
	}
	if strings.HasSuffix(lower, ".test.ts") || strings.HasSuffix(lower, ".test.js") || strings.HasSuffix(lower, ".test.tsx") || strings.HasSuffix(lower, ".test.jsx") ||
		strings.HasSuffix(lower, ".spec.ts") || strings.HasSuffix(lower, ".spec.js") || strings.HasSuffix(lower, ".spec.tsx") || strings.HasSuffix(lower, "_test.go") ||
		strings.HasSuffix(lower, "test_") || strings.HasSuffix(lower, "_test.py") {
		return true
	}
	return false
}

// CheckEnvironmentParity scans files for environment parity risks
func CheckEnvironmentParity(targetDir string) []StandardFinding {
	var findings []StandardFinding
	counter := 1

	skipDirs := map[string]bool{
		".git": true, "node_modules": true, ".next": true, "dist": true,
		"build": true, "venv": true, ".venv": true, "__pycache__": true,
		".turbo": true, "coverage": true,
	}

	usedEnvVars := make(map[string]string) // varName -> file:line
	exampleEnvVars := make(map[string]bool)

	// 1. Read .env.example if present
	examplePath := filepath.Join(targetDir, ".env.example")
	if data, err := os.ReadFile(examplePath); err == nil {
		scanner := bufio.NewScanner(strings.NewReader(string(data)))
		for scanner.Scan() {
			line := strings.TrimSpace(scanner.Text())
			if strings.HasPrefix(line, "#") || line == "" {
				continue
			}
			parts := strings.SplitN(line, "=", 2)
			if len(parts) > 0 {
				varName := strings.TrimSpace(parts[0])
				if varName != "" {
					exampleEnvVars[varName] = true
				}
			}
		}
	}

	// 2. Walk workspace
	filepath.Walk(targetDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		if info.IsDir() {
			if skipDirs[info.Name()] {
				return filepath.SkipDir
			}
			return nil
		}

		relPath, _ := filepath.Rel(targetDir, path)
		relPathSlash := filepath.ToSlash(relPath)

		// Skip binaries / images / minified files
		ext := strings.ToLower(filepath.Ext(path))
		if ext == ".png" || ext == ".jpg" || ext == ".jpeg" || ext == ".gif" || ext == ".ico" ||
			ext == ".svg" || ext == ".exe" || ext == ".dll" || ext == ".zip" || ext == ".tar" ||
			ext == ".gz" || ext == ".map" || ext == ".lock" {
			return nil
		}

		file, err := os.Open(path)
		if err != nil {
			return nil
		}
		defer file.Close()

		isTest := isTestFile(relPathSlash)
		scanner := bufio.NewScanner(file)
		lineNum := 1

		for scanner.Scan() {
			line := scanner.Text()

			// Check hardcoded localhost outside tests
			if !isTest && localhostRegex.MatchString(line) {
				match := localhostRegex.FindString(line)
				findings = append(findings, StandardFinding{
					ID:               fmt.Sprintf("ENV-%03d", counter),
					Category:         "env",
					Severity:         "HIGH",
					Confidence:       "HIGH",
					Status:           "CONFIRMED",
					Evidence:         fmt.Sprintf("%s:%d — Hardcoded localhost URL: \"%s\"", relPathSlash, lineNum, match),
					Impact:           "Hardcoded localhost URLs will cause API failures when deployed to production",
					RecommendedFix:   "Replace with process.env.API_URL or environment-configurable base URL",
					ChangeRisk:       "LOW",
					ApprovalRequired: false,
					File:             relPathSlash,
					Line:             lineNum,
				})
				counter++
			}

			// Check NODE_ENV === 'development' in non-test production code
			if !isTest && nodeEnvDevRegex.MatchString(line) {
				findings = append(findings, StandardFinding{
					ID:               fmt.Sprintf("ENV-%03d", counter),
					Category:         "env",
					Severity:         "MEDIUM",
					Confidence:       "MEDIUM",
					Status:           "LIKELY",
					Evidence:         fmt.Sprintf("%s:%d — NODE_ENV development branch in production code", relPathSlash, lineNum),
					Impact:           "Branching on development mode inside production code can cause unexpected feature omissions",
					RecommendedFix:   "Use explicit feature flags rather than ambient environment mode branching",
					ChangeRisk:       "LOW",
					ApprovalRequired: false,
					File:             relPathSlash,
					Line:             lineNum,
				})
				counter++
			}

			// Check debug flags active in config files
			if strings.HasSuffix(relPathSlash, ".json") || strings.HasSuffix(relPathSlash, ".yaml") || strings.HasSuffix(relPathSlash, ".yml") || strings.HasSuffix(relPathSlash, ".toml") {
				if debugFlagRegex.MatchString(line) {
					findings = append(findings, StandardFinding{
						ID:               fmt.Sprintf("ENV-%03d", counter),
						Category:         "env",
						Severity:         "LOW",
						Confidence:       "HIGH",
						Status:           "CONFIRMED",
						Evidence:         fmt.Sprintf("%s:%d — Active debug/verbose flag in committed config", relPathSlash, lineNum),
						Impact:           "Verbose debug logging in production can degrade performance and leak internal state",
						RecommendedFix:   "Ensure debug flags default to false or are gated by production environment config",
						ChangeRisk:       "LOW",
						ApprovalRequired: false,
						File:             relPathSlash,
						Line:             lineNum,
					})
					counter++
				}
			}

			// Track env var usages
			matches := envUsageRegex.FindAllStringSubmatch(line, -1)
			for _, m := range matches {
				var varName string
				if len(m) > 1 && m[1] != "" {
					varName = m[1]
				} else if len(m) > 2 && m[2] != "" {
					varName = m[2]
				} else if len(m) > 3 && m[3] != "" {
					varName = m[3]
				}
				if varName != "" && varName != "NODE_ENV" && varName != "PORT" {
					if _, exists := usedEnvVars[varName]; !exists {
						usedEnvVars[varName] = fmt.Sprintf("%s:%d", relPathSlash, lineNum)
					}
				}
			}

			lineNum++
		}

		return nil
	})

	// 3. If .env.example exists, check for missing variables
	if len(exampleEnvVars) > 0 {
		var missingVars []string
		for varName := range usedEnvVars {
			if !exampleEnvVars[varName] {
				missingVars = append(missingVars, varName)
			}
		}
		if len(missingVars) > 0 {
			findings = append(findings, StandardFinding{
				ID:               fmt.Sprintf("ENV-%03d", counter),
				Category:         "env",
				Severity:         "MEDIUM",
				Confidence:       "HIGH",
				Status:           "CONFIRMED",
				Evidence:         fmt.Sprintf(".env.example — Missing documentation for environment variables used in code: %s", strings.Join(missingVars, ", ")),
				Impact:           "Deployments will fail silently or crash when required environment variables are not documented",
				RecommendedFix:   "Add missing keys with placeholder values to .env.example",
				ChangeRisk:       "LOW",
				ApprovalRequired: false,
				File:             ".env.example",
			})
			counter++
		}
	}

	return findings
}

func cmdEnv(args []string) {
	jsonOutput := false
	targetDir := getRootDir()

	for _, arg := range args {
		if arg == "--report" || arg == "--json" {
			jsonOutput = true
		} else if arg == "json" && len(args) > 1 {
			jsonOutput = true
		} else if !strings.HasPrefix(arg, "--") {
			targetDir = arg
		}
	}

	findings := CheckEnvironmentParity(targetDir)

	if jsonOutput {
		scoreReport := CalculateScore(findings)
		fullReport := StandardReport{
			Tool:       "vibe-audit",
			Version:    "0.2.0",
			Subcommand: "env",
			Timestamp:  time.Now().UTC().Format(time.RFC3339),
			Findings:   findings,
			Score:      &scoreReport,
		}
		outBytes, _ := json.MarshalIndent(fullReport, "", "  ")
		fmt.Println(string(outBytes))
		return
	}

	fmt.Printf("vibe-audit env %s\n\n", targetDir)
	if len(findings) == 0 {
		fmt.Println("No environment parity issues detected. ✓")
		return
	}

	for _, f := range findings {
		fmt.Printf("%-9s %s\n", f.Severity, f.Evidence)
		if f.RecommendedFix != "" {
			fmt.Printf("          Fix: %s\n", f.RecommendedFix)
		}
	}

	fmt.Printf("\n%d finding(s). Run with --report json for structured output.\n", len(findings))
}
