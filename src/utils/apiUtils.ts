export class ApiUtils {
  static validateStringDataAndMaxLength(data: string): boolean {
    if (typeof data !== 'string' || data.trim() === '' || data.length > 2000) {
      return false;
    }
    return true;
  }

  static validateStringData(data: string): boolean {
    if (typeof data !== 'string' || data.trim() === '') {
      return false;
    }
    return true;
  }
}

