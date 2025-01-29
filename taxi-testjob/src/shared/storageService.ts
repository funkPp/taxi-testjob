export default class StorageService<T> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getData(): T | T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : Array.isArray(data) ? [] : "";
  }

  setData(data: T | T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  addItem(newItem: T): void {
    const currentData = this.getData() as T[];
    currentData.push(newItem);
    this.setData(currentData);
  }

  updateItem(updatedItem: T, idKey: keyof T): void {
    const currentData = this.getData() as T[];
    const index = currentData.findIndex(
      (item) => item[idKey] === updatedItem[idKey]
    );
    if (index !== -1) {
      currentData[index] = updatedItem;
      this.setData(currentData);
    }
  }

  removeItem(itemId: number, idKey: keyof T): void {
    const currentData = this.getData() as T[];
    const filteredData = currentData.filter((item) => item[idKey] !== itemId);
    this.setData(filteredData);
  }

  getItemById(itemId: number, idKey: keyof T): T | undefined {
    const currentData = this.getData() as T[];
    return currentData.find((item) => item[idKey] === itemId);
  }
}
