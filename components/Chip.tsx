// components/Chip.tsx
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface ChipProps {
  selected: boolean;
  onPress: () => void;
  label: string;
}

const Chip: React.FC<ChipProps> = ({ selected, onPress, label }) => (
  <ChipContainer selected={selected} onPress={onPress}>
    <ChipText selected={selected}>{label}</ChipText>
  </ChipContainer>
);

export default Chip;

const ChipContainer = styled(TouchableOpacity)<{ selected: boolean }>`
  margin: 5px;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.secondary : props.theme.colors.primary};
`;

const ChipText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  color: ${(props) =>
    props.selected
      ? props.theme.colors.background
      : props.theme.colors.secondary};
`;
