import React from "react";
import "./App.css";
import Card from "./Cards";
import MainCard from "./MainCard"
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Form from "./Form";
import formatData from "./ComponentFunctions/format";
let locationData = require("../data/city.list.min.json");

const GridContainer = styled.div`
  position: relative;
  z-index: 100;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  @media only screen and (max-width: 400px) {
    margin-bottom: 7rem;
  }
`;

const Loading = styled.div`
  margin-top: 5rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //App State
      apiData: [],
      isLoaded: false,
      currentCity: {},
      queryCityResults: {},
      //Form state
      selectedIndex: -1,
      formField: "",
      suggestionVisible: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.selectedIndex >= 0){
      this.setState({
        isLoaded: false,
        formField: "",
      });
      this.fetchData();
    }
  };

  handleSelection = (e) => {
    this.setState({
      selectedIndex: parseInt(e.target.dataset.index, 10),
      formField: e.target.dataset.selection,
      suggestionVisible: false,
    });
  };

  handleChange = (e) => {
    let result = locationData
      .filter((city) =>
        city.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 11);

    this.setState({
      queryCityResults: result,
      formField: e.target.value,
      suggestionVisible: true,
    });
  };

  async fetchData() {
    const code = this.state.queryCityResults[this.state.selectedIndex].id
    const url = `${process.env.REACT_APP_URL}/.netlify/functions/getData?code=${code}`
    const response = await fetch(url,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    const apiRaw = await response.json();

    this.setState({
      isLoaded: true,
      apiData: formatData(apiRaw.list),
      currentCity: this.state.queryCityResults[this.state.selectedIndex],
    });
  }

  componentDidMount() {
    if (!this.state.currentCity) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div className="App">
        
        <Form
          handleChangeProps={this.handleChange}
          handleSubmitProps={this.onSubmit}
          selectionProps={this.handleSelection}
          onUpdateCityProps={this.onUpdateCity}
          valueProps={this.state}
        />

        {this.state.isLoaded ? (
          <MainCard contextProps={this.state} />
        ) : (
          <div></div>
        )}

        <GridContainer>
          {this.state.isLoaded ? (
            this.state.apiData.map((entrie) => (
              <Card contextProps={entrie} key={uuidv4()} />
            ))
          ) : (
            <Loading>
              <h2>Loading...</h2>
            </Loading>
          )}
        </GridContainer>
      </div>
    );
  }
}

export default App;
