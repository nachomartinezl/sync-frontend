// components/MatchesSection.tsx
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Match } from "../types";
import NoDataText from "./NoDataText";

interface MatchesSectionProps {
  match: Match | null;
  noMatch: boolean;
  router: any;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({
  match,
  noMatch,
  router,
}) => (
  <Section>
    <SectionTitle>Matches</SectionTitle>
    {match ? (
      <MatchCard onPress={() => router.push("/matchDetails")}>
        <MatchImage source={{ uri: match.picture }} />
        <MatchInfo>
          <MatchText>Name: {match.name}</MatchText>
          <MatchText>Age: {match.age}</MatchText>
          <MatchText>Height: {match.height}</MatchText>
        </MatchInfo>
      </MatchCard>
    ) : noMatch ? (
      <NoDataText>No matches found. Please check back later.</NoDataText>
    ) : (
      <NoDataText>Loading match...</NoDataText>
    )}
  </Section>
);

export default MatchesSection;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const MatchCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  padding: 10px;
`;

const MatchImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
`;

const MatchInfo = styled.View`
  flex-direction: column;
`;

const MatchText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`;
