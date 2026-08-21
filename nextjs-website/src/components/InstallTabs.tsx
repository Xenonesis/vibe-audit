'use client';

import { useState } from 'react';
import { useCopy } from './use-copy';

export default function InstallTabs() {
  const [activeTab, setActiveTab] = useState('vscode');
  const { copy, isCopied } = useCopy();

  const tabs = [
    { id: 'vscode', label: 'VS Code Extension' },
    { id: 'universal', label: 'NPM / Node.js' },
    { id: 'homebrew', label: 'Homebrew' },
    { id: 'skills', label: 'skills.sh (CLI Hosts)' },
    { id: 'rules', label: 'Native IDE Rules' },
    { id: 'editors', label: 'Neovim & Emacs' },
    { id: 'source', label: 'From Source (Go)' },
  ];

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
            The fastest way to install Vibe Audit. Install the extension in VS Code, Cursor, or Windsurf. When you open any workspace, click &ldquo;Install&rdquo; on the prompt. It automatically runs the Go static scanner, configures native rules, and binds the stdio MCP server.
          </p>
          <div style={{ padding: '20px', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--pastel-blue-text)', flexShrink: 0 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>Vibe Audit for Cursor & Windsurf</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Publisher: <code>Xenonesis</code> · Commands: <code>Vibe Audit: Install & Configure Workspace</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal/CLI */}
      {activeTab === 'universal' && (
        <div id="install-tab-universal" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            NPM Wrapper (Zero-Dependency Go Binary)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Auto-detects active workspace IDEs (Cursor, Windsurf, Trae, VS Code), installs skill packages, exports native rules, and starts the MCP server.
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span className="terminal-title">bash / powershell — npm universal installer</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol"># Auto-detect IDEs & configure workspace</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">npx vibe-audit install .</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('npm-install') ? 'copied' : ''}`}
                  onClick={() => copy('npx vibe-audit install .', 'npm-install')}
                >
                  {isCopied('npm-install') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <br />
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol"># Run deterministic static scanner</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">npx vibe-audit scan</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('npm-scan') ? 'copied' : ''}`}
                  onClick={() => copy('npx vibe-audit scan', 'npm-scan')}
                >
                  {isCopied('npm-scan') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Homebrew */}
      {activeTab === 'homebrew' && (
        <div id="install-tab-homebrew" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>Homebrew (macOS / Linux)</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Install the compiled Go binary natively via the official Homebrew tap.
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">brew install Xenonesis/vibe-audit/vibe-audit</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('brew-install') ? 'copied' : ''}`}
                  onClick={() => copy('brew install Xenonesis/vibe-audit/vibe-audit', 'brew-install')}
                >
                  {isCopied('brew-install') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="terminal-line" style={{ marginTop: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">vibe-audit install .</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('brew-exec') ? 'copied' : ''}`}
                  onClick={() => copy('vibe-audit install .', 'brew-exec')}
                >
                  {isCopied('brew-exec') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* skills.sh */}
      {activeTab === 'skills' && (
        <div id="install-tab-skills" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            Global Agent Skills Registry (skills.sh)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Installs Vibe Audit for all Agent Skills open-standard CLI hosts (Claude Code, OMP, Pi, Codex, Gemini CLI, OpenCode).
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">npx skills add Xenonesis/vibe-audit</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('skills-add') ? 'copied' : ''}`}
                  onClick={() => copy('npx skills add Xenonesis/vibe-audit', 'skills-add')}
                >
                  {isCopied('skills-add') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Native IDE Rules */}
      {activeTab === 'rules' && (
        <div id="install-tab-rules" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            Export Native IDE Rules & Directives
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Vibe Audit exports customized native rules for Cursor, Windsurf, GitHub Copilot, Cline, Aider, and Continue.dev:
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol"># Export Cursor MDC rules (.cursor/rules/vibe-audit.mdc)</span>
                  <br />
                  <span className="prompt-symbol">$</span> <span className="cmd">vibe-audit export cursor</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('export-cursor') ? 'copied' : ''}`}
                  onClick={() => copy('vibe-audit export cursor', 'export-cursor')}
                >
                  {isCopied('export-cursor') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <br />
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol"># Export Windsurf Cascade rules (.windsurfrules)</span>
                  <br />
                  <span className="prompt-symbol">$</span> <span className="cmd">vibe-audit export windsurf</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('export-windsurf') ? 'copied' : ''}`}
                  onClick={() => copy('vibe-audit export windsurf', 'export-windsurf')}
                >
                  {isCopied('export-windsurf') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <br />
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol"># Export GitHub Copilot repo instructions (.github/copilot-instructions.md)</span>
                  <br />
                  <span className="prompt-symbol">$</span> <span className="cmd">vibe-audit export copilot</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('export-copilot') ? 'copied' : ''}`}
                  onClick={() => copy('vibe-audit export copilot', 'export-copilot')}
                >
                  {isCopied('export-copilot') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editors */}
      {activeTab === 'editors' && (
        <div id="install-tab-editors" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            Neovim & Emacs Editor Integration
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Load Vibe Audit directives directly into Neovim (Avante.nvim / CodeCompanion.nvim) or Emacs (gptel).
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol"># Neovim avante.nvim configuration</span>
                  <br />
                  <span className="cmd">{neovimCmd}</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('neovim-cmd') ? 'copied' : ''}`}
                  onClick={() => copy(neovimCmd, 'neovim-cmd')}
                >
                  {isCopied('neovim-cmd') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* From Source (Go) */}
      {activeTab === 'source' && (
        <div id="install-tab-source" className="tab-content active">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
            Build From Source (Go CLI)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Compile the standalone Go binary and run universal workspace installation:
          </p>
          <div className="terminal-window" style={{ marginBottom: '24px' }}>
            <div className="terminal-body">
              <div className="terminal-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">cd cli && go build -o vibe-audit && ./vibe-audit install ..</span>
                </div>
                <button
                  className={`copy-btn ${isCopied('go-build-src') ? 'copied' : ''}`}
                  onClick={() => copy('cd cli && go build -o vibe-audit && ./vibe-audit install ..', 'go-build-src')}
                >
                  {isCopied('go-build-src') ? (
                    <>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="icon" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
