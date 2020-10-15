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
        font-size: 1rem;
        padding: .3rem 0 .3rem .8rem;
        margin: 0 0 0 .2rem;
        justify-self: start;
        :hover{
            cursor: pointer;
            background-color: rgb(245,245,245)
        }
    }
    input{
        font-size: 1rem;
        width: 100%;
        border: none;
        padding: .2rem 0 .2rem 1rem;
        margin:0;
        :focus{
            background-color: rgb(245,245,245);
            border: none;
            height: 100%;
        }
    }
    button{
        position: absolute;
        right: 5rem;
        top: 3.5rem;
        z-index: 100;
    }
`;

const InputContainer = styled.div`
    position: absolute;
    right: 10rem;
    top: 3rem;
    margin: auto;
    max-width: 300px;
    border: 1px solid black;
    background-color: white;
    padding: 0;
    border-radius: 15px;
    overflow: hidden;
    z-index: 200;
    :hover{
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.4);
    }
`;


const Form =(props)=> {
    
    return(
    <FormContainer autoComplete="off" onSubmit={props.handleSubmitProps}>
            <InputContainer>
                <input onChange={props.handleChangeProps}
                        type="text"
                        id="taskInput"
                        autoComplete="off"
                        value={props.valueProps.formField}/>
                    {
                        props.valueProps.suggestionVisible ?
                    <ul>
                        {
                            props.valueProps.queryCityResults.map((e,index)=>(
                                <li key={uuidv4()}
                                    onClick={props.selectionProps}
                                    data-selection={e.name+','+e.state}
                                    data-index={index}>
                                    
                                    {e.name+','+e.state}
                                </li>
                            ))
                        }
                    </ul> :
                    <div></div>
                    }
            </InputContainer>
            <button type="submit">Search</button>
    </FormContainer>
    )
    
}

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