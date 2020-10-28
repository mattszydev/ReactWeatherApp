import React from "react"
import styled, { keyframes } from "styled-components"
import {MapPin} from "react-feather"

const Location = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        padding: 2rem;
    }

    button{
        border: 1px solid black;
        background-color: transparent;
        border-radius: 5px;
        color: black;
        font-size: 1.2rem;
        padding: .7rem 2rem .7rem 2rem;
        :hover {
            cursor: pointer;
            color: black;
            background-color: white;
        }
    }
`;

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: ${rotate} 2s linear infinite; /* Safari */
    animation: ${rotate} 2s linear infinite;
    `;

const Landing = (props) => {
    return(
        <div>
            {
                props.contextProps.loadingScreen ? (
                    <Loading />
                ) : (
                    <Location>
                        <MapPin size={70}/>
                        <h2>Would you like to use your current location?</h2>
                        <button onClick={props.landingProps}>yes</button>
                    </Location>
                )
            }
        </div>
    )
};

export default Landing;