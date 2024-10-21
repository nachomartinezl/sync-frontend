import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileSummaryScreen() {
  const router = useRouter();
  const [profileData] = useState({
    name: "Devan",
    bio: "Born in Sydney, currently traveling the world in pursuit of new experiences and adventures. Passionate about fitness and living an active lifestyle, constantly exploring new ways to challenge both mind and body.",
    preference: "Women",
    mainPicture:
      "https://cdn.usegalileo.ai/stability/7fa5b77f-a521-4605-b8fe-86ed75b44f5a.png",
  });

  const { name, bio, mainPicture, preference } = profileData;

  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>
      {/* User Name on Top */}
      <UserName>{name}</UserName>

      {/* Profile Picture with Update Text */}
      <ProfilePictureContainer>
        <ProfileImage source={{ uri: mainPicture }} />
        <TouchableOpacity>
          <UpdateText>Update Photo</UpdateText>
        </TouchableOpacity>
      </ProfilePictureContainer>

      {/* Bio */}
      <BioCard>
        <BioText>{bio}</BioText>
      </BioCard>

      {/* Preference Section */}
      <Section>
        <SectionTitle>Your preference</SectionTitle>
        <TouchableOpacity>
        <PreferenceContainer>
          <PreferenceText>{preference}</PreferenceText>
          <PreferenceIcon source={require("../assets/icons/women.png")} />
        </PreferenceContainer>
        </TouchableOpacity>
      </Section>

      {/* Settings Section */}
      <Section>
        <SectionTitle>Settings</SectionTitle>
        <SettingsContainer>
          <TouchableOpacity>
            <SettingsItem>
              <SettingsText>Change password</SettingsText>
              <SettingsIconRight
                source={require("../assets/icons/password.png")}
              />
            </SettingsItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <SettingsItem>
              <SettingsText>Phone number</SettingsText>
              <SettingsIconRight
                source={require("../assets/icons/phone.png")}
              />
            </SettingsItem>
          </TouchableOpacity>
        </SettingsContainer>
      </Section>
    </Container>
  );
}

// Styled components

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #121212;
  padding: 10px;
  padding-top: 15%;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const BackArrow = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const UserName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProfilePictureContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background-color: #333;
  margin-bottom: 10px;
`;

const UpdateText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const BioCard = styled.View`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  elevation: 5;
`;

const BioText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: left;
`;

const Section = styled.View`
  width: 90%;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PreferenceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #1e1e1e;
  border-radius: 12px;
`;

const PreferenceText = styled.Text`
  color: white;
  font-size: 16px;
`;

const PreferenceIcon = styled.Image`
  width: 13px;
  height: 24px;
`;

const SettingsContainer = styled.View`
  width: 100%;
`;

const SettingsItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #1e1e1e;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const SettingsText = styled.Text`
  color: white;
  font-size: 16px;
`;

const SettingsIconRight = styled.Image`
  width: 22px;
  height: 22px;
`;
