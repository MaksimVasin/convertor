import { makeAutoObservable } from "mobx";

export default class ColorStore {
    _fillColor: any;
    _bolredColor: any;

    constructor() {
        this._fillColor = "";
        this._bolredColor = "";
        makeAutoObservable(this);
    }

    setFillColor() {}

    setBorderColor() {}

    get fillColor(): any {
        return this._fillColor;
    }

    get borderColor(): any {
        return this._bolredColor;
    }
}
