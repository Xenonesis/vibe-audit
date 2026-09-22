package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

// FixGuidanceForRule returns deterministic remediation guidance for a given rule
func FixGuidanceForRule(rule string) string {
	switch rule {
	case "Hardcoded Secret":
		return "Remove hardcoded credentials; inject via secure environment variables (e.g. process.env)."
	case "Security / Service Role Key in Client Bundle":
		return "Never expose service role keys to client code. Use NEXT_PUBLIC_SUPABASE_ANON_KEY on the client and restrict service role keys to backend-only handlers."
	case "Insecure Mobile Storage":
		return "Replace AsyncStorage for auth tokens with Keychain (iOS) and Keystore (Android) via expo-secure-store or react-native-keychain."
	case "Electron Node Integration":
		return "Set nodeIntegration: false and contextIsolation: true in BrowserWindow webPreferences."
	case "Electron Context Isolation Disabled":
		return "Set contextIsolation: true and use preload.js with contextBridge.exposeInMainWorld."
	case "MV3 Timer Killed on Idle":
		return "Replace setInterval/setTimeout in MV3 service workers with chrome.alarms.create."
	case "LLM Token Waste / Unbounded History":
		return "Apply sliding-window message truncation or token budgeting before passing conversation history to LLM API calls."
	case "UX / Fitts's Law (Undersized Target)":
		return "Increase interactive touch targets to at least 44x44px (min-h-[44px] min-w-[44px]) with proper padding."
	case "UX / Doherty Threshold (Unbounded Latency Feedback)":
		return "Add loading feedback (isPending, disabled state, or spinner) to async button handlers (<400ms feedback)."
	case "UX / Peak-End (Unconfirmed Destructive Action)":
		return "Add confirmation modal or confirmation prompt before triggering irreversible delete/drop operations."
	case "AI Slop / Cartoon Emoji Anti-Pattern":
		return "Remove decorative cartoon emojis from UI elements; replace with semantic Lucide SVG icons or clean text tags."
	case "AI Slop / Blurry Glow Trope":
		return "Replace blurred background glowing orbs (blur-3xl, shadow-purple-500) with clean architectural borders (border-neutral-200 dark:border-neutral-800)."
	case "AI Slop / Cliché Marketing Copy":
		return "Replace generic AI copy tropes ('unlock the power', 'seamlessly integrate') with concrete technical specifications and product features."
	case "Config / Leaked Production Source Maps":
		return "Disable productionBrowserSourceMaps: false in next.config to prevent leaking source code and internal routes to the public."
	case "Database / Permissive RLS Policy (USING true)":
		return "Replace USING (true) or WITH CHECK (true) with authenticated tenant check: USING ((select auth.uid()) = user_id)."
	case "Multi-Tenant / Client-Side Multi-Tenant Filter":
		return "Filter tenant records in the database query (WHERE tenant_id = :id), never in client-side JavaScript .filter()."
	case "Architecture / Serverless In-Memory State Leak":
		return "Move module-level Map/Set in serverless endpoints to external persistent storage (e.g. Upstash Redis) or enforce strict LRU cache bounds."
	case "Lifecycle Hook":
		return "Audit preinstall/postinstall scripts in package.json to ensure arbitrary untrusted code is not executed during dependency installation."
	default:
		return "Review code path, enforce strict validation, and remove insecure or anti-pattern constructs."
	}
}

// RenderMarkdownReport produces a GitHub PR-ready Markdown report
func RenderMarkdownReport(findings []SecurityFinding, targetDir string) string {
	var sb strings.Builder
	sb.WriteString("# 🛡️ Vibe Audit Security & Quality Report\n\n")
	sb.WriteString(fmt.Sprintf("**Target Workspace:** `%s`\n\n", targetDir))

	if len(findings) == 0 {
		sb.WriteString("✅ **Status: CLEAN** — No hardcoded secrets, vibe-coding vulnerabilities, or AI slop detected.\n")
		return sb.String()
	}

	critCount, highCount, medCount, lowCount := 0, 0, 0, 0
	for _, f := range findings {
		switch f.Severity {
		case "CRITICAL":
			critCount++
		case "HIGH":
			highCount++
		case "MEDIUM":
			medCount++
		case "LOW":
			lowCount++
		}
	}

	sb.WriteString(fmt.Sprintf("⚠️ **Status: %d Finding(s) Detected** (`%d Critical`, `%d High`, `%d Medium`, `%d Low`)\n\n",
		len(findings), critCount, highCount, medCount, lowCount))

	sb.WriteString("### Detected Findings\n\n")
	sb.WriteString("| Severity | Location | Rule | Description |\n")
	sb.WriteString("|---|---|---|---|\n")

	for _, f := range findings {
		sb.WriteString(fmt.Sprintf("| **%s** | `%s:%d` | %s | %s |\n",
			f.Severity, f.File, f.Line, f.Rule, f.Message))
	}

	sb.WriteString("\n---\n\n### Actionable Remediation Checklist\n\n")
	for i, f := range findings {
		guidance := FixGuidanceForRule(f.Rule)
		sb.WriteString(fmt.Sprintf("- [ ] **[%s]** `%s:%d` (%s)\n  *Fix:* %s\n\n",
			f.Severity, f.File, f.Line, f.Rule, guidance))
		if i >= 49 { // cap checklist at 50 to avoid markdown bloat
			sb.WriteString(fmt.Sprintf("*... and %d more findings (truncated)*\n", len(findings)-50))
			break
		}
	}

	return sb.String()
}

