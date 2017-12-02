import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export default function Button({ children, searchBtn, color }) {
    return <button className={cx('btn', { 'search': searchBtn }, `${color}`)}>{children}</button>;
}