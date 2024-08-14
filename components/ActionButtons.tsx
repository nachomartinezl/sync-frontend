// components/ActionButtons.tsx
import React from "react";
import styled from "styled-components/native";

interface ActionButtonsProps {
  onIgnore: () => void;
  onAccept: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onIgnore, onAccept }) => (
  <ButtonContainer>
    <IgnoreButton onPress={onIgnore}>
      <ButtonText>Reject</ButtonText>
    </IgnoreButton>
    <AcceptButton onPress={onAccept}>
      <ButtonText>Accept</ButtonText>
    </AcceptButton>
  </ButtonContainer>
);

export default ActionButtons;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const IgnoreButton = styled.TouchableOpacity`
  background-color: red;
  padding: 15px 25px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  margin-right: 10px;
`;

const AcceptButton = styled.TouchableOpacity`
  background-color: green;
  padding: 15px 25px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;
