import React from "react";
import styled from "styled-components/native";
import { ScrollView, Text, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { rejectMatch } from "../api/api";
import { Match } from "../types";
import ProfileImage from "../components/ProfileImage";
import ProfileDetailItem from "../components/ProfileDetailItem";
import ActionButtons from "../components/ActionButtons";

export default function MatchDetailsScreen() {
  const router = useRouter();
  const { match: matchParam } = useLocalSearchParams<{ match: string }>();
  
  const match: Match = matchParam ? JSON.parse(matchParam) : null;

  if (!match) {
    return (
      <Container>
        <Text>No match details available.</Text>
      </Container>
    );
  }

  const handleIgnore = async () => {
    try {
      // Call the rejectMatch function to reject the match
      await rejectMatch(match.id);

      // Show confirmation alert to the user
      Alert.alert("Ignored", "You have ignored this match.");

      // Redirect the user to the dashboard
      router.push("/dashboard");
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error rejecting match:", error);
      Alert.alert("Error", "There was a problem ignoring the match. Please try again.");
    }
  };

  const handleAccept = () => {
    Alert.alert("Accepted", "You have accepted this match.");
    router.push({
      pathname: "/availabilitySelection",
      params: { matchId: match.id }, // Use the match id if available
    });
  };

  return (
    <Container>
      <ScrollView>
        <ProfileCard>
          <ProfileImage uri={match.picture} size={150} />
          <ProfileDetails>
            <ProfileDetailItem label="Name" value={match.name} />
            <ProfileDetailItem label="Age" value={match.age.toString()} />
            <ProfileDetailItem label="Height" value={match.height} />
            <ProfileDetailItem label="Job" value={match.job} />
            <ProfileDetailItem label="Study" value={match.study} />
            <ProfileDetailItem label="Bio" value={match.bio} />
          </ProfileDetails>
          <AdditionalPictures>
            {match.additionalPictures.map((picture, index) => (
              <ProfileImage key={index} uri={picture} size={100} />
            ))}
          </AdditionalPictures>
          <ActionButtons onIgnore={handleIgnore} onAccept={handleAccept} />
        </ProfileCard>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const ProfileCard = styled.View`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const AdditionalPictures = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;
