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
	// Regex for detecting potential secrets
	secretRegexes = map[string]*regexp.Regexp{
		"AWS Access Key":          regexp.MustCompile(`(?i)\b(?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}\b`),
		"Generic API Key":         regexp.MustCompile(`(?i)(?:api[_-]?key|secret|token|password)[\s]*[=:]\s*["'][a-zA-Z0-9\-_]{16,}["']`),
		"RSA Private Key":         regexp.MustCompile(`-----BEGIN (?:RSA )?PRIVATE KEY-----`),
		"Exposed Frontend Secret": regexp.MustCompile(`(?i)\bNEXT_PUBLIC_[A-Z0-9_]*(?:SECRET|PRIVATE|SERVICE_ROLE|ADMIN_KEY)\b`),
	}

	// Mobile insecure storage
	asyncStorageTokenRegex = regexp.MustCompile(`(?i)AsyncStorage\.setItem\s*\(\s*["'](?:auth|token|jwt|password|secret|session|access_token|refresh_token)`)

	// Desktop Electron insecurity
	electronNodeIntegrationRegex = regexp.MustCompile(`(?i)\bnodeIntegration\s*:\s*true\b`)
	electronContextIsolationRegex = regexp.MustCompile(`(?i)\bcontextIsolation\s*:\s*false\b`)

	// Extension MV3 background timers
	mv3TimerRegex = regexp.MustCompile(`(?i)\b(?:setInterval|setTimeout)\s*\(`)

	// AI / LLM token waste & unbounded chat
	llmUnboundedChatRegex = regexp.MustCompile(`(?i)\bmessages\s*:\s*\[\s*\.\.\.(?:chatHistory|allMessages|conversationHistory|history|messages)\s*\]`)
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
				sev := "HIGH"
				if ruleName == "Exposed Frontend Secret" {
					sev = "CRITICAL"
				}
				*findings = append(*findings, SecurityFinding{
					File:     relPath,
					Line:     lineNum,
					Severity: sev,
					Rule:     "Hardcoded Secret",
					Message:  fmt.Sprintf("Potential %s detected", ruleName),
				})
			}
		}

		// Check for mobile unencrypted AsyncStorage auth token usage
		if asyncStorageTokenRegex.MatchString(line) {
			*findings = append(*findings, SecurityFinding{
				File:     relPath,
				Line:     lineNum,
				Severity: "HIGH",
				Rule:     "Insecure Mobile Storage",
				Message:  "Sensitive auth credential written to unencrypted AsyncStorage (use Keychain/Keystore)",
			})
		}

		// Check for desktop Electron webPreferences misconfiguration
		if electronNodeIntegrationRegex.MatchString(line) {
			*findings = append(*findings, SecurityFinding{
				File:     relPath,
				Line:     lineNum,
				Severity: "CRITICAL",
				Rule:     "Electron Node Integration",
				Message:  "Dangerous nodeIntegration: true detected in Electron webPreferences (allows RCE)",
			})
		}
		if electronContextIsolationRegex.MatchString(line) {
			*findings = append(*findings, SecurityFinding{
				File:     relPath,
				Line:     lineNum,
				Severity: "CRITICAL",
				Rule:     "Electron Context Isolation Disabled",
				Message:  "Dangerous contextIsolation: false detected in Electron webPreferences",
			})
		}

		// Check for Extension MV3 background timers
		baseName := strings.ToLower(filepath.Base(path))
		if baseName == "background.js" || baseName == "background.ts" || baseName == "service-worker.js" || baseName == "sw.js" {
			if mv3TimerRegex.MatchString(line) {
				*findings = append(*findings, SecurityFinding{
					File:     relPath,
					Line:     lineNum,
					Severity: "MEDIUM",
					Rule:     "MV3 Timer Killed on Idle",
					Message:  "setInterval/setTimeout in MV3 service worker will be terminated on sleep (use chrome.alarms)",
				})
			}
		}
		

		// Check for AI / LLM unbounded chat history
		if llmUnboundedChatRegex.MatchString(line) {
			*findings = append(*findings, SecurityFinding{
				File:     relPath,
				Line:     lineNum,
				Severity: "MEDIUM",
				Rule:     "LLM Token Waste / Unbounded History",
				Message:  "Unbounded chat message history passed directly to LLM (risk of context explosion and runaway token spend)",
			})
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
	}
}
