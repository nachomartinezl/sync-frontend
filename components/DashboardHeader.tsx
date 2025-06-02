import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, Text, View } from 'react-native';

interface DashboardHeaderProps {
  userName: string;
  profileCompleteness: number; // 0 to 1
  profileImageUrl: string;
  onProfilePress: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  profileCompleteness,
  profileImageUrl,
  onProfilePress,
}) => {
  return (
    <StyledTopBar>
      <ProfileSection>
        <GreetingText>Hello, {userName}</GreetingText>
        <CompletionText>
          Your profile is {Math.round(profileCompleteness * 100)}% complete
        </CompletionText>
      </ProfileSection>
      <TouchableOpacity onPress={onProfilePress}>
        <ProfileImage source={{ uri: profileImageUrl }} />
      </TouchableOpacity>
    </StyledTopBar>
  );
};

// Styled Components copied from app/dashboard.tsx

const StyledTopBar = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 5%; /* Or use a theme-based spacing */
`;

const ProfileSection = styled(View)`
  flex-direction: column;
`;

const GreetingText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large || '24px'};
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'};
  font-family: ${(props) => props.theme.fonts.bold || 'System'};
`;

const CompletionText = styled(Text)`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary || '#9EABB8'}; /* Using a more generic theme color */
  font-family: ${(props) => props.theme.fonts.regular || 'System'};
`;

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export default DashboardHeader;
