// components/AstrologicalItem.tsx
import React from "react";
import styled from "styled-components/native";

interface AstrologicalItemProps {
  label: string;
  value: string;
}

const AstrologicalItem: React.FC<AstrologicalItemProps> = ({ label, value }) => (
  <Item>
    {label}: {value}
  </Item>
);

export default AstrologicalItem;

const Item = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  margin: 5px 0;
`;
