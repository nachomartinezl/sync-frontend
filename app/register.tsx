import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { UserCredentials, APIErrorResponse, ValidationError } from "../types";
import { register } from "../api/api";
import axios from "axios";
import WhiteButton from "../components/WhiteButton";

export default function RegisterScreen() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const data = await register(credentials.email, credentials.password);
      router.push("/personalData"); // Navigate to next step
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
          setError("Registration failed. Please try again.");
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
      <Title>Create your account</Title>
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
        onChangeText={(password) => setCredentials({ ...credentials, password })}
        placeholderTextColor="#888"
      />
      
      <WhiteButton onPress={handleRegister} title="Next" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
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
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  elevation: 5;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 10px;
`;
