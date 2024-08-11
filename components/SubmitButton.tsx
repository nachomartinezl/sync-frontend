// components/SubmitButton.tsx
import React from "react";
import styled from "styled-components/native";

interface SubmitButtonProps {
  onPress: () => void;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, label }) => (
  <Button onPress={onPress}>
    <ButtonText>{label}</ButtonText>
  </Button>
);

export default SubmitButton;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 15px 25px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: 18px;
`;
