// components/CompletenessBar.tsx
import React from "react";
import styled from "styled-components/native";

interface CompletenessBarProps {
  completeness: number;
}

const CompletenessBar: React.FC<CompletenessBarProps> = ({ completeness }) => (
  <CompletenessContainer>
    <CompletenessFill style={{ width: `${completeness * 100}%` }} />
  </CompletenessContainer>
);

export default CompletenessBar;

const CompletenessContainer = styled.View`
  width: 100%;
  height: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const CompletenessFill = styled.View`
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary};
`;
