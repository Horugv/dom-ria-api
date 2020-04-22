import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'

import classes from './Header.module.scss'


class Header extends Component {

    state = {
        prevScrollpos: 0
    }
    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
    
        this.setState({
            prevScrollpos: currentScrollPos,
        });
      
    };
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }

    render(){
        let cls = [classes.header]
        if(this.state.prevScrollpos > 150){
            cls.push(classes.header_fixed)
        } 
        return (
            <header className = {cls.join(' ')}>
                <div className = {classes.header_wrap}>
                    <Link to = '/' className = {classes.logo}>Ігонін Є.Р.</Link>
                    <nav className = {classes.navigation}>
                        <ul className = {classes.nav_list}>
                            <li className = {classes.nav_item}>
                                <NavLink to = "/1" exact className = {classes.nav_link} activeClassName = {classes.active}>Головна</NavLink>
                            </li>
                            <li className = {classes.nav_item}>
                                <NavLink to = "/wish-list-1" exact className = {classes.nav_link} activeClassName = {classes.active}>Список побажань</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                

            </header>
        )
    }
}

export default Header