import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';

interface AlgorithmNavigationButtonProps {
  iconSource: ImageSourcePropType;
  label: string;
  onPress: () => void;
}

const AlgorithmNavigationButton: React.FC<AlgorithmNavigationButtonProps> = ({
  iconSource,
  label,
  onPress,
}) => {
  return (
    <StyledAlgorithmButton onPress={onPress}>
      <AlgorithmIcon source={iconSource} />
      <AlgorithmText>{label}</AlgorithmText>
    </StyledAlgorithmButton>
  );
};

// Styled Components copied from app/dashboard.tsx

const StyledAlgorithmButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  width: 32%; /* Adjust as needed, or make it more flexible */
  height: 40%; /* Adjust as needed */
  background-color: ${(props) => props.theme.colors.secondary || '#1C1C1E'}; /* Fallback */
  border-radius: 12px;
  margin-bottom: 3%;
  padding: 7px;
  shadow-color: #000;
  shadow-offset: 0px 2px; /* Corrected format */
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 4;
`;

const AlgorithmIcon = styled(Image)`
  width: 31px;
  height: 32px;
  margin-right: 7px;
`;

const AlgorithmText = styled(Text)`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'}; /* Fallback */
  text-align: left;
  font-family: ${(props) => props.theme.fonts.regular || 'System'}; /* Fallback */
  flex-shrink: 1; /* Allow text to shrink if container is small */
`;

export default AlgorithmNavigationButton;
