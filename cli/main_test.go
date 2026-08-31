package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestExportRules(t *testing.T) {
	// Create a temporary directory to act as our workspace root
	tempDir, err := os.MkdirTemp("", "vibe-audit-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	// Run the export command targeting the temp dir
	cmdExport([]string{tempDir})

	// Verify the 8 rule files were created
	expectedFiles := []string{
		filepath.Join(tempDir, ".cursor", "rules", "vibe-audit.mdc"),
		filepath.Join(tempDir, ".windsurfrules"),
		filepath.Join(tempDir, ".github", "copilot-instructions.md"),
		filepath.Join(tempDir, ".clinerules"),
		filepath.Join(tempDir, "CONVENTIONS.md"),
		filepath.Join(tempDir, ".continue", "rules", "vibe-audit.md"),
		filepath.Join(tempDir, ".goosehints"),
		filepath.Join(tempDir, ".amazonq", "rules", "vibe-audit.md"),
	}

	for _, file := range expectedFiles {
		if _, err := os.Stat(file); os.IsNotExist(err) {
			t.Errorf("Expected file was not created: %s", file)
		} else {
			// Verify file has content
			content, err := os.ReadFile(file)
			if err != nil || len(content) < 10 {
				t.Errorf("File %s is empty or could not be read", file)
			}
		}
	}
}
func TestDepsScanner(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-deps-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	// Create package.json with known CVE (lodash 4.17.20) and abandoned package (left-pad)
	pkgContent := `{
		"name": "test-app",
		"version": "1.0.0",
		"dependencies": {
			"lodash": "4.17.20",
			"left-pad": "1.3.0"
		}
	}`
	if err := os.WriteFile(filepath.Join(tempDir, "package.json"), []byte(pkgContent), 0644); err != nil {
		t.Fatalf("Failed to write test package.json: %v", err)
	}

	findings := CheckDependencies(tempDir)
	if len(findings) < 2 {
		t.Fatalf("Expected at least 2 findings (CVE + abandoned/lockfile), got %d", len(findings))
	}

	hasCVE := false
	hasAbandoned := false
	for _, f := range findings {
		if f.Severity == "CRITICAL" {
			hasCVE = true
		}
		if f.Severity == "MEDIUM" {
			hasAbandoned = true
		}
	}

	if !hasCVE {
		t.Errorf("Expected CRITICAL finding for lodash@4.17.20 CVE")
	}
	if !hasAbandoned {
		t.Errorf("Expected MEDIUM finding for abandoned left-pad / missing lockfile")
	}
}

func TestEnvChecker(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-env-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	// Create source file with hardcoded localhost
	srcContent := `export const API_URL = "http://localhost:3000/api";`
	if err := os.WriteFile(filepath.Join(tempDir, "client.ts"), []byte(srcContent), 0644); err != nil {
		t.Fatalf("Failed to write test client.ts: %v", err)
	}

	findings := CheckEnvironmentParity(tempDir)
	if len(findings) == 0 {
		t.Fatalf("Expected finding for hardcoded localhost in client.ts")
	}

	hasLocalhostFinding := false
	for _, f := range findings {
		if f.Severity == "HIGH" && f.Category == "env" {
			hasLocalhostFinding = true
		}
	}
	if !hasLocalhostFinding {
		t.Errorf("Expected HIGH severity env finding for hardcoded localhost")
	}
}

func TestScoreCalculator(t *testing.T) {
	// 1. Clean findings -> 100/100 READY
	cleanScore := CalculateScore([]StandardFinding{})
	if cleanScore.Overall != 100 || cleanScore.Readiness != "READY" {
		t.Errorf("Expected 100 READY for clean findings, got %d %s", cleanScore.Overall, cleanScore.Readiness)
	}

	// 2. Known findings with 2 CRITICAL security findings -> expected score deduction
	testFindings := []StandardFinding{
		{Category: "security", Severity: "CRITICAL", Evidence: "IDOR"},
		{Category: "security", Severity: "CRITICAL", Evidence: "SQLi"},
	}
	score := CalculateScore(testFindings)
	// Security dimension: 100 - (25*2) = 50.
	// Weighted: (50 * 0.3) + (100 * 0.7) = 15 + 70 = 85
	if score.Overall < 80 || score.Overall > 90 {
		t.Errorf("Expected overall score around 85 for 2 critical security issues, got %d", score.Overall)
	}
	if score.Dimensions["security"].Score != 50 {
		t.Errorf("Expected security dimension score 50, got %d", score.Dimensions["security"].Score)
	}
}
