// dashboard.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Match, SuggestedDate } from "../types";
import { getMatch, getSuggestedDate, getAcceptedDate } from "../api/api";
import TopBar from "../components/TopBar";
import CompletenessBar from "../components/CompletenessBar";
import MatchesSection from "../components/MatchesSection";
import UpcomingDatesSection from "../components/UpcomingDatesSection";
import SuggestedDatesSection from "../components/SuggestedDatesSection";
import TrainAlgorithmSection from "../components/TrainAlgorithmSection";

export default function DashboardScreen() {
  const router = useRouter();
  const [name, setName] = useState("User");
  const [completeness, setCompleteness] = useState(0.5);
  const [match, setMatch] = useState<Match | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [suggestedDates, setSuggestedDates] = useState<SuggestedDate[]>([]);
  const [acceptedDate, setAcceptedDate] = useState<{
    date: string;
    place: string;
    otherUser: { name: string };
  } | null>(null);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        const data = await getMatch();
        console.log("Match Data:", data);

        if (data && data.user2) {
          setMatchId(data.match._id);

          if (data.match.accepted) {
            setNoMatch(true);
            setMatch(null);

            const acceptedDateData = await getAcceptedDate(data.match._id);
            console.log("Accepted Date Data:", acceptedDateData);

            if (
              acceptedDateData &&
              acceptedDateData.acceptedDate &&
              acceptedDateData.suggestedPlace
            ) {
              setAcceptedDate({
                date: acceptedDateData.acceptedDate,
                place: acceptedDateData.suggestedPlace,
                otherUser: acceptedDateData.otherUser,
              });
            } else {
              setAcceptedDate(null);
            }
          } else {
            setMatch({
              name: data.user2.profileData.name,
              age: data.user2.profileData.age,
              height: data.user2.profileData.height,
              picture:
                data.user2.profileData.profilePicture ||
                "https://via.placeholder.com/100",
            });

            const suggestedDateData = await getSuggestedDate(data.match._id);
            if (suggestedDateData && suggestedDateData.suggestedDate) {
              setSuggestedDates([suggestedDateData.suggestedDate]);
            }
          }
        } else {
          setNoMatch(true);
        }
      } catch (error) {
        console.error("Error fetching match:", error);
        Alert.alert(
          "Error",
          "There was a problem fetching your match. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <Container>
      <TopBar name={name} onProfilePress={() => router.push("/profile")} />
      <CompletenessBar completeness={completeness} />
      <UpcomingDatesSection acceptedDate={acceptedDate} router={router} />
      <SuggestedDatesSection suggestedDates={suggestedDates} matchId={matchId} router={router} />
      <MatchesSection match={match} noMatch={noMatch} router={router} />
      <TrainAlgorithmSection router={router} />
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;
