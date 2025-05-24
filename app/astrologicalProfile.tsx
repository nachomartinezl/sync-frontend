import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AstrologicalProfile } from "../types";
import { updateAstrologicalProfile } from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";
import WhiteButton from "../components/WhiteButton";

export default function AstrologicalProfileScreen() {
  const router = useRouter();

  const initialProfile: AstrologicalProfile = {
    timeOfBirth: new Date(),
    pob: "",
  };

  const [profile, setProfile] = useState<AstrologicalProfile>(initialProfile);
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

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
      const astrologicalData = {
        birthTime: profile.timeOfBirth.toTimeString().split(" ")[0],
        placeOfBirth: profile.pob,
      };

      const result = await updateAstrologicalProfile(astrologicalData);
      console.log("Astrological profile updated:", result);
      Alert.alert("Thank you!", "Your astrological profile has been generated.", [
        { text: "OK", onPress: () => router.push("/dashboard") },
      ]);
    } catch (error) {
      console.error("Failed to update astrological profile:", error);
      Alert.alert("Error", "There was a problem updating your astrological profile. Please try again.");
    }
  };

  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>

        <Title>Astrological Profile</Title>

        {/* Time of Birth Input */}
        <TouchableInput onPress={showTimePicker} activeOpacity={1}>
          <InputText>{profile.timeOfBirth.toLocaleTimeString() || "Select Time"}</InputText>
        </TouchableInput>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />

        {/* Place of Birth Input */}
        <Input
          placeholder="Place of Birth"
          value={profile.pob}
          onChangeText={handlePobChange}
          placeholderTextColor={theme.colors.placeholder}
        />

        {/* Start Calculation Button */}
        <WhiteButton onPress={startCalculation} title="Start Calculation" />
        {loadingStep && <LoadingIndicator text={loadingStep} />}
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 1%;
  padding-top: 100px;
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
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  elevation: 5;
  font-size: 16px;
`;

const TouchableInput = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  justify-content: center;
  elevation: 5;
`;

const InputText = styled.Text`
  color: ${(props) => props.theme.colors.placeholder};
  font-size: 16px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: 16px;
  font-weight: bold;
`;
