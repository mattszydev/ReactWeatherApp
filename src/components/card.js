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
        default: 
            return <Sun/>
    }
}

const Container = styled.div`
    margin: 1rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: rgb(161, 214, 255);
`;

const Card = ({date, temp, weather, main}) =>(
    <Container>
        <h2>{date}</h2>
        <h3>{`${Math.round(temp)}°F`}</h3>
        {findIcon(main)}
        <h3>{weather}</h3>
    </Container>
);

export default Card;