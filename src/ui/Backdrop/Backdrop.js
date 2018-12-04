import React from 'react';
import style from './Backdrop.module.css';

const backdrop = ({ visible = false, children, toggle = () => {} }) => {
  let classes = [style.Backdrop];

  if (visible) document.querySelector('body').style.overflow = 'hidden';
  else document.querySelector('body').style.overflow = 'initial';

  visible ? classes.push(style.open) : classes.push(style.closed);

  return visible ? <div className={classes.join(' ')}>{children}</div> : null;
};

export default backdrop;
