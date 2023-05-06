import { Mode } from "../../store/ModeStore";
import { changePositionMode } from "./changePositionMode";
import { editDotsMode } from "./editDotsMode";

class MouseEvents {
    moved: boolean;
    mode: Mode;

    constructor() {
        this.mode = Mode.default;
        this.moved = false;
    }

    handleMouseDown(
        event: any,
        mode: Mode,
        [selectedElements, setSelectedElement]: [Array<any>, any]
    ): void {
        this.mode = mode;

        if (this.mode === Mode.default) {
            changePositionMode.handleMouseDown(event, [
                selectedElements,
                setSelectedElement,
            ]);
            this.moved = true;
        }
    }

    handleDotsMouseDown(
        event: any,
        index: number,
        [selectedDot, setSelectedDot]: any
    ) {
        this.moved = true;
        editDotsMode.handleMouseDown(event, index, [
            selectedDot,
            setSelectedDot,
        ]);
    }

    handleMouseMove(
        event: any,
        mode: Mode,
        [selectedElements]: any,
        [prevX, setPrevX]: any,
        [prevY, setPrevY]: any
    ): void {
        this.mode = mode;

        if (this.mode === Mode.default) {
            changePositionMode.handleMouseMove(
                event,
                this.moved,
                [selectedElements],
                [prevX, setPrevX],
                [prevY, setPrevY]
            );
        } else if (this.mode === Mode.editDotes) {
            editDotsMode.handleMouseMove(
                event,
                this.moved,
                selectedElements,
                [prevX, setPrevX],
                [prevY, setPrevY]
            );
        }
    }

    handleMouseUp(event: any, mode: Mode) {
        this.mode = mode;

        this.moved = false;
    }
}

export const mouseEvents = new MouseEvents();
