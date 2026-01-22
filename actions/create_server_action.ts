export type ServerActionResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerActionError";
  }
}

export function createServerAction<Return, Args extends unknown[] = []>(
  callback: (...args: Args) => Promise<Return>,
): (...args: Args) => Promise<ServerActionResult<Return>> {
  return async (...args: Args) => {
    try {
      const value = await callback(...args);
      return { success: true, value };
    } catch (error) {
      if (error instanceof ServerActionError)
        return { success: false, error: error.message };
      if (error instanceof Error && error.message)
        return { success: false, error: error.message };
      throw error;
    }
  };
}
