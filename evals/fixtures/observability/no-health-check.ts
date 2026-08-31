// Synthetic fixture: Express router without a health or liveness endpoint
interface AppRouter {
  get: (path: string, handler: (req: unknown, res: unknown) => void) => void;
  post: (path: string, handler: (req: unknown, res: unknown) => void) => void;
}

export function registerRoutes(app: AppRouter): void {
  app.get("/api/products", (_req, res) => {
    // Return products list
  });
  app.get("/api/users", (_req, res) => {
    // Return users list
  });
  app.post("/api/checkout", (_req, res) => {
    // Handle checkout
  });
}
