import { useContext } from 'react'
import reactCSS from 'reactcss';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const OrderEditor = observer(function() {

  const {selectedElements} = useContext(Context)
  
  const styles = reactCSS({
    'default': {
      arrowButton: {
        width: '30px',
        height: '30px',
        padding: '5px',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        outline: '1px solid #ccc'
      },
      arrowButtonDown: {
        width: '30px',
        height: '30px',
        padding: '5px',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        outline: '1px solid #ccc',
        transform: 'rotate(180deg)',
      },
      svg: {
        position: 'absolute',
      }
    },
  });

  const handleMoveUp = () => {
    if (selectedElements.list[0]) {
      const currentElement = selectedElements.list[0];
      const nextElement = currentElement.nextElementSibling;

      const svgElement = document.getElementById('svgroot');
      const image = svgElement.childNodes[1];

      if (nextElement) { // если есть следующий элемент
        image.insertBefore(nextElement, currentElement); // переместить следующий элемент после текущего
      }
    }
  }

  const handleMoveDown = () => {
    if (selectedElements.list[0]) {
      const currentElement = selectedElements.list[0];
      const previousElement = currentElement.previousElementSibling;

      const svgElement = document.getElementById('svgroot');
      const image = svgElement.childNodes[1];

      if (previousElement) { // если есть предыдущий элемент
        image.insertBefore(currentElement, previousElement); // переместить перед элементом
      }
    }
  }

  return (
    <>
      <div style={styles.arrowButton} onClick={handleMoveUp}>
        <svg style={styles.svg} version="1.1" id="Capa_1" x="0px" y="0px"
          width="20px" height="20px" viewBox="0 0 284.929 284.929">
          <g>
            <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
              C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
              c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
              c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
              C284.929,199.378,283.984,197.188,282.082,195.285z"/>
          </g>
        </svg>
      </div>
      <div style={styles.arrowButtonDown} onClick={handleMoveDown}>
        <svg style={styles.svg} version="1.1" id="Capa_1" x="0px" y="0px"
          width="20px" height="20px" viewBox="0 0 284.929 284.929">
          <g>
            <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
              C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
              c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
              c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
              C284.929,199.378,283.984,197.188,282.082,195.285z"/>
          </g>
        </svg>
      </div>
    </> 
  );
}) 

export default OrderEditor