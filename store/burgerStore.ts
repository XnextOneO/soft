import { makeAutoObservable } from "mobx";

// export interface GenreInterface {
//     id: string;
//     genre: string;
// }

export default class BurgerStore {
	// private _genres: GenreInterface[] = [];
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

	// setGenres(genres: GenreInterface[]) {
	//     this._genres = genres;
	// }

	// get genres(): GenreInterface[] {
	//     return this._genres;
	// }
}
