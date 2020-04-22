import React from 'react'
import { Link } from 'react-router-dom'

import classes from './MainPage.module.scss'

const MainPage = () => {
    return (
        <div className = {classes.MainPage}>
            <Link to = {'/1'} className = {classes.btn}>Список оголошень</Link>
            <Link to = {'/wish-list-1'}className = {classes.btn}>Список побажань</Link>
        </div>
    )
}

export default MainPage