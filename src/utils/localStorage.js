class AlterStorage {
  constructor() {
    this.data = {};
  }

  setItem(key, value) {
    this.data[key] = value;
    return this.data[key] || null;
  }

  getItem(key) {
    return this.data[key] || null;
  }
}

const storage = (() => {
  try {
    window.localStorage.setItem('test', 1);
    return window.localStorage;
  } catch (error) {
    return new AlterStorage();
  }
})();

export const getStorage = () => storage;
