import { makeAutoObservable } from "mobx";

export default class BurgerStore {
  private _opened: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpened(opened: boolean): void {
    this._opened = opened;
  }

  get opened(): boolean {
    return this._opened;
  }
}
