export abstract class SessionStorageHelper {
  static add<T = any>(key: string, value: T): T | undefined {
    sessionStorage.setItem(key, JSON.stringify(value));

    return this.get(key);
  }

  static get<T = any>(key: string): T | undefined {
    const item: string | null = sessionStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : undefined;
  }

  static delete(key: string) {
    sessionStorage.removeItem(key);
  }

  static clearAll() {
    sessionStorage.clear();
  }
}
