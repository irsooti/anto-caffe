import React from 'react';
import style from './Backdrop.module.css';

class Backdrop extends React.Component {
  componentWillUnmount() {
    document.querySelector('body').classList.remove('modalOpen');
  }

  render() {
    const { visible, children } = this.props;
    let classes = [style.Backdrop];
    if (visible) {
      document.querySelector('body').classList.add('modalOpen');
      visible ? classes.push(style.open) : classes.push(style.closed);
    } else {
      document.querySelector('body').classList.remove('modalOpen');
    }

    return visible ? <div className={classes.join(' ')}>{children}</div> : null;
  }
}

export default Backdrop;
