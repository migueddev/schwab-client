export abstract class BaseAPI {
  protected paramsParser<T extends Record<string, unknown>>(params: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(params).filter(([_key, value]) => value !== null && value !== undefined),
    ) as Partial<T>;
  }
}
