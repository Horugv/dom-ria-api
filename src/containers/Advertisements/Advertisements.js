import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Advertisements.module.scss'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../Component/UI/Button/Button';
import Preloader from '../../Component/Preloader/Preloader';
import noImg from '../../img/noImg.png'

class Advertisements extends Component {
    state = {
        isLoaded: false,
        items: [],
        error: null,
        inWishList: false,
        img: []
    }

    advertisementId = () =>{
      const inWish = this.state.inWishList
      if(!inWish){
        this.props.addInWishList(this.props.id)
      } else {
        this.props.removeFromWishList(this.props.id)
      }
      
      this.setState({
        inWishList: !inWish
      })
    }

    checkWish = () => {
      this.props.wishList.indexOf(this.props.id) === -1? this.setState({inWishList: false}) : this.setState({inWishList: true})
    }

    searchAdvertisemen = (id) => {
      fetch(`https://developers.ria.com/dom/info/${id}?api_key=yZ9R5L9N4EsZHvBAJSzOhth9VaYcYfePqiRadT2P`)
      .then((res) => res.json()).then(
          (res) => {
            this.setState({
              isLoaded: true,
              items: res,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          } 
      ).then(() => this.checkWish())
      .then(() => this.loadImg())
    }
    
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.id !== this.props.id){
        this.searchAdvertisemen(this.props.id)
      }
      
    }

    componentDidMount() {
      this.searchAdvertisemen(this.props.id)

    }

    async loadImg(){
      const {items} = this.state;
      if(items.main_photo){
        let photo = items.main_photo
        let url = "https://cdn.riastatic.com/photos/" + photo.slice(0, photo.length - 4)  + 'b.webp'
        let response = await fetch(url);
        let blob = await response.blob();
        let blobUrl = URL.createObjectURL(blob)
        let test = <img src = {blobUrl} alt="Головане зображення"  className = {classes.img}/>
        
        if(response.status < 400 || response.status > 500){
          
          this.setState({
            img: test
          })
        } else if(response.status > 400 || response.status < 500 || !response.status){
         
          let img = <img src = {noImg} alt="Головане зображення"  className = {classes.img}/>
          this.setState({
            img: img
          })
        }
        
      } else {
        let img = <img src = {noImg} alt="Головане зображення"  className = {classes.img}/>
          this.setState({
            img: img
          })
      }
    }

    loadItem = () => {
      const { error, isLoaded, items} = this.state;
      let description = '';
      items.description_uk 
                  ? description += items.description_uk
                  : description += items.description

      
      
      if (error) {
          return <div>Помилка: {error.message}</div>;
      } else if (!isLoaded) {
          return <div><Preloader /></div>;
      } else 
      { 

        return (
          this.props.id !== undefined
            ?<li className = {classes.advertlist_item}>
                {this.state.img}
                
                {this.state.items &&  
                  <div className = {classes.advertlist_desc}>
                    
                    <Link 
                      to = {'/advertisement-' + this.props.id}
                      className = {classes.link}>
                        {`
                        
                        ${items.rooms_count === 1? items.rooms_count+"-о кімнатна": items.rooms_count+"-x кімнатна"}
                        ${items.realty_type_name !== undefined ? items.realty_type_name.toLowerCase(): ''},
                        ${items.floor !== undefined ? "на "+items.floor+" поверсі": ''},
                        ${items.city_name},
                        ${items.district_type_name !== undefined ? items.district_type_name.toLowerCase(): ''} 
                        ${items.district_name !== undefined ? items.district_name: ''},
                        ${items.street_name !== undefined ? items.street_name: ''} 
                        ${items.building_number_str !== undefined ? items.building_number_str: ''}
                        `}
                    </Link> 
                    <p>Ціна: {items.price_total}$</p>
                    <p>{description.slice(0,40)}...</p>

                    <p>Створено: {items.created_at}</p>

                    
                    
                    {!this.state.inWishList 
                      ? <Button 
                        cls = "add"
                        type = "submit"
                        onClick = {this.advertisementId} 
                      >
                      В обрані
                      </Button>
                      : 
                      <Button 
                        cls = "remove"
                        type = "submit"
                        onClick = {this.advertisementId} 
                      >
                      Видалити з обраних
                      </Button>
                    }
                    
                  
                  </div>
                }
              
            </li>
            : null
        )
      } 
    }
    // `http://developers.ria.com/dom/info/${id}?api_key=yZ9R5L9N4EsZHvBAJSzOhth9VaYcYfePqiRadT2P`
    render () {
                      
      return (
        <Auxiliary>
          {this.loadItem()}
        </Auxiliary>
      )
    } 
    
    
}

export default Advertisements