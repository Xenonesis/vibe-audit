'use client';

import { useCopy } from './use-copy';

interface TerminalLineProps {
  prompt: string;
  command: string;
  outputs?: string[];
  showCopy?: boolean;
  copyTarget?: string;
}

export default function TerminalWindow({
  prompt,
  command,
  outputs = [],
  showCopy = false,
  copyTarget = command,
}: TerminalLineProps) {
  const { copy, isCopied } = useCopy();
  const copied = isCopied('terminal');

  return (
    <div className="terminal-line">
      <div style={{ flex: 1, minWidth: 0 }}>
        {outputs.length > 0 && outputs.map((output, i) => (
          <p key={i} className={
            output.includes('Successfully') ? 'output-success' :
            output.includes('Found') || output.includes('Passing') ? 'output-highlight' :
            'output-muted'
          }>
            {output}
          </p>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <span className="prompt-symbol">{prompt}</span>
          <span className="cmd">{command}</span>
        </div>
      </div>
      {showCopy && (
        <button
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={() => copy(copyTarget, 'terminal')}
          aria-label={copied ? 'Copied to clipboard' : 'Copy command to clipboard'}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
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
      )}
    </div>
  );
}
