import React from 'react';
import classes from './Preloader.module.scss'

const Preloader = () => {
    return (
        <div className = {classes.Preloader}>
            <div className = {classes.preloader_spiner}>
                <div></div>
                <div><div></div></div>
            </div>
        </div>
    )
}


export default Preloader
