import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { checkUserName, checkPassword, asyncAuth } from "./loginSlice";
import { selectUserName, selectPassword } from "./loginSlice";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isUserNameValid = useSelector(selectUserName);
  const isPasswordValid = useSelector(selectPassword);

  const onClickLogin = () => {
    dispatch(asyncAuth(userName, password));
  };

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    dispatch(checkUserName(e.target.value));
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    dispatch(checkPassword(e.target.value));
  };

  return (
    <>
      <Section>
        <InputContainer>
          <Input
            type="text"
            placeholder="Username"
            onChange={onChangeUserName}
          />
          <StatusLabel>{isUserNameValid ? "✅" : "❌"}</StatusLabel>
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Password"
            onChange={onChangePassword}
          />
          <StatusLabel>{isPasswordValid ? "✅" : "❌"}</StatusLabel>
        </InputContainer>
        <LoginButton onClick={onClickLogin}> Login </LoginButton>
      </Section>
    </>
  );
};

export default Login;

const Section = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 1.3em;
  padding: 0.5em;
  margin: 0.5em;
  color: green;
  background: white;
  border: none;
  border-radius: 5px;
  outline: none;
`;
const StatusLabel = styled.label`
  font-size: 1.5em;
`;

const LoginButton = styled.button`
  background-color: green;
  color: white;
  font-size: 1.5em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 5px;
  margin-top: 5px;
`;
