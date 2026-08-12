#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawnSync } = require('child_process');

const VERSION = 'v0.1.0'; // Aligns with GitHub Release tag
const REPO = 'Xenonesis/vibe-audit';

const platformMap = {
  win32: 'windows',
  darwin: 'darwin',
  linux: 'linux'
};

const archMap = {
  x64: 'amd64',
  arm64: 'arm64'
};

const osName = platformMap[os.platform()];
const archName = archMap[os.arch()];

if (!osName || !archName) {
  console.error(`Unsupported platform or architecture: ${os.platform()} ${os.arch()}`);
  console.error('Please build from source: cd cli && go build -o vibe-audit');
  process.exit(1);
}

const ext = osName === 'windows' ? '.exe' : '';
const binName = `vibe-audit-${osName}-${archName}${ext}`;
const downloadUrl = `https://github.com/${REPO}/releases/download/${VERSION}/${binName}`;

const cacheDir = path.join(os.homedir(), '.agents', 'vibe-audit-bin');
const binPath = path.join(cacheDir, `vibe-audit${ext}`);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download binary: ${res.statusCode} ${res.statusMessage}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(binPath)) {
    console.log(`Downloading Vibe Audit binary for ${osName}-${archName}...`);
    fs.mkdirSync(cacheDir, { recursive: true });
    
    try {
      await download(downloadUrl, binPath);
      if (osName !== 'windows') {
        fs.chmodSync(binPath, 0o755); // Make executable on Unix
      }
      console.log('Download complete.\n');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  const args = process.argv.slice(2);
  const result = spawnSync(binPath, args, { stdio: 'inherit' });
  
  if (result.error) {
    console.error(`Failed to execute binary: ${result.error.message}`);
    process.exit(1);
  }
  
  process.exit(result.status !== null ? result.status : 1);
}

main();
