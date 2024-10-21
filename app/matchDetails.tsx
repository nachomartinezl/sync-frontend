import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function MatchDetailsScreen() {
  const router = useRouter();

  // Mock match data
  const [match] = useState({
    id: "1",
    name: "Lauren",
    age: 24,
    height: 1.77,
    zodiac: "Cancer",
    country: "CA",
    picture: "https://cdn.usegalileo.ai/stability/f555e0b7-b6f7-4e40-8e4c-6b75c0fd8d78.png",
    bio: "Left my job as a financial advisor to start my own adventure, and I’ve been traveling for 8 months, exploring new cultures, meeting incredible people, and discovering the world beyond my country.",
  });

  const handleIgnore = async () => {
    try {
      Alert.alert("Ignored", "You have ignored this match.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error rejecting match:", error);
      Alert.alert("Error", "There was a problem ignoring the match. Please try again.");
    }
  };

  const handleAccept = () => {
    Alert.alert("Accepted", "You have accepted this match.");
    router.push({
      pathname: "/availabilitySelection",
      params: { matchId: match.id },
    });
  };

  return (
    <Container>
        {/* Back Button */}
        <BackButton onPress={() => router.back()}>
          <BackArrow>←</BackArrow>
        </BackButton>

        <UserName>{match.name}</UserName>

        {/* Profile Image */}
        <ProfilePictureContainer>
          <ProfileImage source={{ uri: match.picture }} />
        </ProfilePictureContainer>

        {/* Name and Bio */}
        <BioText>{match.bio}</BioText>

        {/* Quick Info: Age, Height, Zodiac, Location */}
        <InfoRow>
          <InfoItem>
            <InfoIcon source={require("../assets/icons/age.png")} />
            <InfoText>{match.age}</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon source={require("../assets/icons/height.png")} />
            <InfoText>{match.height}m</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon source={require("../assets/icons/cancer.png")} />
            <InfoText>{match.zodiac}</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon source={require("../assets/icons/country.png")} />
            <InfoText>{match.country}</InfoText>
          </InfoItem>
        </InfoRow>

        {/* Accept/Reject Buttons */}
        <ActionButtonsContainer>
          <RejectButton onPress={handleIgnore}>
            <RejectText>Reject</RejectText>
          </RejectButton>
          <AcceptButton onPress={handleAccept}>
            <AcceptText>Accept</AcceptText>
          </AcceptButton>
        </ActionButtonsContainer>
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
  color: white;
`;

const ProfilePictureContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
  width: 187px;
  height: 187px;
  border-radius: 12px;
  background-color: #333;
  margin-bottom: 10px;
`;

const UserName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BioText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 2%;
  margin-bottom: 5%;
  padding: 0 10px;
`;

const InfoItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 23%; 
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 2px; 
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 4;
`;

const InfoIcon = styled.Image`
  margin-bottom: 5px;
  max-height: 33px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;


const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 94%;
`;

const RejectButton = styled.TouchableOpacity`
  background-color: #800002;
  padding: 15px;
  width: 48%;
  border-radius: 8px;
  align-items: center;
`;

const AcceptButton = styled.TouchableOpacity`
  background-color: #008043;
  padding: 15px;
  width: 48%;
  border-radius: 8px;
  align-items: center;
`;

const RejectText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const AcceptText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
