import React from "react";
import "./App.css";
import KEY from "./key.js";
import { Card, MainCard } from "./Cards";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Form from "./Form";
import formatData from "./format";
let locationData = require("../data/city.list.min.json");

const GridContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  @media only screen and (max-width: 400px) {
    margin-bottom: 7rem;
  }
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
      selectedCity: {},
      selectedIndex: -1,
      formField: "",
      suggestionVisible: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.selectedIndex >= 0){
      this.setState({
        //currentCity: this.state.selectedCity,
        selectedCity: {},
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
    const response = await fetch(url);
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
            <h2>Loading...</h2>
          )}
        </GridContainer>
      </div>
    );
  }
}

export default App;
