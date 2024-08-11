// components/DayCircle.tsx
import React from "react";
import styled from "styled-components/native";

interface DayCircleProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const DayCircle: React.FC<DayCircleProps> = ({ label, selected, onPress }) => (
  <Circle onPress={onPress} selected={selected}>
    <DayText selected={selected}>{label}</DayText>
  </Circle>
);

export default DayCircle;

const Circle = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.secondary};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const DayText = styled.Text<{ selected: boolean }>`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.background
      : props.theme.colors.primary};
  font-size: 16px;
  font-weight: bold;
`;
