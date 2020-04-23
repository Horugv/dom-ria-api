import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './PageList.module.scss'


class PageList extends Component {
    
    
    list = (page) => {
        page = parseInt(page)
        let {countPage,typeOfPage} = this.props
        let li = []
        if(countPage <= 5){
            for(let i = 1; i <= countPage; i++){
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + (i) } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            return li
        } 
        else
        if(page === 1){
 
            for(let i = 1; i <= page + 2; i++){
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            
            li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}${countPage}`} key = {countPage} className = {classes.link}>{countPage}</NavLink>)
            return li
        

        }
        else
        if(page === 2){
 
            for(let i = 1; i <= page + 1; i++){
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            
            li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}${countPage}`} key = {countPage} className = {classes.link}>{countPage}</NavLink>)
            return li
        

        }
        else
        if(page === 3){
 
                for(let i = 1; i <= page + 1; i++){
                    li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
                }
                
                li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}${countPage}`} key = {countPage} className = {classes.link}>{countPage}</NavLink>)
                return li
            

        }
        else
        if(page === 4  && countPage <= 6){
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}1`} key = {"1"} className = {classes.link}>1</NavLink>)
            li.push(<span key = {Math.random()}  className = {classes.link}  >...</span>)
            for(let i = 3; i <= page + 2; i++){
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            
           
            return li
        }
        else
        if(page === 4  && countPage >= 7){
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}1`} key = {"1"} className = {classes.link}>1</NavLink>)
            li.push(<span key = {Math.random()}  className = {classes.link}  >...</span>)
            for(let i = 3; i <= page + 2; i++){
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}${this.props.countPage}`} key = {countPage} className = {classes.link}>{countPage}</NavLink>)
                return li
        }
        else
        if(page > 4 && countPage > 5 && page <= countPage - 3){
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}1`} key = {"1"} className = {classes.link}>1</NavLink>)
            li.push(<span key = {Math.random()}  className = {classes.link}  >...</span>)
            for(let i = page - 1; i <= page + 1; i++){
               
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/` + i } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}${countPage}`} key = {countPage} className = {classes.link}>{countPage}</NavLink>)
            return li
        } else 
        if(page >= countPage - 2 && page <= countPage - 1 && page >= 5){
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}1`} key = {1} className = {classes.link}>1</NavLink>)
            li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
            if(page === countPage - 1){
                for(let i = page - 2; i <= page + 1; i++){
                    li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
                }
            } else {
                for(let i = page - 2; i <= page + 2; i++){
                    li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
                }
            }
            return li
        }
        if(page === countPage ){
            li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}`} key = {1} className = {classes.link}>1</NavLink>)
            li.push(<span key = {Math.random()}  className = {classes.link} >...</span>)
            for(let i = page - 2; i <= page; i++){
                li.push(<NavLink activeClassName = {classes.active} to = {`/dom-ria-api/${typeOfPage}` + i } key = {i} className = {classes.link}>{i}</NavLink>)
            }
            return li
        }

   
    }
    

    render() {
        return (
        <ul className = {classes.PageList}>     
           {this.list(this.props.page)} 
        </ul>
        )   
    }
}

export default PageList