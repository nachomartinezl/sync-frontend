// components/GraphItem.tsx
import React from "react";
import styled from "styled-components/native";

interface GraphItemProps {
  label: string;
  value: number;
}

const GraphItem: React.FC<GraphItemProps> = ({ label, value }) => (
  <Item>
    <Label>{label}</Label>
    <Bar width={value} />
  </Item>
);

export default GraphItem;

const Item = styled.View`
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

const Bar = styled.View<{ width: number }>`
  height: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  width: ${(props) => props.width}%;
  border-radius: 10px;
`;
