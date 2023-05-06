class ChangePositionMode {
    handleMouseDown(
        event: any,
        [selectedElements, setSelectedElement]: [Array<any>, any]
    ): void {
        selectedElements.forEach((elem) => (elem.style.outline = ""));
        selectedElements = [];
        setSelectedElement(selectedElements);
        selectedElements.push(event.target);
        setSelectedElement(selectedElements);
        event.target.style.outline = "2px solid blue";
    }

    handleMouseMove(
        event: any,
        moved: any,
        [selectedElements]: any,
        [prevX, setPrevX]: any,
        [prevY, setPrevY]: any
    ): void {
        if (moved) {
            for (const selectedElement of selectedElements) {
                const deltaX = event.clientX - prevX;
                const deltaY = event.clientY - prevY;

                if (
                    selectedElement.tagName === "rect" ||
                    selectedElement.tagName === "circle" ||
                    selectedElement.tagName === "ellipse"
                ) {
                    // Изменяем значение атрибутов x и y на новые координаты
                    let x = selectedElement.getAttribute("x");
                    let y = selectedElement.getAttribute("y");
                    if (!x) {
                        x = selectedElement.getAttribute("cx");
                        y = selectedElement.getAttribute("cy");
                        selectedElement.setAttribute(
                            "cx",
                            parseInt(x) + deltaX
                        );
                        selectedElement.setAttribute(
                            "cy",
                            parseInt(y) + deltaY
                        );
                    } else {
                        selectedElement.setAttribute("x", parseInt(x) + deltaX);
                        selectedElement.setAttribute("y", parseInt(y) + deltaY);
                    }
                } else if (selectedElement.tagName === "line") {
                    // Изменяем значение атрибутов x1, y1, x2, y2 на новые координаты
                    let x1 = selectedElement.getAttribute("x1");
                    let y1 = selectedElement.getAttribute("y1");
                    let x2 = selectedElement.getAttribute("x2");
                    let y2 = selectedElement.getAttribute("y2");
                    selectedElement.setAttribute("x1", parseInt(x1) + deltaX);
                    selectedElement.setAttribute("y1", parseInt(y1) + deltaY);
                    selectedElement.setAttribute("x2", parseInt(x2) + deltaX);
                    selectedElement.setAttribute("y2", parseInt(y2) + deltaY);
                } else if (selectedElement.tagName === "path") {
                    // Получаем значение атрибута d
                    let d = selectedElement.getAttribute("d");
                    // Преобразуем значение атрибута d в массив команд и параметров
                    let pathArray = d.match(/[a-df-z][^a-df-z]*/gi);
                    // Проходим по всем командам и параметрам и изменяем координаты
                    for (let i = 0; i < pathArray.length; i++) {
                        let command = pathArray[i][0];
                        let params = pathArray[i].substr(1).trim().split(/\s+/);
                        for (let j = 0; j < params.length; j += 2) {
                            let x = parseFloat(params[j]);
                            let y = parseFloat(params[j + 1]);
                            if (!isNaN(x)) {
                                params[j] = x + deltaX;
                            }
                            if (!isNaN(y)) {
                                params[j + 1] = y + deltaY;
                            }
                        }
                        pathArray[i] = command + " " + params.join(" ");
                    }
                    // Обновляем значение атрибута d
                    selectedElement.setAttribute("d", pathArray.join(" "));
                }
            }
        }
        setPrevX(event.clientX);
        setPrevY(event.clientY);
    }
}

export const changePositionMode = new ChangePositionMode();
