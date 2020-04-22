import React, {Component} from 'react';

import classes from './App.module.scss';
import {Route,  Switch} from 'react-router-dom'

import Header from './Component/Header/Header'
import AdvertisementList from './containers/AdvertisementList/AdvertisementList'
import WishList from './containers/WishList/WishList';

import AdvertisementItem from './containers/AdvertisementItem/AdvertisementItem';
import Footer from './Component/Footer/Footer';
import MainPage from './Component/MainPage/MainPage';


class App extends Component {

  state = {
    wishListId: [],
    prevScrollpos: window.pageYOffset
  }

  addInWishList = (id) => {
    const { wishListId } = this.state
    wishListId.push(id)
    this.setState({wishListId})
    this.save()
  }
  removeFromWishList = (id) => {
    const { wishListId } = this.state
    const index = wishListId.indexOf(id)
    wishListId.splice(index,1)
    this.save()
  }

  save() {
    let wishList = [...this.state.wishListId]
    localStorage.setItem(
      'wishList',
      JSON.stringify({wishList: wishList})
    )
  }

  load() {
    return JSON.parse(localStorage.getItem('wishList'))
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.wishListId !== this.state.wishListId){
      this.save()
    }
  }

  componentDidMount(){
    if(this.load() !== null){
      this.setState({wishListId: this.load().wishList})
    }
  }

  render() {
    return (
    
      <div className={classes.App}>
        <Header />

          
        
        <Switch>
          <Route path = '/' exact component = {MainPage}/>
          <Route path = '/wish-list-:page' render = {(props) => <WishList addInWishList = {this.addInWishList} removeFromWishList = {this.removeFromWishList} wishList = {this.state.wishListId} {...props}/> } />
          <Route path = '/advertisement-:id' render = {(props) => <AdvertisementItem addInWishList = {this.addInWishList} removeFromWishList = {this.removeFromWishList} wishList = {this.state.wishListId} {...props}/>} />
          <Route path = '/:page' render = {(props) => <AdvertisementList addInWishList = {this.addInWishList} removeFromWishList = {this.removeFromWishList} wishList = {this.state.wishListId} {...props}/>} />
        </Switch>
        


        <Footer />
      </div>
    )
  }
  
}

export default App;
