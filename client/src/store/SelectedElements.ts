import { makeAutoObservable } from "mobx";

export default class SelectedElements {
    list: any[];
    dot: number;

    constructor() {
        this.list = [];
        this.dot = -1;
        makeAutoObservable(this);
    }

    setSelectedElements(newList: any[]) {
        this.list = newList;
    }

    setSelectedDot(dot: any) {
        this.dot = dot;
    }
}
