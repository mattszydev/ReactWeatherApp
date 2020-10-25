import React from "react";
import styled from "styled-components";
import {findIcon, formatTime} from "./ComponentFunctions/cardFunctions"

const CardContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  width: 150px;
  background-color: white;
  color: black;
  justify-content: center;
  box-shadow: 0px 10px 21px -3px rgba(0,0,0,0.75);

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
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
  }

  .temp {
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 4rem;
    justify-self: center;
  }

  .temp-high{
    color: rgb(255, 87, 87);
  }

  .temp-low{
    color: rgb(69, 159, 255);
  }

  .date-container{
    display: flex;
    font-size: .7rem;
    justify-content: space-between;
  }
`;

const Card = (props) => {
  let data = props.contextProps;
  let date = data[data.length-1].dt;

  let highTemp = Math.round(
    Math.max(...data.map((e) => e.main.temp_max))
  );
  let lowTemp = Math.round(
    Math.min(...data.map((e) => e.main.temp_min))
  );
  
  return (
    <CardContainer>
      <div className="date-container">
        <h2>{formatTime(date, "weekday", "short")}</h2>
        <h2>{data[data.length-1].dt_txt.split(' ')[0].slice(5)}</h2>
      </div>
      {findIcon(data[0].weather[0].main) || "Icon"}
      <div className="temp">
        <h3 className="high temp-high">{`${highTemp}°` || "Temperature"}</h3>
        <h3 className="temp-low">{`${lowTemp}°` || "Temperature"}</h3>
      </div>
      <h3>{props.contextProps[0].weather[0].description || "Weather"}</h3>
    </CardContainer>
  );
};

export default Card;
