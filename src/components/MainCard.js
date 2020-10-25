import React from "react";
import styled from "styled-components";
import {formatTime, findIcon} from "./ComponentFunctions/cardFunctions"
import { v4 as uuidv4 } from "uuid";

const MainCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  background-color: white;
  color: black;
  max-width: 500px;
  margin-left: 4rem;
  margin-top: 5rem;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 10px 21px -3px rgba(0,0,0,0.75);

  @media only screen and (max-width: 400px) {
    margin: 7rem 1rem 0 1rem;
    padding: 1rem;
    font-size: .8rem;
  }

  .high {
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .temp {
    margin: auto;
    display: flex;
    font-size: 1.9rem;
    flex-direction: column;
    max-width: 4rem;
    justify-self: center;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .left h1 {
    padding: 1rem;
  }

  .right {
    padding: 1rem;
  }

  .right h2 {
    padding-bottom: 1rem;
  }

  .bottom-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .time-card {
    padding: 1rem;
    font-size: .8rem;
  }

  .temp-high{
    color: rgb(255, 87, 87);
  }

  .temp-low{
    color: rgb(69, 159, 255);
  }
`;

const UpperContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-bottom: 1px solid black;
  padding-bottom: 2rem;
`;
const MainCard = (props) => {
  let highTemp = Math.round(
    Math.max(...props.contextProps.apiData[0].map((e) => e.main.temp_max))
  );
  let lowTemp = Math.round(
    Math.min(...props.contextProps.apiData[0].map((e) => e.main.temp_min))
  );
  let currentCity = props.contextProps.currentCity;
  let data = props.contextProps.apiData;

  return (
    <MainCardContainer>
      <UpperContainer>
        <div className="left">
          <h1>{`${currentCity.name},${
            currentCity.state === "" ? currentCity.country : currentCity.state
          }`}</h1>
          <div className="temp">
            <h3 className="high temp-high">{`${highTemp}°` || "Temperature"}</h3>
            <h3 className="temp-low">{`${lowTemp}°` || "Temperature"}</h3>
          </div>
        </div>
        <div className="right">
          <h2>Today</h2>
          <h3>{findIcon(data[0][0].weather[0].main)}</h3>
          <h4>{data[0][0].weather[0].description}</h4>
        </div>
      </UpperContainer>
      <div className="bottom-grid">
        {data[0].map((e) => (
          <div className="time-card" key={uuidv4()}>
            <h2>{formatTime(e.dt, "hour", "numeric")}</h2>
            <h3>{Math.round(e.main.temp) + "°"}</h3>
          </div>
        ))}
      </div>
    </MainCardContainer>
  );
};

export default MainCard;