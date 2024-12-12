import { Injectable } from '@angular/core';

const STORAGE_KEY = 'lesson-app:lastSessionId';
interface StoredInfo { 
  lastLessonId?: number|null;
}

@Injectable({
  providedIn: 'root'
})

export class UserSettingsService {
  private _lastLessonId: number|null = null;
  get lastLessonId(): number|null { return this._lastLessonId; }
  set lastLessonId(p: number|null) { this._lastLessonId = p; this.saveInfoToLocalStorage(); }
  constructor() { 
    const storedInfo = this.loadInfoFromLocalStorage();
    this.lastLessonId = storedInfo.lastLessonId || null;
  }
  loadInfoFromLocalStorage(): StoredInfo {
    const storedJson = window.localStorage.getItem(STORAGE_KEY);
    let res = (storedJson)? JSON.parse(storedJson) : { lastLessonId: null};
    console.log('reading localStorage item ' + STORAGE_KEY, res)
    return res;
  }
  saveInfoToLocalStorage() {
    const info: StoredInfo = { lastLessonId: this.lastLessonId };
    let json = JSON.stringify(info);
    console.log('writing localStorage item ' + STORAGE_KEY, info)
    window.localStorage.setItem(STORAGE_KEY, json);
  }
}
