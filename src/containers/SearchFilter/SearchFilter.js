import React, {Component} from 'react'
import classes from './SearchFilter.module.scss'
import Button from '../../Component/UI/Button/Button'

class SearchFilter extends Component{

    state = {
        roomFrom: 1,
        roomTo: 99,
        priceFrom: 0,
        priceTo: 999999999
    }

    updateStateFrom = (state, updateState) => {
        if(updateState === ''){
            return this.setState({
                [state]: 1  
            })
        } else {
            return this.setState({
                [state]: parseInt(updateState)
            })
        }
    }

    updateStateTo = (state, updateState) => {
        if(updateState === ""){
            return this.setState({
                [state]: 9999999
            })
        } else {
            return this.setState({
                [state]: parseInt(updateState)
            })
        }
    }


    filter = (e) => {
        e.preventDefault()
        const {roomFrom, roomTo, priceFrom, priceTo} = this.state
        return this.props.filterRoom(roomFrom, roomTo, priceFrom, priceTo)
    }

    render() {
        return (
            <div className = {classes.SearchFilter}>
                <form className = {classes.filter_form}>
                    
                    <div className = {classes.form_block}>
                        <div className = {classes.title}>Кількість кімнат</div>
                        <div className = {classes.block_item}>
                            <label htmlFor = 'roomFrom'>Мінімум</label>
                            <input 
                                className = {classes.input}
                                type = 'number'
                                placeholder = '0'
                                min = '1'
                                id = 'roomFrom' 
                                onChange = {(e) => this.updateStateFrom('roomFrom', e.target.value)}
                            />
                        </div>
                        <div className = {classes.block_item}>
                            <label htmlFor = 'roomTo'>Максимум</label>
                            <input 
                                className = {classes.input}
                                type = 'number'
                                min = '1'
                                placeholder = '4+'
                                id = 'roomTo' 
                                onChange = {(e) => this.updateStateTo('roomTo', e.target.value)}
                        />
                        </div>
                        
                    </div>
                    
                    <div className = {classes.form_block}>
                        <div className = {classes.title} >Ціна</div>
                        <div className = {classes.block_item}>
                            <label htmlFor = 'priceFrom'>Від: </label>
                            <input 
                                className = {classes.input}
                                type = 'number'
                                min = '0'
                                placeholder = '0'
                                id = 'priceFrom' 
                                onChange = {(e) => this.updateStateFrom('priceFrom', e.target.value)}
                            />
                            <span className = {classes.type_price}>$</span>
                        </div>
                        <div className = {classes.block_item}>
                            <label htmlFor = 'priceTo'>До: </label>
                            <input 
                                className = {classes.input}
                                type = 'number'
                                min = '0'
                                placeholder = '99999'
                                id = 'priceTo' 
                                onChange = {(e) => this.updateStateTo('priceTo', e.target.value)}
                            />
                            <span className = {classes.type_price}>$</span>
                        </div>
                        
                    </div>  
                    <Button 
                        cls = "search"
                        type = "submit"
                        onClick = {this.filter} 
                        >
                        Пошук
                    </Button>
                    
                </form>     
            </div>
        )
    
    }
    
}

export default SearchFilter