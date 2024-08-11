import React from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import StyledButton from "../components/StyledButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Container>
      <Title>sync</Title>
      <StyledButton onPress={() => router.push("/login")} title="Login" />
      <StyledButton onPress={() => router.push("/register")} title="Register" />
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
