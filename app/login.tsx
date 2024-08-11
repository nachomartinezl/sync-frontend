import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { UserCredentials, APIErrorResponse, ValidationError } from "../types";
import { login } from "../api/api";
import axios from "axios";
import StyledButton from "../components/StyledButton";

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
      <Title>Login</Title>
      {error && <ErrorText>{error}</ErrorText>}
      <Input
        placeholder="Email"
        value={credentials.email}
        onChangeText={(email) => setCredentials({ ...credentials, email })}
        placeholderTextColor="#888"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(password) =>
          setCredentials({ ...credentials, password })
        }
        placeholderTextColor="#888"
      />
      <StyledButton onPress={handleLogin} title="Login" />
      <StyledButton onPress={() => router.push("/")} title="Back to Home" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 12px;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.inputBackground};
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 10px;
`;
