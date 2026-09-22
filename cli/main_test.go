package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
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

func TestDomainSecurityScanner(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-domain-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	// 1. Mobile file with unencrypted AsyncStorage token
	mobileContent := `import AsyncStorage from '@react-native-async-storage/async-storage';
export async function saveAuth(token: string) {
    await AsyncStorage.setItem("auth_token", token);
}`
	if err := os.WriteFile(filepath.Join(tempDir, "auth.ts"), []byte(mobileContent), 0644); err != nil {
		t.Fatalf("Failed to write auth.ts: %v", err)
	}

	// 2. Desktop file with Electron nodeIntegration: true
	electronContent := `const mainWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
});`
	if err := os.WriteFile(filepath.Join(tempDir, "main.js"), []byte(electronContent), 0644); err != nil {
		t.Fatalf("Failed to write main.js: %v", err)
	}

	// 3. Extension MV3 background file with setInterval
	extContent := `setInterval(() => {
    console.log("tick");
}, 1000);`
	if err := os.WriteFile(filepath.Join(tempDir, "background.js"), []byte(extContent), 0644); err != nil {
		t.Fatalf("Failed to write background.js: %v", err)
	}

	// 4. LLM file with unbounded chat message history
	llmContent := `const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [...chatHistory]
});`
	if err := os.WriteFile(filepath.Join(tempDir, "agent.ts"), []byte(llmContent), 0644); err != nil {
		t.Fatalf("Failed to write agent.ts: %v", err)
	}

	findings := ScanWorkspace(tempDir)
	if len(findings) < 5 {
		t.Fatalf("Expected at least 5 domain security findings, got %d", len(findings))
	}

	hasMobile := false
	hasElectronNode := false
	hasElectronCtx := false
	hasExtTimer := false

	hasLLMUnbounded := false
	for _, f := range findings {
		if f.Rule == "Insecure Mobile Storage" {
			hasMobile = true
		}
		if f.Rule == "Electron Node Integration" {
			hasElectronNode = true
		}
		if f.Rule == "Electron Context Isolation Disabled" {
			hasElectronCtx = true
		}
		if f.Rule == "MV3 Timer Killed on Idle" {
			hasExtTimer = true
		}
		if f.Rule == "LLM Token Waste / Unbounded History" {
			hasLLMUnbounded = true
		}
	}
	if !hasMobile {
		t.Errorf("Expected Insecure Mobile Storage finding")
	}
	if !hasElectronNode {
		t.Errorf("Expected Electron Node Integration finding")
	}
	if !hasElectronCtx {
		t.Errorf("Expected Electron Context Isolation Disabled finding")
	}
	if !hasExtTimer {
		t.Errorf("Expected MV3 Timer Killed on Idle finding")
	}
	if !hasLLMUnbounded {
		t.Errorf("Expected LLM Token Waste / Unbounded History finding")
	}
}

func TestPreflightAuditabilityGate(t *testing.T) {
	// 1. Empty target directory should return IsAuditable = false
	emptyDir, err := os.MkdirTemp("", "vibe-audit-empty")
	if err != nil {
		t.Fatalf("Failed to create empty temp dir: %v", err)
	}
	defer os.RemoveAll(emptyDir)

	emptyStatus := ValidateTargetAuditability(emptyDir)
	if emptyStatus.IsAuditable {
		t.Errorf("Expected empty dir to be non-auditable (IsAuditable = false), got true")
	}

	findings := ScanWorkspace(emptyDir)
	if len(findings) != 1 || findings[0].Rule != "Preflight Auditability Gate" {
		t.Errorf("Expected 1 Preflight Auditability Gate finding on empty dir, got: %+v", findings)
	}

	// 2. Target directory with source code should return IsAuditable = true
	validDir, err := os.MkdirTemp("", "vibe-audit-valid")
	if err != nil {
		t.Fatalf("Failed to create valid temp dir: %v", err)
	}
	defer os.RemoveAll(validDir)

	if err := os.WriteFile(filepath.Join(validDir, "index.ts"), []byte("console.log('hello');"), 0644); err != nil {
		t.Fatalf("Failed to write index.ts: %v", err)
	}

	validStatus := ValidateTargetAuditability(validDir)
	if !validStatus.IsAuditable {
		t.Errorf("Expected dir with index.ts to be auditable (IsAuditable = true), got false")
	}
}

