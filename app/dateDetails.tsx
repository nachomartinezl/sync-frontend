import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import WhiteButton from "../components/WhiteButton";
import TransparentButton from "../components/TransparentButton";

export default function DateDetailsScreen() {
  const router = useRouter();

  // Mock date data
  const [dateDetails] = useState({
    id: "2",
    name: "Gina",
    age: 24,
    height: 1.77,
    zodiac: "Cancer",
    country: "CA",
    picture: "https://cdn.usegalileo.ai/stability/592d5f3f-d636-48a4-9277-8cce7690ba8c.png",
    place: "Rooftop Bar",
    dateTime: "Next Friday, 22 hs",
    status: "Confirmed",
    tags: ["Photography", "Running", "Nutrition", "Swimming", "Jazz", "Travel", "Reading"],
  });

  // Placeholder function for rescheduling the date
  const handleReschedule = () => {
    console.log("Reschedule button pressed");
    // Placeholder logic for rescheduling
  };

  // Placeholder function for suggesting a new place
  const handleSuggestion = () => {
    console.log("Suggest new place button pressed");
    // Placeholder logic for suggesting a new place
  };

  return (
    <Container>
      {/* Back Button */}
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>

      {/* Name */}
      <UserName>Date with {dateDetails.name}</UserName>

      {/* Picture and Date Details Card */}
      <DateDetailsCard>
        <ProfileImage source={{ uri: dateDetails.picture }} />
        <DateInfo>
          <Place>{dateDetails.place}</Place>
          <DateTime>{dateDetails.dateTime}</DateTime>
          <StatusContainer>
            <Status>{dateDetails.status}</Status>
          </StatusContainer>
        </DateInfo>
      </DateDetailsCard>

      {/* Info Row */}
      <InfoRow>
        <InfoItem>
          <InfoIcon source={require("../assets/icons/age.png")} />
          <InfoText>{dateDetails.age}</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoIcon source={require("../assets/icons/height.png")} />
          <InfoText>{dateDetails.height}m</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoIcon source={require("../assets/icons/cancer.png")} />
          <InfoText>{dateDetails.zodiac}</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoIcon source={require("../assets/icons/country.png")} />
          <InfoText>{dateDetails.country}</InfoText>
        </InfoItem>
      </InfoRow>

      {/* Tags Section */}
      <TagsContainer>
        {dateDetails.tags.map((tag, index) => (
          <Tag key={index}>
            <TagText>{tag}</TagText>
          </Tag>
        ))}
      </TagsContainer>

      {/* Buttons */}
      <ButtonSection>
        <TransparentButton onPress={handleReschedule} title="Reschedule">
          <ButtonText>Reschedule</ButtonText>
        </TransparentButton>
        <WhiteButton onPress={handleSuggestion} title="Suggest new place">
          <ButtonText>Suggest new place</ButtonText>
        </WhiteButton>
      </ButtonSection>
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

const UserName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DateDetailsCard = styled.View`
  background-color: #1c1c1e;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 20px;
  width: 51%;
`;

const ProfileImage = styled.Image`
  width: 187px;
  height: 187px;
  border-radius: 12px;
  background-color: #333;
  margin-bottom: 10px;
`;

const DateInfo = styled.View`
  align-items: center;
`;

const Place = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const DateTime = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
`;

const StatusContainer = styled.View`
  background-color: #008043;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 10%;
`;

const Status = styled.Text`
  color: white;
  font-size: 14px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 2%;
  margin-bottom: 1%;
  padding: 0 10px;
`;

const InfoItem = styled.View`
  align-items: center;
  justify-content: center;
  width: 23%; 
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 10px; 
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

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

const Tag = styled.View`
  background-color: #1c1c1e;
  padding: 5px 15px;
  border-radius: 8px;
  margin: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 4;
`;

const TagText = styled.Text`
  color: white;
  font-size: 14px;
`;

const ButtonSection = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 30px;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;
