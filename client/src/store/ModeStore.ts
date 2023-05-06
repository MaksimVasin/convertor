import { makeAutoObservable } from "mobx";

export enum Mode {
    editDotes = "editDotes",
    default = "default",
}

export default class ModeStore {
    mode: Mode;

    constructor() {
        this.mode = Mode.default;
        makeAutoObservable(this);
    }

    setMode(mode: Mode) {
        this.mode = mode;
    }
}
