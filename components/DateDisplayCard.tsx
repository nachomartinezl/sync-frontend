import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, Text, View } from 'react-native'; // Added View for DateDetails

interface DateDisplayCardProps {
  pictureUrl: string;
  partnerName: string;
  place: string;
  datetime: string;
  status: string;
  onPress: () => void;
}

const DateDisplayCard: React.FC<DateDisplayCardProps> = ({
  pictureUrl,
  partnerName,
  place,
  datetime,
  status,
  onPress,
}) => {
  return (
    <StyledDateCard onPress={onPress}>
      <DateImage source={{ uri: pictureUrl }} />
      <DateDetails>
        <NameText>{partnerName}</NameText>
        <PlaceText>{place}</PlaceText>
        <DateText>{datetime}</DateText>
        <StatusContainer>
          <StatusText>{status}</StatusText>
        </StatusContainer>
      </DateDetails>
    </StyledDateCard>
  );
};

// Styled Components copied from app/dashboard.tsx

const StyledDateCard = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.secondary || '#1E1E1E'}; // Fallback color
  border-radius: 10px;
  flex: 1;
  margin-top: 10px; /* Added margin for spacing if needed */
`;

const DateImage = styled(Image)`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  margin-right: 10px;
`;

const DateDetails = styled(View)` /* Changed from styled.View to styled(View) */
  flex-direction: column;
  justify-content: center;
  flex: 1; /* Allow details to take remaining space */
  padding: 10px; /* Added padding for better text spacing */
`;

const NameText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'}; /* Fallback color */
  font-family: ${(props) => props.theme.fonts.regular || 'System'}; /* Fallback font */
  margin-bottom: 5px;
`;

const PlaceText = styled(Text)`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'};
  font-family: ${(props) => props.theme.fonts.regular || 'System'};
`;

const DateText = styled(Text)`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'};
  font-family: ${(props) => props.theme.fonts.regular || 'System'};
`;

const StatusContainer = styled(View)` /* Changed from styled.View to styled(View) */
  background-color: #008043; /* Consider making this prop-driven for different statuses */
  padding: 5px;
  border-radius: 6px;
  margin-bottom: 2%;
  /* width: 75%; */ /* Removed fixed width to be more flexible */
  align-self: flex-start; /* Align to the start of DateDetails */
`;

const StatusText = styled(Text)` /* Renamed from Status to StatusText to avoid conflict with React.FC status prop */
  color: white;
  font-size: 14px;
  text-align: center;
`;

export default DateDisplayCard;