// RenderPromptReport produces a ready-to-paste prompt for AI coding assistants (Cursor, Claude, Copilot)
func RenderPromptReport(findings []SecurityFinding, targetDir string) string {
	var sb strings.Builder
	sb.WriteString("# 🤖 Vibe Audit AI Remediation Prompt\n\n")
	sb.WriteString("Please resolve the following deterministic security, architecture, and UX violations identified by `vibe-audit` in this codebase:\n\n")

	for i, f := range findings {
		guidance := FixGuidanceForRule(f.Rule)
		sb.WriteString(fmt.Sprintf("%d. **[%s] %s**\n", i+1, f.Severity, f.Rule))
		sb.WriteString(fmt.Sprintf("   - **Location:** `%s:%d`\n", f.File, f.Line))
		sb.WriteString(fmt.Sprintf("   - **Violation:** %s\n", f.Message))
		sb.WriteString(fmt.Sprintf("   - **Remediation Instructions:** %s\n\n", guidance))
	}

	sb.WriteString("### Implementation Constraints:\n")
	sb.WriteString("- Preserve all existing business logic, component interfaces, and visual layout.\n")
	sb.WriteString("- Do not introduce unnecessary third-party libraries or wrapper layers.\n")
	sb.WriteString("- Enforce strict TypeScript typing (`no-explicit-any`; never use `any`).\n")
	sb.WriteString("- Verify changes with project tests after editing.\n")

	return sb.String()
}

// SARIF 2.1.0 Structs for GitHub Code Scanning
type sarifLog struct {
	Schema  string     `json:"$schema"`
	Version string     `json:"version"`
	Runs    []sarifRun `json:"runs"`
}

type sarifRun struct {
	Tool    sarifTool     `json:"tool"`
	Results []sarifResult `json:"results"`
}

type sarifTool struct {
	Driver sarifDriver `json:"driver"`
}

type sarifDriver struct {
	Name           string      `json:"name"`
	Version        string      `json:"version"`
	InformationURI string      `json:"informationUri"`
	Rules          []sarifRule `json:"rules"`
}

type sarifRule struct {
	ID               string           `json:"id"`
	Name             string           `json:"name"`
	ShortDescription sarifDescription `json:"shortDescription"`
	HelpURI          string           `json:"helpUri"`
}

type sarifDescription struct {
	Text string `json:"text"`
}

type sarifResult struct {
	RuleID    string          `json:"ruleId"`
	Level     string          `json:"level"`
	Message   sarifMessage    `json:"message"`
	Locations []sarifLocation `json:"locations"`
}

type sarifMessage struct {
	Text string `json:"text"`
}

type sarifLocation struct {
	PhysicalLocation sarifPhysicalLocation `json:"physicalLocation"`
}

type sarifPhysicalLocation struct {
	ArtifactLocation sarifArtifactLocation `json:"artifactLocation"`
	Region           sarifRegion           `json:"region"`
}

type sarifArtifactLocation struct {
	URI   string `json:"uri"`
	Index int    `json:"index,omitempty"`
}

type sarifRegion struct {
	StartLine   int `json:"startLine"`
	StartColumn int `json:"startColumn,omitempty"`
}

// RenderSARIFReport serializes findings to standard SARIF v2.1.0 format
func RenderSARIFReport(findings []SecurityFinding, targetDir string) ([]byte, error) {
	ruleMap := make(map[string]sarifRule)
	var results []sarifResult

	for i, f := range findings {
		ruleID := strings.ReplaceAll(f.Rule, " ", "-")
		ruleID = strings.ReplaceAll(ruleID, "/", "-")
		ruleID = strings.ReplaceAll(ruleID, "(", "")
		ruleID = strings.ReplaceAll(ruleID, ")", "")
		ruleID = strings.ReplaceAll(ruleID, "'", "")
		ruleID = strings.ToLower(ruleID)

		if _, exists := ruleMap[ruleID]; !exists {
			ruleMap[ruleID] = sarifRule{
				ID:   ruleID,
				Name: f.Rule,
				ShortDescription: sarifDescription{
					Text: FixGuidanceForRule(f.Rule),
				},
				HelpURI: "https://github.com/Xenonesis/vibe-audit",
			}
		}

		level := "warning"
		switch f.Severity {
		case "CRITICAL", "HIGH":
			level = "error"
		case "MEDIUM":
			level = "warning"
		case "LOW":
			level = "note"
		}

		// Normalize file URI path
		normalizedFile := strings.ReplaceAll(f.File, "\\", "/")

		results = append(results, sarifResult{
			RuleID: ruleID,
			Level:  level,
			Message: sarifMessage{
				Text: fmt.Sprintf("%s. Fix: %s", f.Message, FixGuidanceForRule(f.Rule)),
			},
			Locations: []sarifLocation{
				{
					PhysicalLocation: sarifPhysicalLocation{
						ArtifactLocation: sarifArtifactLocation{
							URI:   normalizedFile,
							Index: i,
						},
						Region: sarifRegion{
							StartLine: f.Line,
						},
					},
				},
			},
		})
	}

	var rules []sarifRule
	for _, r := range ruleMap {
		rules = append(rules, r)
	}

	log := sarifLog{
		Schema:  "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
		Version: "2.1.0",
		Runs: []sarifRun{
			{
				Tool: sarifTool{
					Driver: sarifDriver{
						Name:           "vibe-audit",
						Version:        "0.2.0",
						InformationURI: "https://github.com/Xenonesis/vibe-audit",
						Rules:          rules,
					},
				},
				Results: results,
			},
		},
	}

	return json.MarshalIndent(log, "", "  ")
}