func TestUXHeuristicsScanner(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-ux-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	componentContent := `import React from 'react';

export function UserCard({ id }: { id: string }) {
    return (
        <div>
            {/* Fitts's Law: undersized icon button with p-0 */}
            <button className="p-0 text-gray-500"><svg /></button>

            {/* Doherty Threshold: async onClick without disabled/loading */}
            <button onClick={async () => await fetch('/api/refresh')}>Refresh</button>

            {/* Peak-End: unconfirmed destructive action */}
            <button onClick={() => deleteUser(id)}>Delete Account</button>
        </div>
    );
}
`
	if err := os.WriteFile(filepath.Join(tempDir, "UserCard.tsx"), []byte(componentContent), 0644); err != nil {
		t.Fatalf("Failed to write UserCard.tsx: %v", err)
	}

	findings := ScanWorkspace(tempDir)
	if len(findings) < 3 {
		t.Fatalf("Expected at least 3 UX findings, got %d", len(findings))
	}

	hasFitts := false
	hasDoherty := false
	hasPeakEnd := false

	for _, f := range findings {
		if f.Rule == "UX / Fitts's Law (Undersized Target)" {
			hasFitts = true
		}
		if f.Rule == "UX / Doherty Threshold (Unbounded Latency Feedback)" {
			hasDoherty = true
		}
		if f.Rule == "UX / Peak-End (Unconfirmed Destructive Action)" {
			hasPeakEnd = true
		}
	}

	if !hasFitts {
		t.Errorf("Expected Fitts's Law finding")
	}
	if !hasDoherty {
		t.Errorf("Expected Doherty Threshold finding")
	}
	if !hasPeakEnd {
		t.Errorf("Expected Peak-End finding")
	}
}

func TestAntiSlopScanner(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-slop-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	componentContent := `import React from 'react';

export function SlopHero() {
    return (
        <div className="relative">
            {/* Blurry glow orb */}
            <div className="absolute rounded-full blur-3xl bg-purple-600/30" />

            {/* Cartoon emoji in header */}
            <h1>🚀 Launch Your AI App Faster 🔥</h1>

            {/* AI slop marketing copy */}
            <p>Unlock the power of automated intelligence in today's fast-paced world.</p>
        </div>
    );
}
`
	if err := os.WriteFile(filepath.Join(tempDir, "SlopHero.tsx"), []byte(componentContent), 0644); err != nil {
		t.Fatalf("Failed to write SlopHero.tsx: %v", err)
	}

	findings := ScanWorkspace(tempDir)
	if len(findings) < 3 {
		t.Fatalf("Expected at least 3 anti-slop findings, got %d", len(findings))
	}

	hasCartoonEmoji := false
	hasBlurGlow := false
	hasSlopCopy := false

	for _, f := range findings {
		if f.Rule == "AI Slop / Cartoon Emoji Anti-Pattern" {
			hasCartoonEmoji = true
		}
		if f.Rule == "AI Slop / Blurry Glow Trope" {
			hasBlurGlow = true
		}
		if f.Rule == "AI Slop / Cliché Marketing Copy" {
			hasSlopCopy = true
		}
	}

	if !hasCartoonEmoji {
		t.Errorf("Expected Cartoon Emoji finding")
	}
	if !hasBlurGlow {
		t.Errorf("Expected Blurry Glow Trope finding")
	}
	if !hasSlopCopy {
		t.Errorf("Expected Cliché Marketing Copy finding")
	}
}

