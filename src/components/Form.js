import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const FormContainer = styled.form`
  ul {
    width: 100%;
    list-style: none;
    text-align: left;
    justify-self: start;
    padding: 0;
    margin: 0;
  }
  li {
    display: block;
    font-size: 1rem;
    padding: 0.3rem 0 0.3rem 0.8rem;
    margin: 0 0 0 0.2rem;
    justify-self: start;
    :hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
    }
  }
  input {
    font-size: 1rem;
    width: 100%;
    border: none;
    padding: 0.2rem 0 0.2rem 1rem;
    margin: 0;
    :focus {
      background-color: rgb(245, 245, 245);
      border: none;
      height: 100%;
    }
  }
  button {
    position: absolute;
    right: 4rem;
    top: 3rem;
    z-index: 200;
    border: 1px solid white;
    background-color: transparent;
    color: white;
    font-size: 1.2rem;
    border-radius: 10px;
    :hover {
      cursor: pointer;
      color: black;
      background-color: white;
    }
  }
`;

const InputContainer = styled.div`
  position: absolute;
  right: 10rem;
  top: 3rem;
  margin: auto;
  max-width: 500px;
  border: 1px solid black;
  background-color: white;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  z-index: 200;
  :hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
  }
`;

const Form = (props) => {
  return (
    <FormContainer autoComplete="off" onSubmit={props.handleSubmitProps}>
      <InputContainer>
        <input
          onChange={props.handleChangeProps}
          type="text"
          id="taskInput"
          autoComplete="off"
          value={props.valueProps.formField}
          placeholder="City, State"
        />
        {props.valueProps.suggestionVisible &&
        props.valueProps.queryCityResults ? (
          <ul>
            {props.valueProps.queryCityResults.map((e, index) => (
              <li
                key={uuidv4()}
                onClick={props.selectionProps}
                data-selection={`${e.name},${
                  e.state === "" ? e.country : e.state
                }`}
                data-index={index}
              >
                {`${e.name},${e.state === "" ? e.country : e.state}`}
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </InputContainer>
      <button type="submit">Search</button>
    </FormContainer>
  );
};

export default Form;
