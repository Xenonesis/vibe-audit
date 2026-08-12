class VibeAudit < Formula
  desc "Evidence-first Agent Skill & Deterministic Validation Toolkit"
  homepage "https://github.com/Xenonesis/vibe-audit"
  url "https://github.com/Xenonesis/vibe-audit/archive/refs/tags/v0.1.0.tar.gz"
  version "0.1.0"
  sha256 "0000000000000000000000000000000000000000000000000000000000000000" # Dummy hash, replace when releasing
  license "MIT"

  depends_on "go" => :build

  def install
    cd "cli" do
      system "go", "build", "-o", bin/"vibe-audit", "."
    end
  end

  test do
    # Simple test to verify the binary executes and exports rules
    system "#{bin}/vibe-audit", "export", testpath
    assert_predicate testpath/".windsurfrules", :exist?
    assert_predicate testpath/".cursor/rules/vibe-audit.mdc", :exist?
  end
end
