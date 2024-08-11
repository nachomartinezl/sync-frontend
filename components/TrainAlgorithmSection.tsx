// components/TrainAlgorithmSection.tsx
import React from "react";
import styled from "styled-components/native";

interface TrainAlgorithmSectionProps {
  router: any;
}

const TrainAlgorithmSection: React.FC<TrainAlgorithmSectionProps> = ({ router }) => (
  <Section>
    <SectionTitle>Train your algorithm</SectionTitle>
    <Card onPress={() => router.push("/personalityTest")}>
      <CardText>Personality Test</CardText>
    </Card>
    <Card onPress={() => router.push("/astrologicalProfile")}>
      <CardText>Astrological Profile</CardText>
    </Card>
    <Card onPress={() => router.push("/interests")}>
      <CardText>Interests</CardText>
    </Card>
  </Section>
);

export default TrainAlgorithmSection;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const Card = styled.TouchableOpacity`
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

const CardText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`;
