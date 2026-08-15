package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

// SecurityFinding represents a deterministic issue found before the AI runs
type SecurityFinding struct {
	File     string
	Line     int
	Severity string
	Rule     string
	Message  string
}

var (
	// Regex for detecting potential secrets (Basic heuristic)
	secretRegexes = map[string]*regexp.Regexp{
		"AWS Access Key":  regexp.MustCompile(`(?i)\b(?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}\b`),
		"Generic API Key": regexp.MustCompile(`(?i)(?:api[_-]?key|secret|token|password)[\s]*[=:]\s*["'][a-zA-Z0-9\-_]{16,}["']`),
		"RSA Private Key": regexp.MustCompile(`-----BEGIN (?:RSA )?PRIVATE KEY-----`),
	}
)

// ScanWorkspace performs a lightweight static analysis of the workspace
func ScanWorkspace(root string) []SecurityFinding {
	var findings []SecurityFinding

	// Skip common heavy directories
	skipDirs := map[string]bool{
		".git": true, "node_modules": true, "venv": true, ".venv": true,
		"__pycache__": true, "build": true, "dist": true,
	}

	filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		if info.IsDir() {
			if skipDirs[info.Name()] {
				return filepath.SkipDir
			}
			return nil
		}

		// Only scan text-like files (basic heuristic: skip known binary extensions)
		ext := strings.ToLower(filepath.Ext(path))
		if ext == ".png" || ext == ".jpg" || ext == ".exe" || ext == ".dll" || ext == ".zip" || ext == ".tar" {
			return nil
		}

		scanFileForSecrets(path, root, &findings)
		return nil
	})

	return findings
}

func scanFileForSecrets(path string, root string, findings *[]SecurityFinding) {
	file, err := os.Open(path)
	if err != nil {
		return
	}
	defer file.Close()

	relPath, _ := filepath.Rel(root, path)
	scanner := bufio.NewScanner(file)
	lineNum := 1

	for scanner.Scan() {
		line := scanner.Text()
		
		// Check against secret regexes
		for ruleName, regex := range secretRegexes {
			if regex.MatchString(line) {
				*findings = append(*findings, SecurityFinding{
					File:     relPath,
					Line:     lineNum,
					Severity: "HIGH",
					Rule:     "Hardcoded Secret",
					Message:  fmt.Sprintf("Potential %s detected", ruleName),
				})
			}
		}
		
		// Check for malicious / risky execution patterns in package.json
		if filepath.Base(path) == "package.json" {
			if strings.Contains(line, "\"postinstall\"") || strings.Contains(line, "\"preinstall\"") {
				*findings = append(*findings, SecurityFinding{
					File:     relPath,
					Line:     lineNum,
					Severity: "MEDIUM",
					Rule:     "Lifecycle Hook",
					Message:  "NPM lifecycle hook detected. Untrusted code may execute on install.",
				})
			}
		}

		lineNum++
	}
}
