// components/UpcomingDatesSection.tsx
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import NoDataText from "./NoDataText";

interface UpcomingDatesSectionProps {
  acceptedDate: { date: string; place: string; otherUser: { name: string } } | null;
  router: any;
}

const UpcomingDatesSection: React.FC<UpcomingDatesSectionProps> = ({
  acceptedDate,
  router,
}) => (
  <Section>
    <SectionTitle>Upcoming Dates</SectionTitle>
    {acceptedDate ? (
      <DateCard onPress={() => router.push("/dateDetails")}>
        <CardDetails>
          <PlaceText>{acceptedDate.otherUser.name}</PlaceText>
          <PlaceText>Place: {acceptedDate.place}</PlaceText>
          <DateText>Date: {acceptedDate.date}</DateText>
        </CardDetails>
      </DateCard>
    ) : (
      <NoDataText>No dates set yet</NoDataText>
    )}
  </Section>
);

export default UpcomingDatesSection;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const DateCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CardDetails = styled.View`
  margin-left: 10px;
  justify-content: center;
`;

const PlaceText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;
