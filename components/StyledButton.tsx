import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface StyledButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onPress, title }) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 10px 20px;
  border-radius: 7px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-align: center;
`;

export default React.memo(StyledButton);
