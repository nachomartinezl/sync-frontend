// components/NextButton.tsx
import React from "react";
import styled from "styled-components/native";

interface NextButtonProps {
  onPress: () => void;
  label: string;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, label }) => (
  <ButtonContainer>
    <Button onPress={onPress}>
      <ButtonText>{label}</ButtonText>
    </Button>
  </ButtonContainer>
);

export default NextButton;

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
