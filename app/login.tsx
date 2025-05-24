import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { theme } from "../theme";
import { UserCredentials, APIErrorResponse, ValidationError } from "../types";
import { login } from "../api/api";
import axios from "axios";
import WhiteButton from "../components/WhiteButton";
import TransparentButton from "../components/TransparentButton";

export default function LoginScreen() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const data = await login(credentials.email, credentials.password);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = (err.response?.data as APIErrorResponse) || {
          msg: "Unknown error",
        };

        if (errorResponse.errors) {
          setError(
            errorResponse.errors.map((e: ValidationError) => e.msg).join(", ")
          );
        } else if (errorResponse.msg) {
          setError(errorResponse.msg);
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>
      <Title>Login</Title>
      {error && <ErrorText>{error}</ErrorText>}
      
      <Input
        placeholder="Email"
        value={credentials.email}
        onChangeText={(email) => setCredentials({ ...credentials, email })}
        placeholderTextColor={theme.colors.placeholder}
      />
      
      <Input
        placeholder="Password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(password) => setCredentials({ ...credentials, password })}
        placeholderTextColor={theme.colors.placeholder}
      />
      
      <ForgotPasswordContainer>
        <ForgotPasswordText>Forgot your password?</ForgotPasswordText>
      </ForgotPasswordContainer>

      <ButtonGroup>
        <TransparentButton onPress={handleLogin} title="Login" />
        <WhiteButton onPress={() => router.push("/register")} title="Create Account" />
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 1%;
  padding-top: 100px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const BackArrow = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.bold}
`;

const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.regular};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 4;
`;

const ForgotPasswordContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 30px;
`;

const ForgotPasswordText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.regular}
`;

const ButtonGroup = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 50px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 10px;
`;
