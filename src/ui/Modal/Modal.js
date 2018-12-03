import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import cssModule from './Modal.module.css';

function Modal({ children, visible, toggle = () => {} }) {
  return (
    <Backdrop visible={visible} toggle={toggle}>
      <div className={cssModule.modal}>
        <div className={cssModule.close} onClick={toggle}>
          <i className="fa fa-times" />
        </div>
        {children}
      </div>
    </Backdrop>
  );
}

export default Modal;
