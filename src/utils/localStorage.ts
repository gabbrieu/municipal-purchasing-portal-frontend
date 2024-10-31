export abstract class LocalStorageHelper {
  static add<T = any>(key: string, value: T): T | undefined {
    localStorage.setItem(key, JSON.stringify(value));

    return this.get(key);
  }

  static get<T = any>(key: string): T | undefined {
    const item: string | null = localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : undefined;
  }

  static delete(key: string) {
    localStorage.removeItem(key);
  }

  static clearAll() {
    localStorage.clear();
  }
}
