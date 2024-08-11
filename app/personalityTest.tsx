// personalityTest.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { PersonalityTestResponse } from "../types";
import { personalityTest } from "../api/api";
import { questions } from "../questions";
import QuestionContainer from "../components/QuestionContainer";
import NextButton from "../components/NextButton";

export default function PersonalityTestScreen() {
  const router = useRouter();
  const [responses, setResponses] = useState<PersonalityTestResponse[]>(
    questions.map((question) => ({ question, response: 3 }))
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleResponseChange = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex].response = Math.round(value);
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const responseValues = responses.map((response) => response.response);
      const result = await personalityTest(responseValues);
      console.log("Responses saved:", result);
      Alert.alert("Thank you!", "Your responses have been saved.", [
        {
          text: "OK",
          onPress: () => router.push("/dashboard"),
        },
      ]);
    } catch (error) {
      console.error("Failed to save responses:", error);
      Alert.alert(
        "Error",
        "There was a problem saving your responses. Please try again."
      );
    }
  };

  return (
    <Container>
      <ScrollView>
        <Title>Big Five Personality Test</Title>
        <QuestionContainer
          question={questions[currentQuestionIndex]}
          response={responses[currentQuestionIndex].response}
          onResponseChange={handleResponseChange}
        />
        <NextButton
          onPress={handleNext}
          label={currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
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

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;
