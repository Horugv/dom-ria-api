import React from 'react'
import { Link } from 'react-router-dom'

import classes from './MainPage.module.scss'

const MainPage = () => {
    return (
        <div className = {classes.MainPage}>
            <Link to = {'/dom-ria-api/1'} className = {classes.btn}>Список оголошень</Link>
            <Link to = {'/dom-ria-api/wish-list-1'}className = {classes.btn}>Список побажань</Link>
        </div>
    )
}

export default MainPage