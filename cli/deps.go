package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type PackageManifest struct {
	Name            string            `json:"name"`
	Version         string            `json:"version"`
	License         string            `json:"license"`
	Dependencies    map[string]string `json:"dependencies"`
	DevDependencies map[string]string `json:"devDependencies"`
}

// Known CVE signatures for deterministic offline detection
var knownVulnerablePackages = map[string]struct {
	BadPrefixes []string
	CVE         string
	Severity    string
	Description string
	Fix         string
}{
	"lodash": {
		BadPrefixes: []string{"4.17.20", "4.17.19", "4.17.15", "4.17.11", "4.17.0", "^4.17.20", "~4.17.20"},
		CVE:         "CVE-2021-23337",
		Severity:    "CRITICAL",
		Description: "Prototype pollution vulnerability in lodash.template",
		Fix:         "Upgrade to lodash@4.17.21 or higher",
	},
	"event-stream": {
		BadPrefixes: []string{"3.3.6"},
		CVE:         "CVE-2018-3721",
		Severity:    "CRITICAL",
		Description: "Malicious cryptocurrency stealing backdoor payload",
		Fix:         "Remove or downgrade event-stream to safe release",
	},
	"ua-parser-js": {
		BadPrefixes: []string{"0.7.29", "0.8.0", "1.0.0"},
		CVE:         "CVE-2021-42097",
		Severity:    "CRITICAL",
		Description: "Compromised supply-chain package executing credential stealer",
		Fix:         "Upgrade to ua-parser-js@0.7.30 or higher",
	},
	"node-serialize": {
		BadPrefixes: []string{"0.0.4", "0.0.3", "0.0.2", "0.0.1"},
		CVE:         "CVE-2017-5941",
		Severity:    "CRITICAL",
		Description: "Arbitrary code execution via untrusted object deserialization",
		Fix:         "Replace node-serialize with safe JSON/CBOR serializer",
	},
	"minimist": {
		BadPrefixes: []string{"<0.2.1", "<1.2.3", "0.2.0", "1.2.0"},
		CVE:         "CVE-2020-7598",
		Severity:    "HIGH",
		Description: "Prototype pollution in minimist",
		Fix:         "Upgrade to minimist@1.2.6 or higher",
	},
	"json5": {
		BadPrefixes: []string{"<1.0.2", "<2.2.2", "1.0.1", "2.2.1"},
		CVE:         "CVE-2022-46175",
		Severity:    "HIGH",
		Description: "Prototype pollution via JSON5.parse",
		Fix:         "Upgrade to json5@2.2.2 or higher",
	},
}

// Known abandoned or deprecated packages
var knownAbandonedPackages = map[string]struct {
	Reason string
	Fix    string
}{
	"left-pad": {
		Reason: "Package unmaintained since 2019; standard String.prototype.padStart is native in ES2017",
		Fix:    "Use native String.prototype.padStart()",
	},
	"request": {
		Reason: "Package deprecated and unmaintained since Feb 2020",
		Fix:    "Replace with native fetch, axios, or undici",
	},
	"nomnom": {
		Reason: "Package deprecated and unmaintained",
		Fix:    "Replace with commander, yargs, or meow",
	},
	"querystring": {
		Reason: "Legacy Node.js module; WHATWG URLSearchParams is preferred",
		Fix:    "Use standard URLSearchParams",
	},
}

