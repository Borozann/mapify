export default class LocalStorageService {
  static save(data) {
    localStorage.setItem('workouts', JSON.stringify(data));
  }

  static load() {
    return JSON.parse(localStorage.getItem('workouts')) ?? [];
  }
}
