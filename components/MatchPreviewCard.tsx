import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, Text } from 'react-native';

interface MatchPreviewCardProps {
  name: string;
  age: number;
  pictureUrl: string;
  onPress: () => void;
}

const MatchPreviewCard: React.FC<MatchPreviewCardProps> = ({
  name,
  age,
  pictureUrl,
  onPress,
}) => {
  return (
    <StyledMatchCard onPress={onPress}>
      <MatchImage source={{ uri: pictureUrl }} />
      <MatchName>
        {name}, {age}
      </MatchName>
    </StyledMatchCard>
  );
};

// Styled Components copied from app/dashboard.tsx

const StyledMatchCard = styled(TouchableOpacity)`
  align-items: flex-start;
  width: 32%; /* This might need to be more dynamic or passed as a prop if used in different contexts */
  margin-bottom: 10px;
`;

const MatchImage = styled(Image)`
  width: 100%;
  height: 120px; /* Adjusted height for better preview, can be prop-driven */
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.cardBackground || '#333'}; /* Added a fallback */
`;

const MatchName = styled(Text)`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'};
  font-family: ${(props) => props.theme.fonts.bold || 'System'};
`;

export default MatchPreviewCard;
