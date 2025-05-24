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
  emotional: require("../assets/icons/emotional.png"),
  character: require("../assets/icons/character.png"),
  astrological: require("../assets/icons/cancer.png"),
  interests: require("../assets/icons/interests.png"),
  values: require("../assets/icons/values.png"),
};

// --- Sub-Components ---

// 1. DashboardDateCard Component
interface DashboardDateCardProps {
  appointment: typeof APPOINTMENT;
}
const DashboardDateCard: React.FC<DashboardDateCardProps> = ({ appointment }) => (
  <>
    <DateImage source={{ uri: appointment.picture }} />
    <DateDetails>
      <NameText>{appointment.name}</NameText>
      <PlaceText>{appointment.place}</PlaceText>
      <DateText>{appointment.datetime}</DateText>
      <StatusContainer>
        <Status>{appointment.status}</Status>
      </StatusContainer>
    </DateDetails>
  </>
);

// 2. DashboardMatchCard Component
interface DashboardMatchCardProps {
  match: typeof MATCHES[0];
}
const DashboardMatchCard: React.FC<DashboardMatchCardProps> = ({ match }) => (
  <>
    <MatchImage source={{ uri: match.picture }} />
    <MatchName>
      {match.name}, {match.age}
    </MatchName>
  </>
);

// 3. DashboardAlgorithmButton Component
interface DashboardAlgorithmButtonProps {
  icon: any; // Adjust type as per require() output, typically ImageSourcePropType
  text: string;
}
const DashboardAlgorithmButton: React.FC<DashboardAlgorithmButtonProps> = ({ icon, text }) => (
  <>
    <AlgorithmIcon source={icon} />
    <AlgorithmText>{text}</AlgorithmText>
  </>
);

// --- Main Dashboard Screen ---

const algorithmButtonsConfig = [
  { text: "Personality", icon: ALGORITHM_ICONS.personality, route: "/personalityTest" },
  { text: "Character", icon: ALGORITHM_ICONS.character, route: "/personalityTest" }, // Assuming same route for now
  { text: "Emotional", icon: ALGORITHM_ICONS.emotional, route: "/personalityTest" }, // Assuming same route for now
  { text: "Astrology", icon: ALGORITHM_ICONS.astrological, route: "/astrologicalProfile" },
  { text: "Interests", icon: ALGORITHM_ICONS.interests, route: "/interests" },
  { text: "Values", icon: ALGORITHM_ICONS.values, route: "/interests" }, // Assuming same route for now
];

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
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <ProfileImage source={{ uri: PROFILE_IMAGE_URL }} />
        </TouchableOpacity>
      </TopBar>

      <ContentContainer>
        <Section flex={0.8}>
          <SectionTitle>Your date</SectionTitle>
          <DateCard onPress={() => router.push("/dateDetails")}>
            <DashboardDateCard appointment={APPOINTMENT} />
          </DateCard>
        </Section>

        <Section flex={1}>
          <SectionTitle>Matches</SectionTitle>
          <MatchesGrid>
            {MATCHES.map((m, idx) => (
              <MatchCard key={idx} onPress={() => idx === 0 && router.push("/matchDetails")}>
                <DashboardMatchCard match={m} />
              </MatchCard>
            ))}
          </MatchesGrid>
        </Section>

        <Section flex={0.8}>
          <SectionTitle>Train your algorithm</SectionTitle>
          <AlgorithmSection>
            {algorithmButtonsConfig.map((button, index) => (
              <AlgorithmButton key={index} onPress={() => router.push(button.route)}>
                <DashboardAlgorithmButton icon={button.icon} text={button.text} />
              </AlgorithmButton>
            ))}
          </AlgorithmSection>
        </Section>
      </ContentContainer>
    </MainContainer>
  );
}

// --- Styled Components (remain unchanged) ---

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
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.bold};
`;

const CompletionText = styled.Text`
  font-size: 14px;
  color: #9eabb8;
  font-family: ${(props) => props.theme.fonts.regular};
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
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.bold};
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
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 5px;
`;

const PlaceText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.regular};
`;

const DateText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.regular};
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
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.bold};
`;

const AlgorithmSection = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const AlgorithmButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 32%;
  height: 40%;
  background-color: #1c1c1e;
  border-radius: 12px;
  margin-bottom: 3%;
  padding: 7px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 4;
`;

const AlgorithmIcon = styled.Image`
 width: 31px;
 height: 32px;
 margin-right: 7px;
`;

const AlgorithmText = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.regular};
`;
