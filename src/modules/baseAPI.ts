export abstract class BaseAPI {
  protected paramsParser<T extends Record<string, unknown> | null | undefined>(
    params: T,
  ): Partial<NonNullable<T>> {
    if (!params) {
      return {} as Partial<NonNullable<T>>;
    }

    return Object.fromEntries(
      Object.entries(params).filter(([_key, value]) => value !== null && value !== undefined),
    ) as Partial<NonNullable<T>>;
  }
}
