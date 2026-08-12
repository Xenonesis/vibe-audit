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

	// Verify the 6 rule files were created
	expectedFiles := []string{
		filepath.Join(tempDir, ".cursor", "rules", "vibe-audit.mdc"),
		filepath.Join(tempDir, ".windsurfrules"),
		filepath.Join(tempDir, ".github", "copilot-instructions.md"),
		filepath.Join(tempDir, ".clinerules"),
		filepath.Join(tempDir, "CONVENTIONS.md"),
		filepath.Join(tempDir, ".continue", "rules", "vibe-audit.md"),
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
