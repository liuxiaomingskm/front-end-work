import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'

// 思路是判断props.showing是否为true 如果是true就更改backgroundColor的颜色，默认是灰色
const Card = (props) => {
  let style = {};
  if (props.showing) {
    style.backgroundColor = props.backgroundColor;
  }
  return (
    <div
      onClick={props.onClick}
      className="card-container"
      style={style}
    />
  );
};

Card.propTypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;

