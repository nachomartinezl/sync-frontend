import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from 'react-native';

interface SectionProps {
  flex?: number;
}

// Constants for data and file paths
const PROFILE_IMAGE_URL = "https://cdn.usegalileo.ai/stability/7fa5b77f-a521-4605-b8fe-86ed75b44f5a.png";

// Appointment data (replace with API call in the future)
const APPOINTMENT = {
  name: "Gina",
  place: "Rooftop Bar",
  datetime: "Next Friday, 22hs",
  status: "Confirmed",
  picture:
    "https://cdn.usegalileo.ai/stability/592d5f3f-d636-48a4-9277-8cce7690ba8c.png",
};

// Matches data (replace with API call in the future)
const MATCHES = [
  {
    name: "Lauren",
    age: 24,
    picture:
      "https://cdn.usegalileo.ai/stability/fd019050-d42d-4db8-a569-8133b13b377b.png",
  },
  {
    name: "Annie",
    age: 30,
    picture:
      "https://cdn.usegalileo.ai/stability/255abdc5-c5b0-431a-834a-2b8aa4fb67c9.png",
  },
  {
    name: "Luna",
    age: 29,
    picture:
      "https://cdn.usegalileo.ai/stability/33fdf395-b702-4ef4-a446-5c7b4057794a.png",
  },
];

// Icons for algorithm training (replace with dynamic assets or API paths if needed)
const ALGORITHM_ICONS = {
  personality: require("../assets/icons/personality.png"),
  astrological: require("../assets/icons/cancer.png"),
  interests: require("../assets/icons/interests.png"),
};

export default function DashboardScreen() {
  const router = useRouter();
  const [name, setName] = useState("Devan");
  const [completeness, setCompleteness] = useState(1);

  return (
    <MainContainer>
      <TopBar>
        <ProfileSection>
          <GreetingText>Hello, {name}</GreetingText>
          <CompletionText>
            Your profile is {completeness * 100}% complete
          </CompletionText>
        </ProfileSection>
        {/* Wrap ProfileImage with TouchableOpacity to handle onPress */}
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <ProfileImage source={{ uri: PROFILE_IMAGE_URL }} />
        </TouchableOpacity>
      </TopBar>

      <ContentContainer>
        <Section flex={0.8}>
          <SectionTitle>Your date</SectionTitle>
          <DateCard onPress={() => router.push("/dateDetails")}>
            <DateImage source={{ uri: APPOINTMENT.picture }} />
            <DateDetails>
              <NameText>{APPOINTMENT.name}</NameText>
              <PlaceText>{APPOINTMENT.place}</PlaceText>
              <DateText>{APPOINTMENT.datetime}</DateText>
              <StatusContainer>
              <Status>{APPOINTMENT.status}</Status>
              </StatusContainer>
            </DateDetails>
          </DateCard>
        </Section>

        <Section flex={1}>
          <SectionTitle>Matches</SectionTitle>
          <MatchesGrid>
            {/* Navigate to /matches when the first match is clicked */}
            {MATCHES.map((m, idx) => (
              <MatchCard key={idx} onPress={() => idx === 0 && router.push("/matchDetails")}>
                <MatchImage source={{ uri: m.picture }} />
                <MatchName>
                  {m.name}, {m.age}
                </MatchName>
              </MatchCard>
            ))}
          </MatchesGrid>
        </Section>

        <Section flex={0.8}>
          <SectionTitle>Train your algorithm</SectionTitle>
          <AlgorithmSection>
            {/* Each button navigates to the respective route */}
            <AlgorithmButton onPress={() => router.push("/personalityTest")}>
              <AlgorithmIcon source={ALGORITHM_ICONS.personality} />
              <AlgorithmText>Personality</AlgorithmText>
            </AlgorithmButton>
            <AlgorithmButton onPress={() => router.push("/astrologicalProfile")}>
              <AlgorithmIcon source={ALGORITHM_ICONS.astrological} />
              <AlgorithmText>Astrological</AlgorithmText>
            </AlgorithmButton>
            <AlgorithmButton onPress={() => router.push("/interests")}>
              <AlgorithmIcon source={ALGORITHM_ICONS.interests} />
              <AlgorithmText>Interests</AlgorithmText>
            </AlgorithmButton>
          </AlgorithmSection>
        </Section>
      </ContentContainer>
    </MainContainer>
  );
}


const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 5%;
`;

const ProfileSection = styled.View`
  flex-direction: column;
`;

const GreetingText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const CompletionText = styled.Text`
  font-size: 14px;
  color: #9eabb8;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const Section = styled.View<SectionProps>`
  flex: ${(props) => props.flex || 1};
  margin-bottom: 5%;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 3%;
`;

const DateImage = styled.Image`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  margin-right: 10px;
`;

const DateCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  flex: 1;
`;

const DateDetails = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const StatusContainer = styled.View`
  background-color: #008043;
  padding: 5px;
  border-radius: 6px;
  margin-bottom: 2%;
  width: 75%;
`;

const Status = styled.Text`
  color: white;
  font-size: 14px;
  text-align: center;
`;

const NameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 5px;
`;

const PlaceText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary};
`;

const DateText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary};
`;

const StatusButton = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: green;
`;

const MatchesGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const MatchCard = styled.TouchableOpacity`
  align-items: flex-start;
  width: 32%;
  margin-bottom: 10px;
`;

const MatchImage = styled.Image`
  width: 100%;
  height: 90%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MatchName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;

const AlgorithmSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const AlgorithmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30%;
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 4;
`;

const AlgorithmIcon = styled.Image`
 margin-bottom: 10px;
`;

const AlgorithmText = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;
