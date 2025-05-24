// personalityTest.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../theme";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

// Simple array of questions
const questions = [
  "I would be quite bored by a visit to an art gallery.",
  "I enjoy having a wide circle of acquaintances.",
  "I like to take charge of situations.",
  "I often feel blue.",
  "I prefer to stick to familiar experiences."
];

// Map for response values
const responseLabels: { [key: number]: string } = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
};

export default function PersonalityTestScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(3));
  const [sliderValue, setSliderValue] = useState(3);

  const min = useSharedValue(1);
  const max = useSharedValue(5);

  const handleResponseChange = (value: number) => {
    setSliderValue(value);
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = Math.round(value);
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSliderValue(responses[currentQuestionIndex + 1]);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Responses:", responses);
      Alert.alert("Thank you!", "Your responses have been saved.", [
        {
          text: "OK",
          onPress: () => router.push("/dashboard"),
        },
      ]);
    } catch (error) {
      console.error("Failed to save responses:", error);
      Alert.alert("Error", "There was a problem saving your responses.");
    }
  };

  return (
    <Container>
      {/* Back Button */}
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>
      
      {/* Title */}
      <Title>Question {currentQuestionIndex + 1}</Title>
      
      {/* Question Text */}
      <QuestionText>{questions[currentQuestionIndex]}</QuestionText>

      {/* Slider */}
      <Slider
        style={{ width: "100%", height: 40, marginVertical: 20 }}
        progress={useSharedValue(sliderValue)}
        minimumValue={min}
        maximumValue={max}
        onValueChange={handleResponseChange}
        theme={{
          maximumTrackTintColor: theme.colors.sliderMaxTrack,
          minimumTrackTintColor: theme.colors.sliderMinTrack,
        }}
      />

      {/* Displaying rounded response label */}
      <ResponseLabel>
        {responseLabels[Math.round(sliderValue)]}
      </ResponseLabel>
      
      {/* Next Button */}
      <NextButton onPress={handleNext}>
        <ButtonText>
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </ButtonText>
      </NextButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 20px;
  padding-top: 100px;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const BackArrow = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 30px;
  text-align: center;
`;

const QuestionText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const ResponseLabel = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const NextButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 15px;
  margin-top: 30px;
  width: 80%;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: 16px;
  font-weight: bold;
`;
