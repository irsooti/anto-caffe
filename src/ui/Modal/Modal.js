import React, { useLayoutEffect, useRef } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import cssModule from './Modal.module.css';
import { TweenMax, TimelineMax } from 'gsap/all';
import { Elastic } from 'gsap/EasePack';
import { Transition } from 'react-transition-group';

function Modal({ children, visible = false, toggle = () => {} }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      TweenMax.to(ref.current, 0.5, {
        ease: Elastic.easeOut,
        top: '0px'
      });
    }
  }, [visible]);

  return visible ? (
    <Backdrop visible={visible} toggle={toggle}>
      <div ref={ref} className={cssModule.modal}>
        <div aria-label="Annulla" className={cssModule.close} onClick={toggle}>
          <i className="fa fa-times" />
        </div>
        {children}
      </div>
    </Backdrop>
  ) : null;
}

export default Modal;
