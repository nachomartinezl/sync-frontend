// components/InterestList.tsx
import React from "react";
import styled from "styled-components/native";

interface InterestListProps {
  interests: { [category: string]: string[] };
}

const InterestList: React.FC<InterestListProps> = ({ interests }) => (
  <>
    {Object.keys(interests).map((category, index) => (
      <InterestCategory key={index}>
        <InterestTitle>{category}</InterestTitle>
        <InterestItems>
          {interests[category].map((interest, idx) => (
            <InterestItem key={idx}>{interest}</InterestItem>
          ))}
        </InterestItems>
      </InterestCategory>
    ))}
  </>
);

export default InterestList;

const InterestCategory = styled.View`
  margin-bottom: 10px;
`;

const InterestTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
`;

const InterestItems = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const InterestItem = styled.Text`
  background-color: ${(props) => props.theme.colors.tagBackground};
  color: ${(props) => props.theme.colors.tagText};
  padding: 5px 10px;
  border-radius: 15px;
  margin: 5px;
`;
