// components/LoadingIndicator.tsx
import React from "react";
import styled from "styled-components/native";

interface LoadingIndicatorProps {
  text: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text }) => (
  <LoadingContainer>
    <LoadingText>{text}</LoadingText>
  </LoadingContainer>
);

export default LoadingIndicator;

const LoadingContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 10px;
`;
