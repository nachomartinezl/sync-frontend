import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { TouchableOpacity, ActivityIndicator, Text, View, Image } from 'react-native'; // Added View, Image
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAppointments, 
  selectAppointments, 
  selectAppointmentsLoading, 
  selectAppointmentsError 
} from "../store/slices/appointmentsSlice";
import { RootState, AppDispatch } from "../store";
import DateDisplayCard from "../../components/DateDisplayCard";
import AlgorithmNavigationButton from "../../components/AlgorithmNavigationButton";
import DashboardHeader from "../../components/DashboardHeader"; // Import DashboardHeader
import MatchPreviewCard from "../../components/MatchPreviewCard"; // Import MatchPreviewCard

interface SectionProps {
  flex?: number;
}

// Constants for data and file paths
const PROFILE_IMAGE_URL = "https://cdn.usegalileo.ai/stability/7fa5b77f-a521-4605-b8fe-86ed75b44f5a.png";

// Matches data (replace with API call in the future) - APPOINTMENT constant removed
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

export default function DashboardScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => selectAppointments(state));
  const appointmentsLoading = useSelector((state: RootState) => selectAppointmentsLoading(state));
  const appointmentsError = useSelector((state: RootState) => selectAppointmentsError(state));

  // Assuming user's name and profile completeness are fetched from userProfileSlice
  // For now, let's keep the local state for these, or you could integrate them similarly
  const [userName, setUserName] = useState("Devan"); // Renamed to avoid conflict
  const [completeness, setCompleteness] = useState(1);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const currentAppointment = appointments && appointments.length > 0 ? appointments[0] : null;
  const appointmentPicture = currentAppointment?.partnerImage || 'https://via.placeholder.com/150';

  return (
    <MainContainer>
      <DashboardHeader 
        userName={userName}
        profileCompleteness={completeness}
        profileImageUrl={PROFILE_IMAGE_URL}
        onProfilePress={() => router.push("/profile")}
      />

      <ContentContainer>
        <Section flex={0.8}>
          <SectionTitle>Your date</SectionTitle>
          {appointmentsLoading === 'pending' && <ActivityIndicator size="large" color="#fff" />}
          {appointmentsError && <ErrorMessage>Error: {appointmentsError}</ErrorMessage>}
          {appointmentsLoading !== 'pending' && !appointmentsError && currentAppointment && (
            <DateDisplayCard
              pictureUrl={appointmentPicture}
              partnerName={currentAppointment.partnerName || 'N/A'}
              place={currentAppointment.description || 'Details unavailable'}
              datetime={`${currentAppointment.date} at ${currentAppointment.time || 'Time TBD'}`}
              status={currentAppointment.status || 'Unknown'}
              onPress={() => router.push("/dateDetails")}
            />
          )}
          {appointmentsLoading !== 'pending' && !appointmentsError && !currentAppointment && (
            <NoDateText>No current date scheduled.</NoDateText>
          )}
        </Section>

        <Section flex={1}>
          <SectionTitle>Matches</SectionTitle>
          <MatchesGrid>
            {MATCHES.map((m, idx) => (
              <MatchPreviewCard
                key={idx}
                name={m.name}
                age={m.age}
                pictureUrl={m.picture}
                onPress={() => idx === 0 && router.push("/matchDetails")} 
              />
            ))}
          </MatchesGrid>
        </Section>

        <Section flex={0.8}>
          <SectionTitle>Train your algorithm</SectionTitle>
          <AlgorithmSection>
            <AlgorithmNavigationButton
              iconSource={ALGORITHM_ICONS.personality}
              label="Personality"
              onPress={() => router.push("/personalityTest")}
            />
            <AlgorithmNavigationButton
              iconSource={ALGORITHM_ICONS.character}
              label="Character"
              onPress={() => router.push("/personalityTest")}
            />
            <AlgorithmNavigationButton
              iconSource={ALGORITHM_ICONS.emotional}
              label="Emotional"
              onPress={() => router.push("/personalityTest")}
            />
            <AlgorithmNavigationButton
              iconSource={ALGORITHM_ICONS.astrological}
              label="Astrology"
              onPress={() => router.push("/astrologicalProfile")}
            />
            <AlgorithmNavigationButton
              iconSource={ALGORITHM_ICONS.interests}
              label="Interests"
              onPress={() => router.push("/interests")}
            />
            <AlgorithmNavigationButton
              iconSource={ALGORITHM_ICONS.values}
              label="Values"
              onPress={() => router.push("/interests")}
            />
          </AlgorithmSection>
        </Section>
      </ContentContainer>
    </MainContainer>
  );
}

const MainContainer = styled(View)` /* Changed to styled(View) */
  flex: 1;
  background-color: ${(props) => props.theme.colors.background || '#121212'}; /* Fallback */
`;

const ErrorMessage = styled(Text)` /* Changed to styled(Text) */
  color: red;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const NoDateText = styled(Text)` /* Changed to styled(Text) */
  color: #9eabb8; /* Or theme.colors.textSecondary */
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

// TopBar, ProfileSection, GreetingText, CompletionText, ProfileImage are removed
// as they are now in DashboardHeader.tsx

const ContentContainer = styled(View)` 
  flex: 1;
  padding: 20px;
`;

const Section = styled(View)<SectionProps>` /* Changed to styled(View) */
  flex: ${(props) => props.flex || 1};
  margin-bottom: 5%;
`;

const SectionTitle = styled(Text)` /* Changed to styled(Text) */
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary || '#FFFFFF'}; /* Fallback */
  font-family: ${(props) => props.theme.fonts.bold || 'System'}; /* Fallback */
  margin-bottom: 3%;
`;

// DateImage, DateCard, DateDetails, StatusContainer, Status, NameText, PlaceText, DateText are removed
// as they are now in DateDisplayCard.tsx

const MatchesGrid = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

// MatchCard, MatchImage, MatchName are removed
// as they are now in MatchPreviewCard.tsx

const AlgorithmSection = styled(View)`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

// AlgorithmButton, AlgorithmIcon, AlgorithmText are removed
// as they are now in AlgorithmNavigationButton.tsx
