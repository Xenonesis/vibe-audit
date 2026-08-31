// Synthetic fixture: Express server listening on plain HTTP without TLS / HSTS redirect
export function configureServer(app: { listen: (port: number, cb: () => void) => void }): void {
  const PORT = 80;
  // Missing HTTPS redirection and security headers
  app.listen(PORT, () => {
    console.log(`Server running on unencrypted HTTP port ${PORT}`);
  });
}
