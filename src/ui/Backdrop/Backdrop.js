import React from 'react';
import style from './Backdrop.module.css';

const backdrop = ({ visible = false, children, toggle = () => {} }) => {
  let classes = [style.Backdrop];

  if (visible) document.querySelector('body').classList.add('modalOpen');
  else document.querySelector('body').classList.remove('modalOpen');

  visible ? classes.push(style.open) : classes.push(style.closed);

  return visible ? <div className={classes.join(' ')}>{children}</div> : null;
};

export default backdrop;
