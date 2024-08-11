// components/StartButton.tsx
import React from "react";
import styled from "styled-components/native";

interface StartButtonProps {
  onPress: () => void;
  title: string;
}

const StartButton: React.FC<StartButtonProps> = ({ onPress, title }) => (
  <ButtonContainer>
    <Button onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </Button>
  </ButtonContainer>
);

export default StartButton;

const ButtonContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 15px 25px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: 18px;
`;
