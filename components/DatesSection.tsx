import React from "react";
import styled from "styled-components/native";
import { Match } from "../types";
import NoDataText from "./NoDataText";

interface DatesSectionProps {
  match: Match | null;
  appointment: { name: string; date: string; place: string; status: string } | null;
  router: any;
}

const DatesSection: React.FC<DatesSectionProps> = ({ match, appointment, router }) => (
  <Section>
    {appointment ? (
     <DateCard
     onPress={() =>
       router.push({
         pathname: "/dateDetails",
         params: {
           match: JSON.stringify(match), // Passing match object as a JSON string
           date: JSON.stringify({
             place: appointment.place,
             datetime: appointment.date,
           }),
         },
       })
     }
   >
        <CardDetails>
        <NameText>Name: {appointment.name}</NameText> 
          <PlaceText>Place: {appointment.place}</PlaceText>
          <DateText>Date: {appointment.date}</DateText>
          <StatusText>Status: {appointment.status}</StatusText>
        </CardDetails>
      </DateCard>
    ) : (
      <NoDataText>No dates set yet</NoDataText>
    )}
  </Section>
);

export default DatesSection;

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