// CheckDependencies scans manifests in the target directory
func CheckDependencies(targetDir string) []StandardFinding {
	var findings []StandardFinding
	counter := 1

	// 1. Scan package.json
	pkgJsonPath := filepath.Join(targetDir, "package.json")
	if data, err := os.ReadFile(pkgJsonPath); err == nil {
		var manifest PackageManifest
		if err := json.Unmarshal(data, &manifest); err == nil {
			// Check license compatibility
			isCommercialContext := manifest.License == "MIT" || manifest.License == "Apache-2.0" || manifest.License == "BSD-3-Clause" || manifest.License == ""
			
			allDeps := make(map[string]string)
			for k, v := range manifest.Dependencies {
				allDeps[k] = v
			}
			for k, v := range manifest.DevDependencies {
				allDeps[k] = v
			}

			for pkgName, pkgVer := range allDeps {
				// Check known CVEs
				if vuln, exists := knownVulnerablePackages[pkgName]; exists {
					for _, bad := range vuln.BadPrefixes {
						if strings.Contains(pkgVer, bad) || pkgVer == bad {
							findings = append(findings, StandardFinding{
								ID:               fmt.Sprintf("DEP-%03d", counter),
								Category:         "dependency",
								Severity:         vuln.Severity,
								Confidence:       "HIGH",
								Status:           "CONFIRMED",
								Evidence:         fmt.Sprintf("%s@%s — %s (%s)", pkgName, pkgVer, vuln.CVE, vuln.Description),
								Impact:           fmt.Sprintf("Vulnerability %s is exploitable via %s", vuln.CVE, pkgName),
								RecommendedFix:   vuln.Fix,
								ChangeRisk:       "LOW",
								ApprovalRequired: false,
								File:             "package.json",
							})
							counter++
							break
						}
					}
				}

				// Check abandoned packages
				if abandoned, exists := knownAbandonedPackages[pkgName]; exists {
					findings = append(findings, StandardFinding{
						ID:               fmt.Sprintf("DEP-%03d", counter),
						Category:         "dependency",
						Severity:         "MEDIUM",
						Confidence:       "HIGH",
						Status:           "CONFIRMED",
						Evidence:         fmt.Sprintf("%s@%s — %s", pkgName, pkgVer, abandoned.Reason),
						Impact:           "Unmaintained dependency will not receive security patches",
						RecommendedFix:   abandoned.Fix,
						ChangeRisk:       "LOW",
						ApprovalRequired: false,
						File:             "package.json",
					})
					counter++
				}

				// Check license incompatibility heuristic
				if isCommercialContext && (strings.Contains(pkgName, "gpl") || strings.Contains(pkgVer, "gpl")) {
					findings = append(findings, StandardFinding{
						ID:               fmt.Sprintf("DEP-%03d", counter),
						Category:         "dependency",
						Severity:         "MEDIUM",
						Confidence:       "MEDIUM",
						Status:           "LIKELY",
						Evidence:         fmt.Sprintf("%s@%s — GPL license detected in non-GPL project context", pkgName, pkgVer),
						Impact:           "GPL copyleft license requires downstream source disclosure if distributed",
						RecommendedFix:   "Replace with MIT / Apache-2.0 licensed alternative",
						ChangeRisk:       "MEDIUM",
						ApprovalRequired: true,
						File:             "package.json",
					})
					counter++
				}
			}

			// Check lockfile presence
			lockfileYarn := filepath.Join(targetDir, "yarn.lock")
			lockfileNpm := filepath.Join(targetDir, "package-lock.json")
			lockfilePnpm := filepath.Join(targetDir, "pnpm-lock.yaml")
			
			if !exists(lockfileNpm) && !exists(lockfileYarn) && !exists(lockfilePnpm) {
				findings = append(findings, StandardFinding{
					ID:               fmt.Sprintf("DEP-%03d", counter),
					Category:         "dependency",
					Severity:         "MEDIUM",
					Confidence:       "HIGH",
					Status:           "CONFIRMED",
					Evidence:         "package.json exists but no package-lock.json, yarn.lock, or pnpm-lock.yaml found",
					Impact:           "Builds are non-deterministic; upstream patch updates can break production without warning",
					RecommendedFix:   "Run package manager install and commit the generated lockfile",
					ChangeRisk:       "LOW",
					ApprovalRequired: false,
					File:             "package.json",
				})
				counter++
			}
		}
	}

	// 2. Scan requirements.txt (Python)
	reqPath := filepath.Join(targetDir, "requirements.txt")
	if data, err := os.ReadFile(reqPath); err == nil {
		lines := strings.Split(string(data), "\n")
		for lineIdx, line := range lines {
			line = strings.TrimSpace(line)
			if strings.HasPrefix(line, "#") || line == "" {
				continue
			}
			if strings.Contains(line, "urllib3<1.26.5") || strings.Contains(line, "urllib3==1.24") {
				findings = append(findings, StandardFinding{
					ID:               fmt.Sprintf("DEP-%03d", counter),
					Category:         "dependency",
					Severity:         "HIGH",
					Confidence:       "HIGH",
					Status:           "CONFIRMED",
					Evidence:         fmt.Sprintf("requirements.txt:%d — urllib3 vulnerable version pinned (%s)", lineIdx+1, line),
					Impact:           "Known security vulnerabilities in pinned legacy urllib3",
					RecommendedFix:   "Upgrade to urllib3>=1.26.18 or urllib3>=2.0.0",
					ChangeRisk:       "LOW",
					ApprovalRequired: false,
					File:             "requirements.txt",
					Line:             lineIdx + 1,
				})
				counter++
			}
		}
	}

	return findings
}

func cmdDeps(args []string) {
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

	findings := CheckDependencies(targetDir)

	if jsonOutput {
		scoreReport := CalculateScore(findings)
		fullReport := StandardReport{
			Tool:       "vibe-audit",
			Version:    "0.2.0",
			Subcommand: "deps",
			Timestamp:  time.Now().UTC().Format(time.RFC3339),
			Findings:   findings,
			Score:      &scoreReport,
		}
		outBytes, _ := json.MarshalIndent(fullReport, "", "  ")
		fmt.Println(string(outBytes))
		return
	}

	fmt.Printf("vibe-audit deps %s\n\n", targetDir)
	if len(findings) == 0 {
		fmt.Println("No dependency vulnerabilities or anomalies detected. ✓")
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
