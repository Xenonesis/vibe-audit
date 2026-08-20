'use client';

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
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyTarget);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="terminal-line">
      <div>
        {outputs.length > 0 && outputs.map((output, i) => (
          <p key={i} className={
            output.includes('Successfully') ? 'output-success' :
            output.includes('Found') || output.includes('Passing') ? 'output-highlight' :
            'output-muted'
          }>
            {output}
          </p>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="prompt-symbol">{prompt}</span>
          <span className="cmd">{command}</span>
        </div>
      </div>
      {showCopy && (
        <button className="copy-btn" onClick={copyToClipboard}>
          <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          <span>Copy</span>
        </button>
      )}
    </div>
  );
}