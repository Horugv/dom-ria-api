import React, {Component} from 'react'
import classes from './AdvertisementItem.module.scss'
import Slider from '../Slider/Slider';
import noImg from '../../img/noImg.png'
import Button from '../../Component/UI/Button/Button';
import Preloader from '../../Component/Preloader/Preloader';

class AdvertisementItem extends Component {


  state = {
      error: null,
      isLoaded: false,
      items: [],
      price: [],
      tabIndex: 1,
      img: [],
      imgArr: [],
      inWishList: false
  }


  async loadImg(){
    const { items} = this.state;
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
      } else {
        let img = <img src = {noImg} alt="Головане зображення"  className = {classes.img}/>
        this.setState({
          img: img
        })
      }
    }
  }


  async loadImgAll(){
    const { items} = this.state;
    if(items.photos){

      let photoAll = items.photos
      let test = Array.from( items.photos)
      let arr = []
      let arrImg = []
      test.map(id => arr.push(id))


      let keyObj = []
      for (let [key] of Object.entries(photoAll)) {
        keyObj.push(key)
        
      } 
      for(let i = 1; i <= Object.keys(photoAll).length; i++){
        if(photoAll[keyObj[i]]){
          
          
          if(arrImg.indexOf(photoAll[keyObj[i]]["file"]) < 0){
            
            let imgUlr = photoAll[keyObj[i]]["file"]


            let url = "https://cdn.riastatic.com/photos/" + imgUlr.slice(0, imgUlr.length - 4)  + 'b.webp'
            let response = await fetch(url)
            
            
            
            let blob = await response.blob() 
            let blobUrl = URL.createObjectURL(blob)
            
            if(response.status < 400 || response.status > 500){
              arrImg.push(<img src = {blobUrl} alt={url} key = {i} className = {classes.imgAll}/>)
            } 
          }
        }         
      }
      this.setState({
        imgArr: arrImg
      })
    }
  }
  
  advertisementId = () =>{
    const inWish = this.state.inWishList
    if(!inWish){
      this.props.addInWishList(this.props.match.params.id)
    } else {
      this.props.removeFromWishList(this.props.match.params.id)
    }
    
    this.setState({
      inWishList: !inWish
    })
  }
  
  stateWish = () => {
    if(this.props.wishList.indexOf(this.props.match.params.id) === -1){
      this.setState({
        inWishList: false
      })
    } else {
      this.setState({
        inWishList: true
      })
    }
  }

  componentDidMount() {
    fetch(`https://developers.ria.com/dom/info/${this.props.match.params.id}?api_key=yZ9R5L9N4EsZHvBAJSzOhth9VaYcYfePqiRadT2P`)
    .then((res) => res.json())
    .then(
        (res) => {
          this.setState({
            isLoaded: true,
            items: res,
            price: res.priceArr
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
    ).then(() => this.loadImg())
    .then(() => this.loadImgAll())
    .then(() => this.stateWish())
  }


  render () {
    const {items, imgArr, img, price, tabIndex, error, isLoaded} = this.state
    let description = '';
    this.state.items.description_uk 
                ? description += this.state.items.description_uk
                : description += this.state.items.description

    if (error) {
      return <div className = {classes.advertisements}>Помилка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className = {classes.advertisements_preloader} >
          <Preloader />
      </div>;
    } else if(items === undefined || items["error"]?items["error"].code === "OVER_RATE_LIMIT":!items){
        return <div className = {classes.advertisements_preloader} >
            <Preloader />
        </div>;
    }
    else{    
      return (
        
        <div className = {classes.AdvertisementItem}>
          
          <h2>
            {`
              ${items.rooms_count === 1? items.rooms_count+"-о кімнатна": items.rooms_count+"-x кімнатна"}
              ${items.rooms_count && items.realty_type_name.toLowerCase()},
              ${items.floor && "на "+items.floor+" поверсі"}
              `}
          </h2>
          
          <div className = {classes.main_photo}>
            {img}
          </div>
          {imgArr && <Slider imgArr = {imgArr}/>}
          
          {console.log(this.state.inWishList, this.props.wishList)}
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
        
          <div className = {classes.tab_block}>
            <button className={classes.tab_btn} onClick = {() => this.setState({tabIndex: 1})}>Основна інформація</button>
            <button className={classes.tab_btn} onClick = {() => this.setState({tabIndex: 2})}>Характеристики</button>
          </div>

          <section className={classes.tabs_content}>
            {tabIndex === 1 
            ? <article>
              <h2>Опис: </h2>
              <p className = {classes.desc}>{description}</p>
              <h3>Ціна: </h3>
              <p className = {classes.price}>{price[1]} $</p>
              {/* <p>Євро: {price[2]}</p> */}
              <p className = {classes.price}>{price[3]} &#8372;</p>
              <h3>Місцезнаходження</h3>
              <p>{`
                  ${items.city_name},
                  ${items.district_type_name !== undefined ? items.district_type_name: "" } 
                  ${"," + items.district_name !== undefined ? items.district_name:  ""}
                  ${items.street_name !== undefined ? items.street_name: ""} 
                  ${items.building_number_str !== undefined ? items.building_number_str: ""}`
              }</p>
            </article> 
            : null}
            
            {tabIndex === 2 
            ? <div>
                <h2>Характеристики</h2>
                <ul className = {classes.characteristics_list}>   
                  <li className = {classes.characteristics_item}>
                    <label className = {classes.label}>Кількість кімнат: </label>
                    <p>{items.rooms_count}</p>
                  </li>
                  <li className = {classes.characteristics_item}>
                    <label className = {classes.label}>Тип стін: </label>
                    <p>{items.wall_type}</p>
                  </li>
                  <li className = {classes.characteristics_item}>
                    <label className = {classes.label}>Поверх: </label>
                    <p>{items.floor}</p>
                  </li>
                  <li className = {classes.characteristics_item}>
                    <label className = {classes.label}>Площа кухні: </label>
                    <p>{items.kitchen_square_meters} м<sup>2</sup></p>
                  </li>
                  <li className = {classes.characteristics_item}>
                    <label className = {classes.label}>Площа гостинної: </label>
                    <p>{items.living_square_meters} м<sup>2</sup></p>
                  </li>
                  <li className = {classes.characteristics_item}>
                    <label className = {classes.label}>Загальна площа: </label>
                    <p>{items.total_square_meters} м<sup>2</sup></p>
                  </li>
                </ul>
              </div>
            : null}
            
          </section>
        </div>
      )
    }
  }
    
}

export default AdvertisementItem