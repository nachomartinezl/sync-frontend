// components/QuestionContainer.tsx
import React from "react";
import styled from "styled-components/native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

interface QuestionContainerProps {
  question: string;
  response: number;
  onResponseChange: (value: number) => void;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  question,
  response,
  onResponseChange,
}) => {
  const min = useSharedValue(1);
  const max = useSharedValue(5);

  return (
    <Container>
      <QuestionText>{question}</QuestionText>
      <Slider
        style={{ width: "100%", height: 40 }}
        progress={useSharedValue(response)}
        minimumValue={min}
        maximumValue={max}
        step={1}
        onValueChange={onResponseChange}
        theme={{
          maximumTrackTintColor: "#fff",
          minimumTrackTintColor: "#000",
        }}
      />
      <ResponseValue>{response}</ResponseValue>
    </Container>
  );
};

export default QuestionContainer;

const Container = styled.View`
  margin-bottom: 20px;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`;

const ResponseValue = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-top: 10px;
`;
