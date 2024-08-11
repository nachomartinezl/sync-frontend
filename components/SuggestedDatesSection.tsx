// components/SuggestedDatesSection.tsx
import React from "react";
import styled from "styled-components/native";
import { SuggestedDate } from "../types";
import NoDataText from "./NoDataText";

interface SuggestedDatesSectionProps {
  suggestedDates: SuggestedDate[];
  matchId: string | null;
  router: any;
}

const SuggestedDatesSection: React.FC<SuggestedDatesSectionProps> = ({
  suggestedDates,
  matchId,
  router,
}) => (
  <Section>
    <SectionTitle>Suggested Dates</SectionTitle>
    {suggestedDates.length > 0 ? (
      suggestedDates.map((date, index) => (
        <SuggestedDateCard
          key={index}
          onPress={() =>
            router.push({
              pathname: "/dateSuggestion",
              params: { matchId },
            })
          }
        >
          <CardDetails>
            <PlaceText>{date.otherUser.name}</PlaceText>
            <PlaceText>Place: {date.place}</PlaceText>
            <DateText>Date: {date.date}</DateText>
          </CardDetails>
        </SuggestedDateCard>
      ))
    ) : (
      <NoDataText>No suggested dates</NoDataText>
    )}
  </Section>
);

export default SuggestedDatesSection;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const SuggestedDateCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: center;
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
