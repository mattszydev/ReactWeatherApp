import React from 'react';
import './App.css';
import KEY from './key.js'
import Card from "./card"
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"
import Form from "./Form"

let locationData = require("../data/city.list.min.json");

const GridContainer = styled.div`
    display:  flex;
    flex-direction: row;
    justify-content: space-around;
`;



class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
      queryCityResults: [],
      currentCity: [{
        id: 4180386,
        name: "Athens",
        state: "GA",
        country: "US",
        coord: {
            "lon": -83.377937,
            "lat": 33.960949
        },
    }]
      };
  }

  handleChange = (e) =>{
    /*
    this.setState({
      queryID: e.target.value,
    });
    */
    let result = locationData.filter(city =>(
      city.name===e.target.value
    ))
    this.setState({
      queryCityResults: result,
    })
  };

  onSubmitTask = (e) =>{
    e.preventDefault();
    this.setState({
      currentCity: this.state.queryCityResults,
      queryCityResults:"",
      /*
      queryID: this.state.currentCity.id,
      */
      isLoaded: false
    })
    this.fetchData();
  }

  async fetchData(){
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${this.state.currentCity[0].id}&units=imperial&APPID=${KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    this.setState({
      isLoaded: true,
      items: data,
    });
  }

  componentDidMount(){
   this.fetchData();
  };

  /*
  componentDidUpdate(prevProps){
    if (this.props.currentCity !== prevProps.currentCity){
      this.fetchData();
    }
  }
  */

  render(){

    return(
      <div className="App">
        <h1>{this.state.isLoaded ? this.state.items.city.name : 'Loading'}</h1>
        <GridContainer>
          {this.state.isLoaded 
          ? this.state.items.list.filter((day,i)=>(
            !i || day.dt_txt.split(' ')[0] !== this.state.items.list[i-1].dt_txt.split(' ')[0]
          ),this).map(entrie =>(
            <Card date={entrie.dt_txt.split(' ')[0]}
                  temp={entrie.main.temp}
                  weather={entrie.weather[0].description}
                  main={entrie.weather[0].main}
                  key={uuidv4()}/>
          )) 
          : <h2>Loading...</h2>
          }
        </GridContainer>
      
        <Form handleChangeProps={this.handleChange}
              handleSubmitProps={this.onSubmitTask}
              suggestionProps={this.state.queryCityResults}/>
        
      </div>
    )
  }
}

export default App;