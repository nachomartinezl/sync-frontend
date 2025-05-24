// interests.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Category, SelectedSubcategories } from "../types";
import { updateInterests } from "../api/mockApi";
import Chip from "../components/Chip";
import NextButton from "../components/NextButton";
import CategoryTitle from "../components/CategoryTitle";

const categories: Category[] = [
  {
    category: "Sports",
    subcategories: ["Soccer", "Basketball", "Tennis", "Running", "Swimming"],
  },
  {
    category: "Arts",
    subcategories: ["Painting", "Sculpture", "Theater", "Dance", "Photography"],
  },
  {
    category: "Music",
    subcategories: [
      "Playing Instruments",
      "Singing",
      "Composing",
      "Listening to Music",
    ],
  },
  // Add more categories here
];

export default function InterestsScreen() {
  const router = useRouter();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedSubcategories, setSelectedSubcategories] = useState<SelectedSubcategories>({});

  const currentCategory = categories[currentCategoryIndex];

  const handleSelection = (subcategory: string) => {
    setSelectedSubcategories((prevSelected) => ({
      ...prevSelected,
      [currentCategory.category]: {
        ...prevSelected[currentCategory.category],
        [subcategory]: !prevSelected[currentCategory.category]?.[subcategory],
      },
    }));
  };

  const formatInterests = () => {
    const formattedInterests: { [key: string]: string[] } = {};
    for (let category in selectedSubcategories) {
      formattedInterests[category] = Object.keys(
        selectedSubcategories[category]
      ).filter((sub) => selectedSubcategories[category][sub]);
    }
    return formattedInterests;
  };

  const handleNext = async () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      try {
        const interests = formatInterests();
        await updateInterests(interests);
        console.log("Formatted Interests:", interests);
        Alert.alert("Thank you!", "Your interests have been recorded.", [
          {
            text: "OK",
            onPress: () => router.push("/dashboard"),
          },
        ]);
      } catch (error) {
        console.error("Failed to update interests:", error);
        Alert.alert(
          "Error",
          "There was a problem updating your interests. Please try again."
        );
      }
    }
  };

  return (
    <Container>
      <ScrollView>
        <CategoryTitle title={currentCategory.category} />
        <SubcategoryContainer>
          {currentCategory.subcategories.map((sub, index) => (
            <Chip
              key={index}
              onPress={() => handleSelection(sub)}
              selected={!!selectedSubcategories[currentCategory.category]?.[sub]}
              label={sub}
            />
          ))}
        </SubcategoryContainer>
        <NextButton
          onPress={handleNext}
          label={currentCategoryIndex < categories.length - 1 ? "Next" : "Finish"}
        />
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const SubcategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;
