import React, {Component} from 'react';
import classes from './Slider.module.scss'

class Slider extends Component{

    state = {
        slideIndex: 0,
    }


    plusSlider = (n) => {
        let count = this.state.slideIndex
        count += n
        
        this.setState({
            slideIndex: count
        })
    }

    slider = () =>{
        
        const {imgArr} = this.props
        const {slideIndex} = this.state
        let currentIndex = slideIndex
        let imgSlider = []
        let cls = [classes.mySlides]
        cls.push(classes.fade)
        
  
        let arrow = []
        arrow.push(<button key = {Math.random()} className = {classes.prev} onClick = {() => this.plusSlider(-1)}>{"<"}</button>)
        arrow.push(<button key = {Math.random()} className = {classes.next} onClick = {() => this.plusSlider(1)}>{">"}</button>)


        imgSlider.push
        (<div key = {Math.random()} className = {cls.join(' ')}>
          <div className = {classes.index}>
            {`${currentIndex + 1}/${imgArr.length}`}
          </div>
          
          {imgArr[currentIndex]} 
        </div>)
        imgSlider.push(arrow)
  
        return (imgSlider)
    }

    componentDidUpdate(prevProps, prevState) {
        const {imgArr} = this.props
        const {slideIndex} = this.state
        if(slideIndex === imgArr.length  && prevState.slideIndex === imgArr.length - 1){
            this.setState({
                slideIndex: 0
            })
        } else 
        if(slideIndex === - 1  && prevState.slideIndex === 0){
            this.setState({
                slideIndex: imgArr.length - 1 
            })
        }
      }


    render(){
        return (
            <div key = {Math.random()} className = {classes.slidershow_container}>
                {this.slider()}
            </div>
        )
    }
}

export default Slider