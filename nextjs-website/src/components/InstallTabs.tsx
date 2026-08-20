'use client';

import { useState } from 'react';

export default function InstallTabs() {
  const [activeTab, setActiveTab] = useState('vscode');

  const tabs = [
    { id: 'vscode', label: 'VS Code Extension' },
    { id: 'universal', label: 'NPM / Node.js' },
    { id: 'homebrew', label: 'Homebrew' },
    { id: 'skills', label: 'skills.sh (CLI Hosts)' },
    { id: 'editors', label: 'Neovim & Emacs' },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const neovimCmd = `require('avante').setup({ system_prompt = io.open("~/.agents/skills/vibe-audit/SKILL.md"):read("*a") })`;

  return (
    <div style={{ marginTop: '32px' }} className="reveal">
      <div className="tabs-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VS Code Extension */}
      {activeTab === 'vscode' && (
        <div id="install-tab-vscode" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            VS Code / Cursor / Windsurf Extension (Easiest)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            The absolute easiest way to install Vibe Audit. Install the extension, open your workspace, and click the "Install" prompt. It automatically downloads the Go binary, configures native rules, and connects the MCP server.
          </p>
          <div style={{ padding: '16px', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--pastel-blue-text)' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <div>
              <div style={{ fontWeight: 600 }}>Vibe Audit for Cursor & Windsurf</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Available in the extension marketplace (or build from extension/)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal/CLI */}
      {activeTab === 'universal' && (
        <div id="install-tab-universal" className="tab-content">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            NPM Wrapper (Zero-Dependency Go Binary)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Auto-detects active workspace IDEs and CLIs, installs skill packages, exports native rules, and configures MCP servers using the compiled Go binary.
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span className="terminal-title">bash / powershell — npm installer</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol"># Windows / macOS / Linux</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">npx vibe-audit install .</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard('npx vibe-audit install .')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Homebrew */}
      {activeTab === 'homebrew' && (
        <div id="install-tab-homebrew" className="tab-content">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>Homebrew (macOS / Linux)</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Install the compiled Go binary natively via Homebrew.
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">brew install Xenonesis/vibe-audit/vibe-audit</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard('brew install Xenonesis/vibe-audit/vibe-audit')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
              <div className="terminal-line" style={{ marginTop: '12px' }}>
                <div>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">vibe-audit install .</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard('vibe-audit install .')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* skills.sh */}
      {activeTab === 'skills' && (
        <div id="install-tab-skills" className="tab-content">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            Global Agent Skills Registry (skills.sh)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Installs Vibe Audit for all Agent Skills open-standard CLI hosts (Claude Code, OMP, Pi, Codex, Gemini CLI, OpenCode).
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">npx skills add Xenonesis/vibe-audit</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard('npx skills add Xenonesis/vibe-audit')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editors */}
      {activeTab === 'editors' && (
        <div id="install-tab-editors" className="tab-content">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            Neovim & Emacs Editor Integration
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Load Vibe Audit directives directly into Neovim (Avante.nvim / CodeCompanion.nvim) or Emacs (gptel).
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol"># Neovim avante.nvim configuration</span>
                  <br />
                  <span className="cmd">{neovimCmd}</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(neovimCmd)}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Note Box */}
          <div style={{
            background: 'var(--pastel-yellow-bg)',
            border: '1px solid rgba(149, 100, 0, 0.2)',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '24px'
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--pastel-yellow-text)',
              marginBottom: '4px'
            }}>
              PromptScript & Project-Local Installation
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--pastel-yellow-text)', lineHeight: 1.5, margin: 0 }}>
              PromptScript CLI v1.5.x requires project-local installs. Run{' '}
              <code>npx skills add Xenonesis/vibe-audit -y</code> inside your project directory to populate{' '}
              <code>./.agents/skills/vibe-audit</code>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}