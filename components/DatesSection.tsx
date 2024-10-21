import React from "react";
import styled from "styled-components/native";
import { Match } from "../types";
import NoDataText from "./NoDataText";

interface DatesSectionProps {
  matches: Match[];  // Expecting an array of matches
  router: any;
}

const DatesSection: React.FC<DatesSectionProps> = ({ matches = [], router }) => {
  // Ensure matches is always an array, even if undefined
  const relevantMatches = matches.filter(
    match =>
      match.appointment &&
      (match.appointment.status === 'pending' || match.appointment.status === 'accepted')
  );

  if (relevantMatches.length === 0) {
    return <NoDataText>No dates available.</NoDataText>;
  }

  return (
    <Section>
      {relevantMatches.map(match => (
        <DateCard
          key={match.id}
          onPress={() =>
            router.push({
              pathname: "/dateDetails",
              params: {
                match: JSON.stringify(match),
                date: JSON.stringify({
                  place: match.appointment?.place,
                  datetime: match.appointment?.date,
                }),
              },
            })
          }
        >
          <CardDetails>
            <NameText>{match.name}</NameText>
            <PlaceText>Place: {match.appointment?.place}</PlaceText>
            <DateText>Date: {match.appointment?.date ? new Date(match.appointment.date).toLocaleString() : 'No date provided'}</DateText>
            <StatusText>Status: {match.appointment?.status}</StatusText>
          </CardDetails>
        </DateCard>
      ))}
    </Section>
  );
};

export default DatesSection;

const Section = styled.View`
  margin-bottom: 20px;
`;

const DateCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CardDetails = styled.View`
  margin-left: 10px;
  justify-content: center;
`;

const NameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
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

const StatusText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondary};
`;
