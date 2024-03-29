/**
 * Typed wrapper for localStorage
 */
export default {
  get<T>(key: string, defaultValue: T) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        return defaultValue;
      }
      return JSON.parse(value) as T;
    } catch (e) {
      console.warn("Reading from localStorage failed", e);
      return defaultValue;
    }
  },
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Saving to localStorage failed", e);
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Removing from localStorage failed", e);
    }
  },
  isAvailable() {
    const key = "has-localStorage";
    this.set(key, true);
    const returnValue = this.get(key, null);
    this.remove(key);

    return !!returnValue;
  },
};
