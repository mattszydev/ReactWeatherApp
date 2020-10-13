import React from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.form`
    ul {
        width: 100%;
        list-style: none;
        text-align: left;
        justify-self: start;
        padding:0;
        margin:0;
    }
    li{
        display: block;
        font-size: .8rem;
        padding: .3rem 0 .3rem 0;
        margin: 0 0 0 .2rem;
        justify-self: start;
    }
    input{
        width: 100%;
        border: none;
        border-bottom: 1px solid rgb(245,245,245);
        padding:0;
        margin:0;
    }
`;

const InputContainer = styled.div`
    margin: auto;
    max-width: 300px;
    border: 1px solid black;
    padding: .2rem;
    border-radius: 15px;
`;


const Form = (props) =>(
    <FormContainer onSubmit={props.handleSubmitProps}  autocomplete="off">
        
            <InputContainer>
                <input onChange={props.handleChangeProps}
                    type="text"
                    id="taskInput"
                    autocomplete="off"/>
                    <ul>
                {
                    props.suggestionProps.map(e=>(
                        <li key={uuidv4()}>
                            {e.name+','+e.state}
                        </li>
                    ))
                }
            </ul>
            </InputContainer>
        
    </FormContainer>
)

export default Form;

/*
<FormContainer onSubmit={this.props.onSubmitTask}>
        <input onChange={this.props.handleChange}
                   value={this.props.state.queryID}
                   type="text"
                   id="taskInput"/>
        <button type="submit">Search</button>
    </FormContainer>
*/