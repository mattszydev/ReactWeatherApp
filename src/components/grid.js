import React from "react"
import styled from "styled-components"

const GridContainer = styled.div`
    display:  flex;
    flex-direction: row;
`;

const Grid = ({children}) =>{
    <GridContainer>
        {children}
    </GridContainer>
};

export default Grid;