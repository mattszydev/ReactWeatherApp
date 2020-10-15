import React from "react"
import styled from "styled-components"
import {CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Cloud, Sun} from "react-feather"

const findIcon = (param) => {
    switch (param){
        case "Clouds":
            return <Cloud/>
            break;
        case "Rain":
            return <CloudRain/>
            break;
        case "Clear":
            return <Sun/>
            break;
        case "Snow":
            return <CloudSnow/>
            break;
        default: 
            return <Sun/>
    }
}

const CardContainer = styled.div`
    margin: 1rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: rgb(161, 214, 255);
`;

const Card = ({date, temp, weather, main}) =>(
    <CardContainer>
        <h2>{date || 'Date'}</h2>
        <h3>{`${Math.round(temp)}°F` || 'Temperature'}</h3>
        {findIcon(main) || 'Icon'}
        <h3>{weather || 'Weather'}</h3>
    </CardContainer>
);

const MainCardContainer = styled.div`
    background-color: red;
    max-width: 500px;
    margin-left: 4rem;
    margin-top: 4rem;
    padding: 2rem;
    border-radius: 10px;
`;

const MainCard = (props) => (
    <MainCardContainer>
        <h1>{props.contextProps.currentCity.name+','+props.contextProps.currentCity.state}</h1>
        <h2>{props.contextProps.apiData.list[0].dt_txt.split(' ')[0]}</h2>
        <h3>{findIcon(props.contextProps.apiData.list[0].weather[0].main)}</h3>
        <h4>{props.contextProps.apiData.list[0].weather[0].description}</h4>
    </MainCardContainer>
);

export {
    Card, MainCard
}