// Synthetic fixture: Hardcoded localhost in API client
export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1";
  }

  async fetchUser(id: string): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/users/${id}`);
    return res.json();
  }
}