func TestVibeCodingPitfallsScanner(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-pitfalls-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	nextConfig := `module.exports = {
		productionBrowserSourceMaps: true,
	};`
	sqlMigration := `ALTER TABLE users ENABLE ROW LEVEL SECURITY;
	CREATE POLICY "Allow public read" ON users FOR SELECT USING (true);`
	componentContent := `import React from 'react';
	export function Invoices({ allInvoices, me }) {
		const myInvoices = allInvoices.filter(inv => inv.tenant_id === me.tenantId);
		return <div>{myInvoices.length}</div>;
	}`

	if err := os.WriteFile(filepath.Join(tempDir, "next.config.js"), []byte(nextConfig), 0644); err != nil {
		t.Fatalf("Failed to write next.config.js: %v", err)
	}
	if err := os.WriteFile(filepath.Join(tempDir, "001_init.sql"), []byte(sqlMigration), 0644); err != nil {
		t.Fatalf("Failed to write 001_init.sql: %v", err)
	}
	if err := os.WriteFile(filepath.Join(tempDir, "invoices.tsx"), []byte(componentContent), 0644); err != nil {
		t.Fatalf("Failed to write invoices.tsx: %v", err)
	}

	findings := ScanWorkspace(tempDir)

	hasSourceMaps := false
	hasPermissiveRls := false
	hasMultiTenantFilter := false

	for _, f := range findings {
		if f.Rule == "Config / Leaked Production Source Maps" {
			hasSourceMaps = true
		}
		if f.Rule == "Database / Permissive RLS Policy (USING true)" {
			hasPermissiveRls = true
		}
		if f.Rule == "Multi-Tenant / Client-Side Multi-Tenant Filter" {
			hasMultiTenantFilter = true
		}
	}

	if !hasSourceMaps {
		t.Errorf("Expected Leaked Production Source Maps finding")
	}
	if !hasPermissiveRls {
		t.Errorf("Expected Permissive RLS Policy finding")
	}
	if !hasMultiTenantFilter {
		t.Errorf("Expected Client-Side Multi-Tenant Filter finding")
	}
}
func TestAdvancedVibeCodingScannerAndFormats(t *testing.T) {
	tempDir, err := os.MkdirTemp("", "vibe-audit-formats-test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tempDir)

	clientContent := `import { createClient } from '@supabase/supabase-js';
	const client = createClient('https://example.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);`

	serverlessRoute := `import { NextResponse } from 'next/server';
	const requestCache = new Map();
	export async function GET() { return NextResponse.json({ ok: true }); }`

	if err := os.WriteFile(filepath.Join(tempDir, "client.ts"), []byte(clientContent), 0644); err != nil {
		t.Fatalf("Failed to write client.ts: %v", err)
	}
	if err := os.WriteFile(filepath.Join(tempDir, "route.ts"), []byte(serverlessRoute), 0644); err != nil {
		t.Fatalf("Failed to write route.ts: %v", err)
	}

	findings := ScanWorkspace(tempDir)

	hasServiceRoleLeak := false
	hasMemoryLeak := false

	for _, f := range findings {
		if f.Rule == "Security / Service Role Key in Client Bundle" {
			hasServiceRoleLeak = true
		}
		if f.Rule == "Architecture / Serverless In-Memory State Leak" {
			hasMemoryLeak = true
		}
	}

	if !hasServiceRoleLeak {
		t.Errorf("Expected finding for Service Role Key in Client Bundle")
	}
	if !hasMemoryLeak {
		t.Errorf("Expected finding for Serverless In-Memory State Leak")
	}

	// Test Markdown rendering
	mdReport := RenderMarkdownReport(findings, tempDir)
	if !strings.Contains(mdReport, "# 🛡️ Vibe Audit Security & Quality Report") {
		t.Errorf("Markdown report missing expected header")
	}
	if !strings.Contains(mdReport, "Actionable Remediation Checklist") {
		t.Errorf("Markdown report missing checklist")
	}

	// Test SARIF rendering
	sarifBytes, err := RenderSARIFReport(findings, tempDir)
	if err != nil {
		t.Fatalf("RenderSARIFReport failed: %v", err)
	}
	var sarifObj map[string]interface{}
	if err := json.Unmarshal(sarifBytes, &sarifObj); err != nil {
		t.Fatalf("SARIF report is not valid JSON: %v", err)
	}
	if sarifObj["version"] != "2.1.0" {
		t.Errorf("SARIF version is not 2.1.0, got %v", sarifObj["version"])
	}

	// Test Prompt rendering
	promptReport := RenderPromptReport(findings, tempDir)
	if !strings.Contains(promptReport, "# 🤖 Vibe Audit AI Remediation Prompt") {
		t.Errorf("Prompt report missing expected header")
	}
	if !strings.Contains(promptReport, "Remediation Instructions:") {
		t.Errorf("Prompt report missing remediation instructions")
	}
}
