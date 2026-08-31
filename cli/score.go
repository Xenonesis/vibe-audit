package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
	"time"
)

// StandardFinding represents a structured finding in vibe-audit reports
type StandardFinding struct {
	ID               string `json:"id"`
	Category         string `json:"category"`
	Severity         string `json:"severity"`
	Confidence       string `json:"confidence,omitempty"`
	Status           string `json:"status,omitempty"`
	Evidence         string `json:"evidence"`
	Impact           string `json:"impact,omitempty"`
	RecommendedFix   string `json:"recommended_fix,omitempty"`
	ChangeRisk       string `json:"change_risk,omitempty"`
	ApprovalRequired bool   `json:"approval_required"`
	File             string `json:"file,omitempty"`
	Line             int    `json:"line,omitempty"`
}

type DimensionScore struct {
	Score  int    `json:"score"`
	Signal string `json:"signal"`
}

type ScoreReport struct {
	Overall    int                       `json:"overall"`
	Readiness  string                    `json:"readiness"`
	Dimensions map[string]DimensionScore `json:"dimensions"`
}

type StandardReport struct {
	Tool       string            `json:"tool"`
	Version    string            `json:"version"`
	Subcommand string            `json:"subcommand"`
	Timestamp  string            `json:"timestamp"`
	Findings   []StandardFinding `json:"findings"`
	Score      *ScoreReport      `json:"score,omitempty"`
}

// CalculateScore computes the 0-100 score across 6 dimensions given a slice of findings
func CalculateScore(findings []StandardFinding) ScoreReport {
	// Dimension categories
	dimCategories := map[string][]string{
		"security":      {"security", "auth", "secrets", "dependency"},
		"correctness":   {"correctness", "business-logic", "api"},
		"reliability":   {"reliability", "database", "transactions", "env"},
		"observability": {"observability", "logging", "monitoring"},
		"test_quality":  {"test-quality", "testing", "tests"},
		"deployment":    {"deployment", "infra", "cicd"},
	}

	severityWeights := map[string]int{
		"CRITICAL": 25,
		"HIGH":     15,
		"MEDIUM":   8,
		"LOW":      3,
		"INFO":     0,
	}

	dimDeductions := map[string]int{
		"security":      0,
		"correctness":   0,
		"reliability":   0,
		"observability": 0,
		"test_quality":  0,
		"deployment":    0,
	}

	for _, f := range findings {
		cat := strings.ToLower(f.Category)
		weight := severityWeights[strings.ToUpper(f.Severity)]
		if weight == 0 && strings.ToUpper(f.Severity) != "INFO" {
			weight = 8 // Default to MEDIUM if unknown
		}

		matchedDim := "correctness" // Fallback
		for dim, keywords := range dimCategories {
			for _, kw := range keywords {
				if strings.Contains(cat, kw) {
					matchedDim = dim
					break
				}
			}
		}
		dimDeductions[matchedDim] += weight
	}

	dimensions := make(map[string]DimensionScore)
	dimScores := make(map[string]int)

	for dim, deduction := range dimDeductions {
		score := 100 - deduction
		if score < 0 {
			score = 0
		}
		dimScores[dim] = score

		signal := "green"
		if score < 50 {
			signal = "red"
		} else if score < 80 {
			signal = "yellow"
		}

		dimensions[dim] = DimensionScore{
			Score:  score,
			Signal: signal,
		}
	}

	// Weighted overall score:
	// Security: 30%, Correctness: 20%, Reliability: 15%, Observability: 15%, Test Quality: 10%, Deployment: 10%
	overallFloat := float64(dimScores["security"])*0.30 +
		float64(dimScores["correctness"])*0.20 +
		float64(dimScores["reliability"])*0.15 +
		float64(dimScores["observability"])*0.15 +
		float64(dimScores["test_quality"])*0.10 +
		float64(dimScores["deployment"])*0.10

	overall := int(overallFloat + 0.5) // Round
	if overall > 100 {
		overall = 100
	} else if overall < 0 {
		overall = 0
	}

	var readiness string
	switch {
	case overall >= 85:
		readiness = "READY"
	case overall >= 70:
		readiness = "READY WITH WARNINGS"
	case overall >= 50:
		readiness = "PARTIALLY READY"
	default:
		readiness = "NOT READY"
	}

	return ScoreReport{
		Overall:    overall,
		Readiness:  readiness,
		Dimensions: dimensions,
	}
}

func cmdScore(args []string) {
	jsonOutput := false
	var inputPath string

	for _, arg := range args {
		if arg == "--report" || arg == "--json" {
			jsonOutput = true
		} else if arg == "json" && len(args) > 1 {
			jsonOutput = true
		} else if !strings.HasPrefix(arg, "--") {
			inputPath = arg
		}
	}

	var inputData []byte
	var err error

	if inputPath != "" && inputPath != "-" {
		inputData, err = os.ReadFile(inputPath)
		if err != nil {
			fmt.Printf("Error reading input file '%s': %v\n", inputPath, err)
			os.Exit(1)
		}
	} else {
		// Read from standard input
		inputData, err = io.ReadAll(os.Stdin)
		if err != nil || len(inputData) == 0 {
			fmt.Println("Usage: vibe-audit score <findings.json> [--report json]")
			os.Exit(1)
		}
	}

	var findings []StandardFinding
	// Attempt to parse as StandardReport first, then as raw findings array
	var rep StandardReport
	if err := json.Unmarshal(inputData, &rep); err == nil && len(rep.Findings) > 0 {
		findings = rep.Findings
	} else {
		if err := json.Unmarshal(inputData, &findings); err != nil {
			fmt.Printf("Error parsing JSON findings: %v\n", err)
			os.Exit(1)
		}
	}

	scoreReport := CalculateScore(findings)

	if jsonOutput {
		fullReport := StandardReport{
			Tool:       "vibe-audit",
			Version:    "0.2.0",
			Subcommand: "score",
			Timestamp:  time.Now().UTC().Format(time.RFC3339),
			Findings:   findings,
			Score:      &scoreReport,
		}
		outBytes, _ := json.MarshalIndent(fullReport, "", "  ")
		fmt.Println(string(outBytes))
		return
	}

	// Plain text display
	signalEmoji := map[string]string{
		"green":  "🟢",
		"yellow": "🟡",
		"red":    "🔴",
	}

	fmt.Printf("Overall: %d/100  [%s]\n", scoreReport.Overall, scoreReport.Readiness)
	dimOrder := []string{"security", "correctness", "reliability", "observability", "test_quality", "deployment"}
	dimLabels := map[string]string{
		"security":      "Security",
		"correctness":   "Correctness",
		"reliability":   "Reliability",
		"observability": "Observability",
		"test_quality":  "Test Quality",
		"deployment":    "Deployment",
	}

	for i, dim := range dimOrder {
		info := scoreReport.Dimensions[dim]
		prefix := "├──"
		if i == len(dimOrder)-1 {
			prefix = "└──"
		}
		fmt.Printf("%s %-14s %2d/100  %s\n", prefix, dimLabels[dim]+":", info.Score, signalEmoji[info.Signal])
	}

	if scoreReport.Overall < 70 {
		fmt.Println("\nTop priority: Resolve high severity findings to reach READY WITH WARNINGS.")
	} else if scoreReport.Overall < 85 {
		fmt.Println("\nStatus: Ready with minor warnings. Review medium risk items before deployment.")
	} else {
		fmt.Println("\nStatus: High production readiness. Core verification passed.")
	}
}
