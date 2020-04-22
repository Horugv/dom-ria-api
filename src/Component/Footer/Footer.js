import React from 'react'
import classes from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className = {classes.footer}>
            <div className = {classes.footer_wraper}>
                <p>&#169; Ігонін Є.Р.</p>
                <p>2020</p>
            </div>
        </footer>
    )
}

export default Footer