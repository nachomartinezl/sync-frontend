// astrologicalProfile.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AstrologicalProfile } from "../types";
import { updateAstrologicalProfile } from "../api/api";
import InputField from "../components/InputField";
import StartButton from "../components/StartButton";
import LoadingIndicator from "../components/LoadingIndicator";

export default function AstrologicalProfileScreen() {
  const router = useRouter();

  const initialProfile: AstrologicalProfile = {
    timeOfBirth: new Date(),
    pob: "",
  };

  const [profile, setProfile] = useState<AstrologicalProfile>(initialProfile);
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (selectedTime: Date) => {
    setProfile({ ...profile, timeOfBirth: selectedTime });
    hideTimePicker();
  };

  const handlePobChange = (text: string) => {
    setProfile({ ...profile, pob: text });
  };

  const startCalculation = () => {
    const steps = [
      "Calculating Sun Sign...",
      "Calculating Moon Sign...",
      "Calculating Ascendant...",
      "Calculating Venus Position...",
      "Calculating Mars Position...",
    ];

    let stepIndex = 0;
    setLoadingStep(steps[stepIndex]);

    const interval = setInterval(() => {
      stepIndex += 1;
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
      } else {
        clearInterval(interval);
        setLoadingStep(null);
        handleSubmit();
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      const latitude = 40.7128; 
      const longitude = -74.006;

      const astrologicalData = {
        birthTime: profile.timeOfBirth.toTimeString().split(" ")[0],
        latitude,
        longitude,
      };

      const result = await updateAstrologicalProfile(astrologicalData);
      console.log("Astrological profile updated:", result);
      Alert.alert(
        "Thank you!",
        "Your astrological profile has been generated.",
        [
          {
            text: "OK",
            onPress: () => router.push("/dashboard"),
          },
        ]
      );
    } catch (error) {
      console.error("Failed to update astrological profile:", error);
      Alert.alert(
        "Error",
        "There was a problem updating your astrological profile. Please try again."
      );
    }
  };

  return (
    <Container>
      <ScrollView>
        <Title>Astrological Profile</Title>
        <InputField
          label="Exact Time of Birth"
          placeholder="Select Time"
          value={profile.timeOfBirth.toLocaleTimeString()}
          onPress={showTimePicker}
          editable={false}
          placeholderTextColor="#888"
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
        <InputField
          label="Place of Birth"
          placeholder="Enter Place of Birth"
          value={profile.pob}
          onChangeText={handlePobChange}
          placeholderTextColor="#888"
        />
        <StartButton onPress={startCalculation} title="Start Calculation" />
        {loadingStep && <LoadingIndicator text={loadingStep} />}
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
