import { useContext, useEffect, useState } from 'react'
import reactCSS from 'reactcss';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { Mode } from '../../store/ModeStore';
import { editDotsMode } from '../SvgEditor/editDotsMode';

const DotsEditor = observer(function() {

  const {mode} = useContext(Context);
  const {selectedElements} = useContext(Context);
  const [edited, setEdited] = useState(mode.mode === Mode.editDotes);

  const setSelectedDot = (dot) => {
    selectedElements.setSelectedDot(dot);
  }

  const changeMod = () => {
    if (mode.mode === Mode.editDotes) {
      mode.setMode(Mode.default);
      setEdited(false);
      editDotsMode.clearDots()
    }
    else {
      mode.setMode(Mode.editDotes);
      setEdited(true);
      editDotsMode.initDots(selectedElements.list, [selectedElements.dot, setSelectedDot])
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Delete') {
        deleteDot()
      }
    });
  }, [])

  const deleteDot = () => {
    if (mode.mode === Mode.editDotes) {
      editDotsMode.deleteDot(selectedElements.dot, [selectedElements.dot, setSelectedDot], selectedElements.list);
    }
    else {
      if (selectedElements.list.length !== 0) {
        selectedElements.list[0].remove();
        selectedElements.list.pop();
      }
    }
  }

  const styles = reactCSS({
    'default': {
      dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'black',
      },
      btn: {
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        outline: '1px solid #ccc',
        display: 'inline-block',
        cursor: 'pointer',
        backgroundColor: edited ? '#ccc' : '#fff',
      },
      btnDelete: {
        width: '30px',
        height: '30px',
        padding: '5px',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        outline: '1px solid #ccc',
        display: 'inline-block',
        cursor: 'pointer',
      },
      svg: {
        position: 'absolute',
      }
    },
  });

  return (
    <>
      <div style={ styles.btn } onClick={changeMod}>
        <div style={ styles.dot } />
      </div>
      <div style={ styles.btnDelete } onClick={deleteDot}>
        <svg style={ styles.svg } width="20px" height="20px" viewBox="0 0 612.043 612.043">
          <path d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0
            L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61
            c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576
            c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"/>
        </svg>
      </div>
      <div>{ selectedElements.dot }</div>
    </> 
  );
}) 

export default DotsEditor