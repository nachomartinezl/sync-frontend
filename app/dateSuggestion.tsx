import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Text, Alert } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { SuggestedDate } from "../types";
import { getSuggestedDate, respondToSuggestedDate } from "../api/api";
import ActionButtons from "../components/ActionButtons";
import DetailText from "../components/DetailText";

export default function DateSuggestionScreen() {
  const router = useRouter();
  const { matchId } = useGlobalSearchParams();
  const [suggestedDate, setSuggestedDate] = useState<SuggestedDate | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestedDate = async () => {
      try {
        if (!matchId) {
          setError("Match ID not provided");
          setLoading(false);
          return;
        }
        const data = await getSuggestedDate(matchId as string);
        if (data && data.suggestedDate) {
          setSuggestedDate(data.suggestedDate);
        } else {
          setError("No suggested date found");
        }
      } catch (error) {
        console.error("Error fetching suggested date:", error);
        setError("Failed to fetch suggested date");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedDate();
  }, [matchId]);

  const handleAccept = async () => {
    try {
      const result = await respondToSuggestedDate(matchId as string, "accept");
      Alert.alert("Success", result.msg);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error accepting the date:", error);
      Alert.alert("Error", "Failed to accept the date. Please try again.");
    }
  };

  const handleIgnore = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
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
        <Title>Date Suggestion</Title>
        <DetailText>Date: {suggestedDate?.date}</DetailText>
        <DetailText>Place: {suggestedDate?.place}</DetailText>
        <ActionButtons onAccept={handleAccept} onIgnore={handleIgnore} />
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;
