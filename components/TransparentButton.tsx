import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface TransparentButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
}

const TransparentButton: React.FC<TransparentButtonProps> = ({ onPress, title }) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.small};
  text-align: center;
`;

export default React.memo(TransparentButton);
