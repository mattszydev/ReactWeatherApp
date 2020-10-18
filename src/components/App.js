import React from 'react';
import './App.css';
import KEY from './key.js'
import {Card, MainCard} from "./Cards"
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"
import Form from "./Form"
import formatData from "./format"
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
      /*App State */
      apiData: [],
      isLoaded: false,
      
      currentCity:{
        "id": 5641727,
        "name": "Bozeman",
        "state": "MT",
        "country": "US",
        "coord": {
          "lon": -111.038559,
          "lat": 45.679649
        }
      },
      
      queryCityResults: [
        {
          "id": 5641727,
          "name": "Bozeman",
          "state": "MT",
          "country": "US",
          "coord": {
            "lon": -111.038559,
            "lat": 45.679649
          }
        }
      ],
      selectedCity: {
        "id": 5641727,
        "name": "Bozeman",
        "state": "MT",
        "country": "US",
        "coord": {
          "lon": -111.038559,
          "lat": 45.679649
        }
      },
     /*
      currentCity: {},
      queryCityResults: {},
      selectedCity: {},
      */
      selectedIndex: 0,
      formField:"",
      suggestionVisible: false,
      };
  }

  onSubmit = (e) =>{
    e.preventDefault();
    this.setState({
      currentCity: this.state.selectedCity,
      selectedCity: {},
      isLoaded: false,
      formField:""
    })
    this.fetchData();
  };

  handleSelection = (e) =>{
    this.setState({
        selectedIndex: parseInt(e.target.dataset.index, 10),
        formField: e.target.dataset.selection,
        suggestionVisible: false,
    })
  };

  handleChange = (e) =>{
    let result = locationData.filter(city =>(
      city.name.toLowerCase()===e.target.value.toLowerCase()
    ))
    this.setState({
      queryCityResults: result,
      formField: e.target.value,
      suggestionVisible: true,
    })
  };

  async fetchData(){
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${this.state.queryCityResults[this.state.selectedIndex].id}&units=imperial&APPID=${KEY}`;
    const response = await fetch(url);
    const apiRaw = await response.json();

    this.setState({
      isLoaded: true,
      apiData: formatData(apiRaw.list),
      currentCity: this.state.queryCityResults[this.state.selectedIndex],
    });
  }

  componentDidMount(){
    if(!this.state.currentCity){
      this.fetchData();
    }
  };

  render(){
    
    return(
      <div className="App">
        <Form handleChangeProps={this.handleChange}
              handleSubmitProps={this.onSubmit}
              selectionProps={this.handleSelection}
              onUpdateCityProps={this.onUpdateCity}
              valueProps={this.state}/>

        {
          this.state.isLoaded ?
          <MainCard contextProps={this.state} /> : <div></div>
        }
      
        <GridContainer>
          {this.state.isLoaded ?
            this.state.apiData.map(entrie=>(
              <Card contextProps={entrie}
                    key={uuidv4()}
              />
            )): <h2>Loading...</h2>
          }
        </GridContainer>
      </div>
    )
  }
}

export default App;