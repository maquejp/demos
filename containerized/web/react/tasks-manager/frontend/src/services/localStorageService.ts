const STORAGE_KEYS = {
  REMEMBER_ME: 'react-express-tasks-manager-remember-me',
} as const;

export class LocalStorageService {
  static getRememberMe(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  }

  static setRememberMe(value: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, value.toString());
  }

  static clearRememberMe(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  }
}
