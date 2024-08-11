// components/ToggleButton.tsx
import React from "react";
import styled from "styled-components/native";

interface ToggleButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, selected, onPress }) => (
  <Button onPress={onPress} selected={selected}>
    <ButtonText selected={selected}>{label}</ButtonText>
  </Button>
);

export default ToggleButton;

const Button = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.secondary};
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px;
`;

const ButtonText = styled.Text<{ selected: boolean }>`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.background
      : props.theme.colors.primary};
  font-size: 16px;
`;
