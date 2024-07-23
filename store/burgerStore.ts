import { makeAutoObservable } from "mobx";

export default class BurgerStore {
	private _opened: Boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setOpened(opened: Boolean) {
		this._opened = opened;
	}

	get opened(): Boolean {
		return this._opened;
	}
}
