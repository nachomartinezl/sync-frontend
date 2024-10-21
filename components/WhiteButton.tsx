import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface WhiteButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ onPress, title }) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 12px;
  border-radius: 12px;
  border-color: ${(props) => props.theme.colors.primary};
  margin-top: 10px;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: bold;
  text-align: center;
`;

export default React.memo(WhiteButton);
