import React, { PropTypes } from 'react'
import './Button.css'

const Button = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button className={className} onClick={onClick}>{ label }</button>
  )
}

Button.proptypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
