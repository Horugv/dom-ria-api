import React, {Component} from 'react';
import PageList from '../../Component/PageList/PageList';
import Advertisements from '../Advertisements/Advertisements';
import SearchFilter from '../SearchFilter/SearchFilter';
import classes from './AdvertisementList.module.scss'
import Preloader from '../../Component/Preloader/Preloader';

 
class AdvertisementList extends Component {
    state = {  
        onScreen: [],
        inWishList: [], // в ізбранному 
        adOnPage: 5,  // Кількість оголошень на сторінці
        countPage: 0,  // Кількість сторінок
        error: null,    // Помилка при загрузці
        isLoaded: false,    // Статус загрузки
        items: [],       // id оголошень
        count : 0,      // к-сть оголошень 
        roomFrom: 1,    // кількість кімнат з
        roomTo: 4,      // кількість кімнат по
        priceFrom: 1, // ціна з
        priceTo: 999999999,   // ціна по
    }


    countOfPage = () => {
        if(this.state.items === undefined){
            return
        } else {
            const countPage = this.state.items.length / this.state.adOnPage                                                                                                         
            return this.setState({countPage})
        }
    }
     
    renderList = () => {
        const page = this.props.match.params.page

        const numberAd = this.state.adOnPage;
        let onScreen = []
 
            
        for(let i = (page - 1) * numberAd ; i < page * numberAd; i++){
            onScreen.push(i)
        }
            
        this.setState({
            onScreen
        })
    }
   
    filterRoom = (roomFrom, roomTo, priceFrom, priceTo) =>{
        this.setState({
            roomFrom,
            roomTo, 
            priceFrom, 
            priceTo
        })
    }

    searchList = (roomFrom, roomTo, priceFrom, priceTo) => {
        fetch(`https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&characteristic[209][from]=${roomFrom}&characteristic[209][to]=${roomTo}&characteristic[234][from]=${priceFrom}&characteristic[234][to]=${priceTo}&characteristic[242]=239&api_key=yZ9R5L9N4EsZHvBAJSzOhth9VaYcYfePqiRadT2P`)
        .then((res) => res.json()).then(
            (res) => {
              this.setState({
                isLoaded: true,
                items: res.items,
                count: res.count
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            } 
        ).then(() => this.countOfPage())
        .then(() =>
            this.renderList()
        )
    } 

    componentDidUpdate(prevProps, prevState) {
        if(
            this.state.roomFrom !== prevState.roomFrom ||
            this.state.roomTo !== prevState.roomTo ||
            this.state.priceFrom !== prevState.priceFrom ||
            this.state.priceTo !== prevState.priceTo){
                this.searchList(this.state.roomFrom, this.state.roomTo, this.state.priceFrom, this.state.priceTo)
                
        }
        if(prevProps.match.params.page !== this.props.match.params.page){
            this.renderList()
        }
        

    }
    componentDidMount() {
        this.searchList(this.state.roomFrom, this.state.roomTo, this.state.priceFrom, this.state.priceTo)
    }   
    
    loadList = () => {
        const { error, isLoaded, countPage, items } = this.state;
        if (error) {
            return <div className = {classes.advertisements}>Помилка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className = {classes.advertisements_preloader} >
                <Preloader />
            </div>;



        } else if(items === undefined){
            return <div className = {classes.advertisements_preloader} >
                <Preloader />
            </div>;
        }
        else{
            return (
                <div className = {classes.advertisements}>
                    <h3 className = {classes.advertisements_count}>Кількість оголошень: {items.length}</h3>
              
                    <ul className = {classes.list} >
                        {this.state.onScreen.map((id, index) => 
                            <Advertisements 
                                key = {id}
                                id = {items[id]}
                                addInWishList = {this.props.addInWishList}
                                removeFromWishList = {this.props.removeFromWishList}
                                wishList = {this.props.wishList}
                            />
                        )}
                    </ul>

                    <PageList countPage = {Math.ceil(countPage)} page = {this.props.match.params.page} typeOfPage = {''}/>             
                </div>
                
            );
        }
    }

    render () {
        
            return (
                <div className = {classes.AdvertisementsList}>
                    <div className = {classes.AdvertisementsList_wrap}>
                        <SearchFilter filterRoom = {this.filterRoom}/>
                        {this.loadList()}
                    </div>           
                </div>               
            );
        }
    
}

export default AdvertisementList
