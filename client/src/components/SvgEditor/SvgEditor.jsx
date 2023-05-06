import { useRef, useContext } from "react";
import { useState } from 'react'
import { mouseEvents } from "./mouseEvents";
import ColorEditor from "../ColorEditor/ColorEditor";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import OrderEditor from "../OrderEditor/OrderEditor";
import DotsEditor from "../DotsEditor/DotsEditor";

const SvgEditor = observer(function() {
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const svgRef = useRef(null);

  const {selectedElements} = useContext(Context)
  const {mode} = useContext(Context)
  const setSelectedElements = (element) => {
    selectedElements.setSelectedElements(element)
  }

  return (
    <>
      <div style={{display: 'flex', marginBottom: '8px', gap:'10px'}}>
        <ColorEditor/>
        <OrderEditor/>
        <DotsEditor/>
      </div>
      <div
        ref={svgRef}
        style={{ position: 'relative', width: '100%', height: '100%', outline: '3px solid black', backgroundColor: '#ccc' }}
        onMouseMove={(e) => mouseEvents.handleMouseMove(e, mode.mode, [selectedElements.list], [prevX, setPrevX], [prevY, setPrevY])}
        onMouseUp={(e) => mouseEvents.handleMouseUp(e, mode.mode, [selectedElements.list, setSelectedElements])}
      >
        <svg width="100%" height="640" id="svgroot" xlinkns="http://www.w3.org/1999/xlink" onMouseDown={(e) => mouseEvents.handleMouseDown(e, mode.mode, [selectedElements.list, setSelectedElements])}>

          <svg id="canvasBackground" width="800" height="460" x="100" y="50" overflow="none" style={{pointerEvents: 'none'}}>
            <defs id="placeholder_defs">
              <pattern id="checkerPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="20" height="20" viewBox="0 0 10 10">
                <rect x="0" y="0" width="10" height="10" fill="#fff" stroke="none"></rect>
                <rect x="0" y="0" width="5" height="5" fill="#eee" stroke="none"></rect>
                <rect x="5" y="5" width="5" height="5" fill="#eee" stroke="none"></rect>
              </pattern>
            </defs>
            <rect width="100%" height="100%" x="0" y="0" stroke="#000" fill="url(#checkerPattern)" style={{pointerEvents: 'none'}}></rect>
          </svg>

          <svg width="100%" height="100%" style={{overflow: 'visible'}}>
            <circle cx="50" cy="50" r="20" fill="red"/>
            <rect x="100" y="100" width="50" height="50" fill="blue" stroke="black" strokeWidth="5"/>
            <path d="M200 50 L250 100 L200 150 L150 100 Z" fill="green"/>
            <line x1="350" y1="50" x2="400" y2="100" stroke="black" strokeWidth="2" />

            <g>
              <path d="M250 60 L250 100 L200 150 L150 100 Z" fill="red"/>
              <path d="M200 50 L250 100 L200 150 L150 100 Z" fill="yellow"/>
            </g>
          </svg>

          <g id='selectedGroup'></g>
        </svg>
      </div>
    </> 
  );
})

export default SvgEditor