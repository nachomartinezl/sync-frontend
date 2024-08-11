import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MatchDetails } from "../types";
import { getMatch } from "../api/api";
import ProfileImage from "../components/ProfileImage";
import ProfileDetailItem from "../components/ProfileDetailItem";
import ActionButtons from "../components/ActionButtons";

export default function MatchDetailsScreen() {
  const router = useRouter();
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchId, setMatchId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const data = await getMatch();
        if (data && data.user2) {
          setMatchId(data.match._id);
          setMatchDetails({
            name: data.user2.profileData.name,
            age: data.user2.profileData.age,
            height: data.user2.profileData.height,
            job: data.user2.profileData.job,
            study: data.user2.profileData.study,
            personalDescription: data.user2.profileData.bio,
            mainPicture: data.user2.profileData.profilePicture || "https://via.placeholder.com/150",
            additionalPictures: data.user2.profileData.additionalPictures || [
              "https://via.placeholder.com/100",
              "https://via.placeholder.com/100",
              "https://via.placeholder.com/100",
            ],
          });
        } else {
          setError("No match found");
        }
      } catch (error) {
        console.error("Failed to fetch match details:", error);
        setError("Failed to fetch match details");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, []);

  const handleIgnore = () => {
    Alert.alert("Ignored", "You have ignored this match.");
    router.push("/dashboard");
  };

  const handleAccept = () => {
    if (matchId) {
      Alert.alert("Accepted", "You have accepted this match.");
      router.push({
        pathname: "/availabilitySelection",
        params: { matchId },
      });
    } else {
      Alert.alert("Error", "Unable to retrieve match ID.");
    }
  };

  if (loading) {
    return (
      <Container>
        <Text>Loading match details...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>{error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView>
        <ProfileCard>
          {matchDetails && (
            <>
              <ProfileImage uri={matchDetails.mainPicture} size={150} />
              <ProfileDetails>
                <ProfileDetailItem label="Name" value={matchDetails.name} />
                <ProfileDetailItem label="Age" value={matchDetails.age?.toString() || "Unknown"} />
                <ProfileDetailItem label="Height" value={matchDetails.height?.toString() || "Unknown"} />
                <ProfileDetailItem label="Job" value={matchDetails.job || "Unknown"} />
                <ProfileDetailItem label="Study" value={matchDetails.study || "Unknown"} />
                <ProfileDetailItem label="Bio" value={matchDetails.personalDescription || "No bio available"} />
              </ProfileDetails>
              <AdditionalPictures>
                {matchDetails.additionalPictures.map((picture, index) => (
                  <ProfileImage key={index} uri={picture} size={100} />
                ))}
              </AdditionalPictures>
              <ActionButtons onIgnore={handleIgnore} onAccept={handleAccept} />
            </>
          )}
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
