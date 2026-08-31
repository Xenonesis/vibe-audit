// Synthetic fixture: Silent error swallowing returning fake success
export async function syncUserData(userId: string): Promise<{ success: boolean }> {
  try {
    await externalSyncService(userId);
    return { success: true };
  } catch (err) {
    // Empty catch block with silent error swallowing
  }
  return { success: true };
}

async function externalSyncService(_id: string): Promise<void> {
  throw new Error("Connection failed");
}
