'use client';

import { useState } from 'react';

interface Harness {
  id: string;
  name: string;
  displayName: string;
  status: { text: string; className: string };
  description: string;
  cmd: string;
  hasAuth?: boolean;
  probeResult?: string;
}

export default function HarnessGrid() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const harnesses: Harness[] = [
    {
      id: 'pi',
      name: 'pi',
      displayName: 'Pi',
      status: { text: 'PASS (0.84.1)', className: 'badge-green' },
      description: 'Headless CLI driver verified. Tested Eval 1 with-skill: 80.5s execution, AUDIT mode, CRITICAL IDOR finding confirmed.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness pi --condition with-skill --timeout 300',
    },
    {
      id: 'omp',
      name: 'omp',
      displayName: 'Oh My Pi',
      status: { text: 'PASS (17.2.12)', className: 'badge-green' },
      description: 'Oh My Pi harness driver verified. Tested Eval 1 with-skill: 40.6s execution, zero source diff, file evidence confirmed.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness omp --condition with-skill --timeout 300',
    },
    {
      id: 'claude-code',
      name: 'claude-code',
      displayName: 'Claude Code',
      status: { text: 'SKIP (Auth)', className: 'badge-yellow' },
      description: "Installed v2.1.227. Automatically detects `loggedIn: false` and outputs clean skip with `claude /login` guidance.",
      cmd: 'python scripts/run_harness.py . --eval 1 --harness claude-code --condition with-skill --timeout 300',
      hasAuth: true,
    },
    {
      id: 'cursor',
      name: 'cursor',
      displayName: 'Cursor IDE',
      status: { text: 'PROBED (grok)', className: 'badge-neutral' },
      description: 'Probes `agent` on PATH (resolves to grok 0.2.112 on this machine). Captured honestly without false claims.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness cursor --condition with-skill --timeout 300',
    },
    {
      id: 'codex',
      name: 'codex',
      displayName: 'OpenAI Codex',
      status: { text: 'SKIP (Missing)', className: 'badge-neutral' },
      description: 'Binary not found on PATH. Driver probe records clean skip event with documented binary target.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness codex --condition with-skill --timeout 300',
    },
    {
      id: 'gemini-cli',
      name: 'gemini-cli',
      displayName: 'Gemini CLI',
      status: { text: 'SKIP (Missing)', className: 'badge-neutral' },
      description: 'Binary not found on PATH. Driver probe records clean skip event with documented binary target.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness gemini-cli --condition with-skill --timeout 300',
    },
    {
      id: 'copilot-cli',
      name: 'copilot-cli',
      displayName: 'Copilot CLI',
      status: { text: 'SKIP (Missing)', className: 'badge-neutral' },
      description: 'Binary not found on PATH. Driver probe records clean skip event with documented binary target.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness copilot-cli --condition with-skill --timeout 300',
    },
    {
      id: 'antigravity',
      name: 'antigravity',
      displayName: 'Antigravity',
      status: { text: 'SKIP (Missing)', className: 'badge-neutral' },
      description: 'Binary not found on PATH. Driver probe records clean skip event with documented binary target.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness antigravity --condition with-skill --timeout 300',
    },
  ];

  const copyToClipboard = async (text: string, cmdId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCmd(cmdId);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="harness-grid reveal">
      {harnesses.map(harness => (
        <div key={harness.id} className="harness-card">
          <div>
            <div className="harness-header">
              <div className="harness-brand">
                <div className="harness-logo" title={harness.displayName}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                    <title>{harness.displayName}</title>
                    {harness.id === 'pi' && (
                      <path d="M4.5 4.5h15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H17v11a1.5 1.5 0 0 1-3 0V7.5h-4v9.5a2.5 2.5 0 0 1-5 0V7.5H4.5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
                    )}
                    {harness.id === 'omp' && (
                      <path d="M11.976.0003a1.541 1.541 0 0 0-1.0928.4526L8.707 2.6287l2.7604 2.7604c.6417-.2166 1.377-.0715 1.8882.4399.514.5145.6583 1.2563.4362 1.9l.9101.9102 3.2768-3.2764L13.0684.4529A1.5394 1.5394 0 0 0 11.976.0003ZM7.638 3.698 5.926 5.4101l4.9095 4.9095c.1535.1536.332.267.5217.3423V8.831a1.8198 1.8198 0 0 1-.6024-.4011c-.5441-.5437-.6749-1.3422-.3958-2.0104Zm10.916 2.24-3.2765 3.2764 1.1743 1.1747c.6436-.2217 1.3862-.0782 1.9001.4366.7185.7183.7185 1.8823 0 2.6008-.7186.7187-1.8823.7187-2.6012 0-.5402-.5407-.674-1.3344-.4003-2l-1.1427-1.1423-.588.588c-.6036.604-.6036 1.5829 0 2.1865l4.9935 4.993 4.9342-4.9342c.6035-.6038.6035-1.5829 0-2.1865l-2.4673-2.4673c-.6035-.6039-1.583-.6039-2.1865 0Zm-7.7303 3.6545L5.6882 14.728l-4.57 4.5694a1.5414 1.5414 0 0 0 0 2.1818l1.3541 1.354a1.5407 1.5407 0 0 0 2.1818 0l4.5699-4.5699 5.1345-5.134-5.2348-5.2346Zm-2.311 9.9431a1.055 1.055 0 1 1 0 2.11 1.055 1.055 0 0 1 0-2.11Z" />
                    )}
                    {harness.id === 'claude-code' && (
                      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
                    )}
                    {harness.id === 'cursor' && (
                      <path d="M6 3.5L20.5 11L12.5 13.5L9 21.5L6 3.5Z" />
                    )}
                    {harness.id === 'codex' && (
                      <path d="M24 9.736V9.72c0-.018-.009-.035-.009-.053-.008-.017-.008-.034-.017-.052 0-.009-.009-.009-.009-.017a.19.19 0 0 0-.026-.044v-.009c-.009-.017-.026-.026-.044-.043l-.008-.009c-.018-.009-.035-.026-.053-.035l-3.72-2.143V3.02c0-.018 0-.044-.008-.061V2.94a.124.124 0 0 0-.017-.052V2.88c-.01-.017-.018-.035-.027-.043 0-.01-.008-.01-.008-.01a.19.19 0 0 0-.035-.043c-.018-.008-.026-.026-.044-.034-.008 0-.008-.01-.017-.01l-.009-.008L16.055.476a.338.338 0 0 0-.34 0l-3.72 2.143L8.286.476a.338.338 0 0 0-.34 0L4.06 2.723c-.01 0-.01.01-.01.01-.008 0-.008.008-.017.008-.017.009-.026.026-.043.035a.153.153 0 0 0-.035.043l-.009.009c-.008.017-.017.026-.026.04L.018 8.046c-.018.009-.035.026-.017.044" />
                    )}
                    {harness.id === 'gemini-cli' && (
                      <path d="M12 24c0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12 0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12z" />
                    )}
                    {harness.id === 'copilot-cli' && (
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.48-1.11-1.48c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                    )}
                    {harness.id === 'antigravity' && (
                      <path d="M12 1L9 9l-7 1 6 5-2 8 8-4 8 4-2-8 6-5-7-1z" />
                    )}
                  </svg>
                </div>
                <span className="harness-name">{harness.name}</span>
              </div>
              <span className={`badge ${harness.status.className}`}>{harness.status.text}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {harness.description}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {harness.hasAuth ? 'claude.CMD' : `${harness.id.toUpperCase()}.CMD`}
            </span>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(harness.cmd, harness.id)}
            >
              {copiedCmd === harness.id ? (
                <>
                  <svg className="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Run Eval</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}