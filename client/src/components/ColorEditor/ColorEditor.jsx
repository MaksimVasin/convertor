import { useState, useContext, useEffect } from 'react'
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { observer } from 'mobx-react-lite';
import colorString from 'color-string';
import { Context } from '../..';

const ColorEditor = observer(function() {

  const {selectedElements} = useContext(Context)
  const [displayColorPicker, setDisaplyColorPicker] = useState(false)
  const [curColor, setCurColor] = useState(colorString.to.hex([255,255,255]))
  const [curBorderColor, setCurBorderColor] = useState(colorString.to.hex([255,255,255]))
  const [modColor, setModColor] = useState(false)

  useEffect(() => {
    if (selectedElements.list) {
      selectedElements.list.forEach(selectedElement => {
        const fill = selectedElement.getAttribute("fill");
        const rgb = colorString.get.rgb(fill) || [255, 255, 255];
        const hex = colorString.to.hex(rgb);
        setCurColor(hex);

        const stroke = selectedElement.getAttribute("stroke");
        const rgbBorder = colorString.get.rgb(stroke) || [255, 255, 255];
        const hexBorder = colorString.to.hex(rgbBorder);
        setCurBorderColor(hexBorder);
      })
    }
  }, [selectedElements.list])
  
  const handleClick = (mod) => {
    setModColor(mod);
    setDisaplyColorPicker(!displayColorPicker);
  };
  
  const handleClose = () => {
    setDisaplyColorPicker(false);
  };
  
  const handleChange = (color) => {
    if (modColor) {
      setCurColor(color.hex);
      selectedElements.list[0].setAttribute("fill", color.hex);
    }
    else {
      setCurBorderColor(color.hex);
      selectedElements.list[0].setAttribute("stroke", color.hex);
    }
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
        backgroundColor: curColor
      },
      colorBorder: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
        backgroundColor: '#ccc',
      },
      swatch: {
        padding: '5px',
        background: '#ccc',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      swatchBorder: {
        padding: '5px',
        background: curBorderColor,
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <>
      <div style={ styles.swatch } onClick={ () => handleClick(true) }>
        <div style={ styles.color } />
      </div>
      <div style={ styles.swatchBorder } onClick={ () => handleClick(false) }>
        <div style={ styles.colorBorder } />
      </div>
        { displayColorPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        { modColor ? <SketchPicker color={ curColor } onChange={ handleChange } /> 
        : <SketchPicker color={ curBorderColor } onChange={ handleChange } /> }
      </div> : null }
    </> 
  );
}) 

export default ColorEditor