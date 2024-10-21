import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Match } from "../types";
import { getDashboard } from "../api/api";
import TopBar from "../components/TopBar";
import CompletenessBar from "../components/CompletenessBar";
import MatchesSection from "../components/MatchesSection";
import DatesSection from "../components/DatesSection";
import TrainAlgorithmSection from "../components/TrainAlgorithmSection";

export default function DashboardScreen() {
  const router = useRouter();
  const [name, setName] = useState("User");
  const [completeness, setCompleteness] = useState(0.5);
  const [match, setMatch] = useState<Match | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [appointment, setAppointment] = useState<{
    name: string;
    date: string;
    place: string;
    status: string;
  } | null>(null);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboard();
  
        if (data && data.match) {
          setMatchId(data.match._id);
  
          setMatch({
            id: data.match._id,
            name: data.match.otherUser.name,
            age: data.match.otherUser.age,
            country: data.match.otherUser.country,
            height: data.match.otherUser.height,
            job: data.match.otherUser.job,
            study: data.match.otherUser.study,
            bio: data.match.otherUser.bio,
            picture: data.match.otherUser.mainPicture || "https://via.placeholder.com/150",
            additionalPictures: data.match.otherUser.additionalPictures || [],
          });
  
          // Appointment details are now part of the match object
          if (data.match.appointment) {
            setAppointment({
              name: data.match.otherUser.name,
              date: data.match.appointment.date,
              place: data.match.appointment.place,
              status: data.match.appointment.status,
            });
          } else {
            setAppointment(null); // Clear appointment if not present
          }
        } else {
          setNoMatch(true);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        Alert.alert(
          "Error",
          "There was a problem fetching your dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
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
      <SectionTitle>Dates</SectionTitle>
      <DatesSection match={match} appointment={appointment} router={router} />
      <SectionTitle>Matches</SectionTitle>
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

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;
