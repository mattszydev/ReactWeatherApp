import React from "react";
import styled from "styled-components";
import { CloudRain, CloudSnow, Cloud, Sun } from "react-feather";
import { v4 as uuidv4 } from "uuid";

const findIcon = (param) => {
  switch (param) {
    case "Clouds":
      return <Cloud size={50} />;
      break;
    case "Rain":
      return <CloudRain size={50} />;
      break;
    case "Clear":
      return <Sun size={50} />;
      break;
    case "Snow":
      return <CloudSnow size={50} />;
      break;
    default:
      return <Sun size={50} />;
  }
};

const formatTime = (timestamp, param1, param2) => {
  let dateObject = new Date(timestamp * 1000);
  return dateObject.toLocaleString("en-US", { [param1]: param2 });
  /*
    dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
    dateObject.toLocaleString("en-US", {month: "long"}) // December
    dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
    dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
    dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
    dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
    dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
    dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST
    */
};

const CardContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  justify-content: center;

  @media only screen and (max-width: 400px) {
    width: 100%;
  }

  h2 {
    padding-bottom: 1rem;
  }

  h3 {
    margin: 0;
    padding-top: 0.5rem;
  }

  .high {
    border-bottom: 1px solid white;
    padding-bottom: 0.5rem;
  }

  .temp {
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 4rem;
    justify-self: center;
  }
`;

const Card = (props) => {
  let date = props.contextProps[0].dt_txt.split(" ")[0].substr(5);
  let highTemp = Math.round(
    Math.max(...props.contextProps.map((e) => e.main.temp_max))
  );
  let lowTemp = Math.round(
    Math.min(...props.contextProps.map((e) => e.main.temp_min))
  );

  return (
    <CardContainer>
      <div>
        <h2>{date || "Date"}</h2>
      </div>
      {findIcon(props.contextProps[0].weather[0].main) || "Icon"}
      <div className="temp">
        <h3 className="high">{`${highTemp}°` || "Temperature"}</h3>
        <h3>{`${lowTemp}°` || "Temperature"}</h3>
      </div>
      <h3>{props.contextProps[0].weather[0].description || "Weather"}</h3>
    </CardContainer>
  );
};

const MainCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  max-width: 500px;
  margin-left: 4rem;
  margin-top: 4rem;
  padding: 2rem;
  border-radius: 10px;

  @media only screen and (max-width: 400px) {
    margin: 7rem 1rem 0 1rem;
    padding: 1rem;
  }

  .high {
    border-bottom: 1px solid white;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .temp {
    margin: auto;
    display: flex;
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
    justify-content: center;
  }

  .time-card {
    padding: 1rem;
  }
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid white;
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
            <h3 className="high">{`${highTemp}°` || "Temperature"}</h3>
            <h3>{`${lowTemp}°` || "Temperature"}</h3>
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

export { Card, MainCard };
