import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const FormContainer = styled.form`
  position: relative;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  z-index: 200;
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
    font-size: 1.2rem;
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
`;

const Button = styled.button`
  max-height: 2rem;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 5px;
  color: black;
  font-size: 1.2rem;
  margin-left: 1.5rem;
  :hover {
    cursor: pointer;
    color: black;
    background-color: white;
  }
`;

const InputContainer = styled.div`
  margin: auto;
  margin-top: 1.6rem;
  max-width: 500px;
  border: 1px solid black;
  background-color: white;
  padding: 0;
  border-radius: 5px;
  overflow: hidden;
  
  :hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin-right: 3rem;
 
  @media only screen and (max-width: 450px){
      margin: .22rem auto;
    }
`;

const Form = (props) => {
  let data = props.valueProps;
  return (
    <FormContainer autoComplete="off" onSubmit={props.handleSubmitProps}>
      <Wrapper>
      <InputContainer>
        <input
          onChange={props.handleChangeProps}
          type="text"
          id="taskInput"
          autoComplete="off"
          value={props.valueProps.formField}
          placeholder="City, State"
        />
        {data.suggestionVisible &&
        data.queryCityResults && 
        data.formField !== "" ? (
          <ul>
            {data.queryCityResults.map((e, index) => (
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
      <Button type="submit">Search</Button>
      </Wrapper>
    </FormContainer>
  );
};

export default Form;
