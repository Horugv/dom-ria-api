import React from 'react'
import classes from './Button.module.scss'

const Button = props => {
    const cls = [
        classes.Button,
        classes[props.cls]
    ]

    return (
        <button
            type = {props.type}
            onClick = {(e) => props.onClick(e)}
            className = {cls.join(' ')}>
                {props.children}
        </button>
    )
}

export default Button