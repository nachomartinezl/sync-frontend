import React from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import WhiteButton from "../components/WhiteButton";
import TransparentButton from "../components/TransparentButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Container>
      <Title>SYNC</Title>
      <Subtitle>Find your true partner</Subtitle>
      <ButtonGroup>
        <TransparentButton onPress={() => router.push("/login")} title="Login" />
        <WhiteButton onPress={() => router.push("/register")} title="Register" />
      </ButtonGroup>
      <FooterText>
        By continuing, you agree to the Terms of Use. Read our Privacy Policy.
      </FooterText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 1%;
`;

const Subtitle = styled.Text`
  font-size: 22px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 40px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 40px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.bold};
`;

const ButtonGroup = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 50px; 
`;

const FooterText = styled.Text`
  font-size: 14px;
  color: #9EABB8;
  text-align: center;
  position: absolute;
  bottom: 20px;
  padding: 0 20px;
  font-family: ${(props) => props.theme.fonts.regular}
`;
