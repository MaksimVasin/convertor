import { makeAutoObservable } from "mobx";

export default class DotsStore {
    dragging: boolean;
    draggingIndex: number | null;

    constructor() {
        this.dragging = false;
        this.draggingIndex = null;
        makeAutoObservable(this);
    }

    setFillColor() {}

    setBorderColor() {}
}
