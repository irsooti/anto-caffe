import React, { Component } from 'react';
import cssModule from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../../ui/Button/Button';

export default class Toolbar extends Component {
  render() {
    const { isOpen, onToggle } = this.props;

    if (isOpen) document.querySelector('body').classList.add('toolbarOpen');
    else document.querySelector('body').classList.remove('toolbarOpen');

    let classes = [cssModule.toolbar];
    if (isOpen) classes.push(cssModule.toolbarIsOpen);
    return (
      <div className={classes.join(' ')}>
        <div className={cssModule.container}>
          <div className={cssModule.header}>
            <span className={cssModule.close} onClick={onToggle}>
              <span className="fa fa-times" />
            </span>
          </div>
          <div className={cssModule.body}>
            <nav className={cssModule.nav}>
              <NavLink
                onClick={onToggle}
                className={cssModule.navItem}
                exact
                to="/dailyorder"
              >
                Ordini di Tutti
              </NavLink>

              <NavLink
                onClick={onToggle}
                className={cssModule.navItem}
                exact
                to="/order"
              >
                Ordina
              </NavLink>
              <NavLink
                onClick={onToggle}
                className={cssModule.navItem}
                exact
                to="/profile"
              >
                Profilo
              </NavLink>

              <NavLink
                onClick={onToggle}
                className={cssModule.navItem}
                exact
                to="/myorder"
              >
                I Miei ordini
              </NavLink>
            </nav>
          </div>
          <div className={cssModule.footer}>
            <Button
              icon="fa fa-bug"
              text="Bug tracker"
              onClick={() => {
                window.open(
                  'https://github.com/irsooti/anto-caffe/issues',
                  '_blank'
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
