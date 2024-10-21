import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { respondToSuggestedDate } from "../api/api";
import { Match } from "../types";
import MatchesSection from "../components/MatchesSection"; // Reuse MatchCard component
import NoDataText from "../components/NoDataText";
import ActionButtons from "../components/ActionButtons";
import DatePicker from "react-native-date-picker";

interface DateDetails {
  place: string;
  datetime: string; // Can be Date type if necessary
}

export default function DateDetailsScreen() {
  const router = useRouter();
  const { match: matchParam, date: dateParam } = useLocalSearchParams();

  const match: Match | null = matchParam ? JSON.parse(matchParam as string) : null;
  const date: DateDetails | null = dateParam ? JSON.parse(dateParam as string) : null;

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!match || !date) {
    return (
      <Container>
        <NoDataText>No date or match details available.</NoDataText>
      </Container>
    );
  }

  const handleAccept = async () => {
    try {
      const result = await respondToSuggestedDate(match.id, "accept");
      Alert.alert("Success", result.msg);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error accepting the date:", error);
      Alert.alert("Error", "Failed to accept the date. Please try again.");
    }
  };

  const handleReject = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = async (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    setDatePickerVisible(false);
  
    try {
      const result = await respondToSuggestedDate(match.id, "reject", {
        suggestedDate: selectedDate.toISOString(),
        suggestedPlace: date.place, // Access 'place' from the 'date' object
      });
      Alert.alert("Success", result.msg);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error rejecting the date:", error);
      Alert.alert("Error", "Failed to reject the date. Please try again.");
    }
  };

  return (
    <Container>
      <ScrollView>
        <SectionTitle>Your Date</SectionTitle>
        <MatchCardContainer>
          <MatchesSection noMatch={false} router={router} match={match} />
        </MatchCardContainer>
        <DateDetailsCard>
          <DetailText>Place: {date.place}</DetailText>
          <DetailText>Date & Time: {new Date(date.datetime).toLocaleString()}</DetailText>
        </DateDetailsCard>
        <ActionButtons onIgnore={handleReject} onAccept={handleAccept} />
      </ScrollView>

      <DatePicker
        modal
        open={isDatePickerVisible}
        date={selectedDate}
        mode="datetime"
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisible(false)}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const MatchCardContainer = styled.View`
  margin-bottom: 20px;
`;

const DateDetailsCard = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  margin-bottom: 20px;
`;

const DetailText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;
