import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    // 1. Register the Manual Install Command
    let disposable = vscode.commands.registerCommand('vibeAudit.install', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Vibe Audit: Please open a workspace folder first.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Installing Vibe Audit Workspace Rules...",
            cancellable: false
        }, async () => {
            return new Promise<void>((resolve, reject) => {
                // We use our existing NPM distribution wrapper!
                // This ensures we always fetch the latest Go binary securely.
                cp.exec('npx --yes vibe-audit install .', { cwd: rootPath }, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Vibe Audit setup failed: ${error.message}`);
                        reject(error);
                        return;
                    }
                    
                    // Show success action
                    vscode.window.showInformationMessage(
                        '✅ Vibe Audit successfully configured! (Rules & MCP Server installed)',
                        'View Docs'
                    ).then(selection => {
                        if (selection === 'View Docs') {
                            vscode.env.openExternal(vscode.Uri.parse('https://github.com/Xenonesis/vibe-audit'));
                        }
                    });
                    
                    resolve();
                });
            });
        });
    });

    context.subscriptions.push(disposable);
    
    // 2. Proactive Discovery (Run on startup)
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        const skillPath = path.join(rootPath, '.agents', 'skills', 'vibe-audit');
        const mcpConfig = path.join(rootPath, '.cursor', 'mcp.json');
        
        // If they are in a workspace but don't have it configured, politely offer it.
        if (!fs.existsSync(skillPath) && !fs.existsSync(mcpConfig)) {
            vscode.window.showInformationMessage(
                '🛡️ Vibe Audit is not protecting this workspace. Install rules and MCP server?',
                'Install'
            ).then(selection => {
                if (selection === 'Install') {
                    vscode.commands.executeCommand('vibeAudit.install');
                }
            });
        }
    }
}

export function deactivate() {}
