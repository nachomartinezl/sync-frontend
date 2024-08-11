// components/NoDataText.tsx
import React from "react";
import styled from "styled-components/native";

interface NoDataTextProps {
  children: React.ReactNode;
}

const NoDataText: React.FC<NoDataTextProps> = ({ children }) => (
  <Text>{children}</Text>
);

export default NoDataText;

const Text = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  margin-top: 10px;
`;
