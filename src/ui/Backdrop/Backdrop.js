import React from 'react';
import style from './Backdrop.module.css';

const backdrop = ({ visible = false, children, toggle = () => {} }) => {
  let classes = [style.Backdrop];
  visible ? classes.push(style.open) : classes.push(style.closed);

  return <div className={classes.join(' ')}>{children}</div>;
};

export default backdrop;
