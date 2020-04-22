import React, {Component} from 'react';
import Advertisements from '../Advertisements/Advertisements';
import PageList from '../../Component/PageList/PageList';
import classes from './WishList.module.scss'

class WishList extends Component {
    state = {
        wishListId: [],
        onScreen: [],
        idOnScreen: [],
        adOnPage: 5,  // Кількість оголошень на сторінці
        countPage: 0,  // Кількість сторінок
    }

    countOfPage = () => {
        const countPage = Math.ceil(this.props.wishList.length / this.state.adOnPage)                                           
        return this.setState({countPage})
    }
     
    renderList = () => {
        const page = this.props.match.params.page
        
        const numberAd = this.state.adOnPage;
        let onScreen = []
            for(let i = (page - 1) * numberAd ; i < page * numberAd; i++){
                onScreen.push(i)
            }
        const idOnScreen = []
        onScreen.map(id => idOnScreen.push(this.props.wishList[id]))
        this.setState({
            idOnScreen,
            onScreen
        })

    }

    load() {
        return JSON.parse(localStorage.getItem('wishList'))
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.match.params.page !== this.props.match.params.page){
            this.renderList()
            this.countOfPage()  
        }
        if(prevProps.wishList !== this.props.wishList){
            this.renderList()
        }
    }
    
    componentDidMount() {
        this.renderList()

        this.setState({wishListId: this.load().wishList})
          
        this.countOfPage()
        
    }

    
    render () {
        
        return (
            <div className = {classes.WishList}>
                <h3 className = {classes.count_in_wish}>Кількість вибраних оголошень: {this.props.wishList.length}</h3>
                <ul className = {classes.list}>
                    
                    {this.state.idOnScreen.map((id, index) =>                    
                        <Advertisements 
                            key = {index}
                            id = {id}
                            addInWishList = {this.props.addInWishList}
                            removeFromWishList = {this.props.removeFromWishList}
                            wishList = {this.props.wishList}
                        />
                    )}
                    
                </ul>
                {this.state.countPage <= 1 
                ? null
                : <PageList countPage = {Math.ceil(this.state.countPage)} page = {this.props.match.params.page} typeOfPage = {'wish-list-'}/> }
            </div>
        )
    }
}

export default WishList