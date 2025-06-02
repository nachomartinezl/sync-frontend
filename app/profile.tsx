import React, { useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, View, TouchableOpacity, Image, Text, ActivityIndicator } from "react-native"; // Added Text, ActivityIndicator
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, selectUserProfile } from "../store/slices/userProfileSlice";
import { RootState, AppDispatch } from "../store"; // Import RootState and AppDispatch for typing

export default function ProfileSummaryScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const { 
    name, 
    bio, 
    preference, 
    mainPicture, 
    loading, 
    error 
  } = useSelector((state: RootState) => selectUserProfile(state)); // Typed state

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading === 'pending') {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>Error: {error}</ErrorMessage>
        <TouchableOpacity onPress={() => dispatch(fetchUserProfile())}>
          <RetryText>Try Again</RetryText>
        </TouchableOpacity>
      </Container>
    );
  }
  
  // Fallback for mainPicture if it's null or undefined, to prevent crashes
  const displayPicture = mainPicture || 'https://via.placeholder.com/150';


  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>
      {/* User Name on Top */}
      <UserName>{name || 'N/A'}</UserName>

      {/* Profile Picture with Update Text */}
      <ProfilePictureContainer>
        <ProfileImage source={{ uri: displayPicture }} />
        <TouchableOpacity>
          <UpdateText>Update Photo</UpdateText>
        </TouchableOpacity>
      </ProfilePictureContainer>

      {/* Bio */}
      <BioCard>
        <BioText>{bio || 'No bio available.'}</BioText>
      </BioCard>

      {/* Preference Section */}
      <Section>
        <SectionTitle>Your preference</SectionTitle>
        <TouchableOpacity>
        <PreferenceContainer>
          <PreferenceText>{preference || 'Not set'}</PreferenceText>
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

const ErrorMessage = styled.Text`
  color: red;
  font-size: 18px;
  margin-bottom: 10px;
`;

const RetryText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center; /* Adjusted for loading/error states */
  align-items: center;
  background-color: #121212;
  padding: 10px;
  padding-top: 15%; /* This might need adjustment if justify-content is center */
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
