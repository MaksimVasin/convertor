import { mouseEvents } from "./mouseEvents";

class EditDotsMode {
    dots: any;
    lines: any[];
    dragging: boolean;
    draggingIndex: any;
    path: any;
    selectedGroup: any;
    prevSelectedDot: any;

    constructor() {
        this.lines = [];
        this.dots = [];
        this.dragging = false;
        this.draggingIndex = null;
        this.selectedGroup = document.getElementById("selectedGroup");
    }

    initDots(selectedElements: any, [selectedDot, setSelectedDot]: any) {
        this.dots = [];
        this.lines = [];
        this.dragging = false;
        this.draggingIndex = null;
        this.selectedGroup = document.getElementById("selectedGroup");
        while (this.selectedGroup.firstChild) {
            this.selectedGroup.removeChild(this.selectedGroup.firstChild);
        }

        for (const selectedElement of selectedElements) {
            this.path = selectedElement.getAttribute("d");
            this.dots = this.path.match(/[a-df-z][^a-df-z]*/gi);
            if (!this.selectedGroup) return;

            let prevX = 0,
                prevY = 0;
            //console.log(this.dots);
            if (this.dots.length > 1) {
                [prevX, prevY] = this.dots[this.dots.length - 2]
                    .split(" ")
                    .slice(1);
            }
            this.dots.forEach((point: any, index: number) => {
                const [x, y]: [number, number] = point.split(" ").slice(1);
                if (!x || !y) return;
                const circle = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );
                circle.setAttribute("cx", x.toString());
                circle.setAttribute("cy", y.toString());
                circle.setAttribute("r", "5");
                circle.setAttribute("fill", "blue");
                circle.setAttribute("cursor", "move");
                circle.addEventListener("mousedown", (event) =>
                    mouseEvents.handleDotsMouseDown(event, index, [
                        selectedDot,
                        setSelectedDot,
                    ])
                );

                const line = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                );
                line.setAttribute("x1", prevX.toString());
                line.setAttribute("y1", prevY.toString());
                line.setAttribute("x2", x.toString());
                line.setAttribute("y2", y.toString());
                line.setAttribute("stroke", "blue");
                line.setAttribute("stroke-width", "2");
                line.setAttribute("id", "pathLine");
                line.setAttribute("cursor", "cell");
                line.addEventListener("mousedown", (event) => {
                    this.handleLineMouseDown(
                        event,
                        index,
                        [selectedDot, setSelectedDot],
                        selectedElements
                    );
                });
                [prevX, prevY] = [x, y];
                const g = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                );
                g.appendChild(line);
                g.appendChild(circle);
                this.lines.push(line);
                this.selectedGroup.appendChild(g);
            });
        }
    }

    clearDots() {
        const selectedGroup = document.getElementById("selectedGroup");
        if (!selectedGroup) return;

        while (selectedGroup.firstChild) {
            selectedGroup.removeChild(selectedGroup.firstChild);
        }
    }

    deleteDot(
        index: any,
        [selectedDot, setSelectedDot]: any,
        selectedElements: any
    ) {
        setSelectedDot(-1);
        const newPoints = this.dots.filter(
            (elem: any, indexDot: number) => indexDot !== index
        );

        // Проверяем, удалена ли первая точка
        if (index === 0) {
            // Если да, добавляем новую команду "M" к точке
            newPoints.splice(
                0,
                0,
                `M ${this.dots[1].split(" ")[1]} ${this.dots[1].split(" ")[2]}`
            );
        }

        const newPath = newPoints.join(" ");
        selectedElements[0].setAttribute("d", newPath);
        this.deleteCircle(index);
        this.dots = newPoints;
        this.initDots(selectedElements, [selectedDot, setSelectedDot]); // ???
    }

    handleMouseDown(
        event: any,
        index: any,
        [selectedDot, setSelectedDot]: any
    ) {
        const circle = event.target;
        if (circle) {
            //if (selectedDot) selectedDot.setAttribute("fill", "blue");
            if (this.prevSelectedDot)
                this.prevSelectedDot.setAttribute("fill", "blue");
            this.prevSelectedDot = circle;
            setSelectedDot(index);
            circle.setAttribute("fill", "red");
            this.dragging = true;
            this.draggingIndex = index;
            console.log(this.dots[this.draggingIndex]);
        }
    }

    handleLineMouseDown(
        event: MouseEvent,
        index: number,
        [selectedDot, setSelectedDot]: any,
        selectedElements: any
    ) {
        console.log("mouseLineDown");
        const svgRoot = document.getElementById("svgroot");
        if (!svgRoot) return;

        const editedSvg = svgRoot.getElementsByTagName("svg")[1];
        if (!editedSvg) return;

        const [x, y] = [event.clientX, event.clientY];

        const svgPoint = editedSvg.createSVGPoint();
        svgPoint.x = x;
        svgPoint.y = y;
        const pointTransformed = svgPoint.matrixTransform(
            editedSvg.getScreenCTM()?.inverse()
        );
        console.log("Конверт");
        const [convertX, convertY] = [pointTransformed.x, pointTransformed.y];

        const newDot = `L ${convertX.toFixed(2)} ${convertY.toFixed(2)}`;
        const newDots = [...this.dots];
        if (index === 0) newDots.splice(this.lines.length, 0, newDot);
        else newDots.splice(index, 0, newDot);

        this.dots = newDots;
        const newPath = newDots.join(" ");
        selectedElements[0].setAttribute("d", newPath);
        this.initDots(selectedElements, [selectedDot, setSelectedDot]);
    }

    handleMouseMove(
        event: any,
        moved: boolean,
        selectedElements: any,
        [prevX, setPrevX]: any,
        [prevY, setPrevY]: any
    ) {
        if (moved) {
            const deltaX = event.clientX - prevX;
            const deltaY = event.clientY - prevY;

            const newPoints = [...this.dots];

            const command = newPoints[this.draggingIndex][0];
            const params = newPoints[this.draggingIndex]
                .substr(1)
                .trim()
                .split(/\s+/);

            let x = parseFloat(params[0]);
            let y = parseFloat(params[1]);
            if (!isNaN(x)) {
                params[0] = x + deltaX;
            }
            if (!isNaN(y)) {
                params[1] = y + deltaY;
            }
            newPoints[this.draggingIndex] = command + " " + params.join(" ");
            this.dots = newPoints;
            const newPath = newPoints.join(" ");
            selectedElements[0].setAttribute("d", newPath);
            this.updateCircles(newPoints);
            this.updateLines(params[0], params[1]);
        }
        setPrevX(event.clientX);
        setPrevY(event.clientY);
    }

    updateLines(newX: any, newY: any) {
        const lineIndex1 = this.draggingIndex;
        this.lines[lineIndex1].setAttribute("x2", newX);
        this.lines[lineIndex1].setAttribute("y2", newY);

        const lineIndex2 = (this.draggingIndex + 1) % this.lines.length;
        this.lines[lineIndex2].setAttribute("x1", newX);
        this.lines[lineIndex2].setAttribute("y1", newY);
    }

    updateCircles(newPoints: any) {
        const circles = this.selectedGroup.querySelectorAll("circle");
        circles.forEach((circle: any, index: any) => {
            const [x, y] = newPoints[index].split(" ").slice(1);
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
        });
    }

    deleteCircle(index: number) {
        const circles = this.selectedGroup.querySelectorAll("circle");
        circles[index].remove();
    }

    handleMouseUp() {
        console.log("mouseUp");
        this.dragging = false;
    }

    getRelativeCoordinates(event: any, element: any) {
        const rect = element.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }
}

export const editDotsMode = new EditDotsMode();
