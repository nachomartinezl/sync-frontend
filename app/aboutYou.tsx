import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import WhiteButton from "../components/WhiteButton";
import { PersonalData } from "../types";

export default function PersonalDataStep2() {
  const router = useRouter();
  const { personalData: personalDataString } = useLocalSearchParams(); // Get passed data
  const [personalData, setPersonalData] = useState<PersonalData>(
    personalDataString ? JSON.parse(personalDataString) : {}
  );

  const handleNext = () => {
    router.push({
      pathname: "/yourProfile",
      params: { personalData: JSON.stringify(personalData) },
    });
  };

  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>

      <Title>About You</Title>

      {/* Country Picker */}
      <PickerWrapper>
        <Picker
          selectedValue={personalData.country}
          onValueChange={(itemValue) =>
            setPersonalData({ ...personalData, country: itemValue })
          }
          style={pickerStyles}
        >
          <Picker.Item label="Select Country" value="" />
          <Picker.Item label="Argentina" value="Argentina" />
          <Picker.Item label="Brazil" value="Brazil" />
          <Picker.Item label="USA" value="USA" />
          {/* Add more countries as needed */}
        </Picker>
      </PickerWrapper>

      {/* Preference Picker */}
      <PickerWrapper>
        <Picker
          selectedValue={personalData.preference}
          onValueChange={(itemValue) =>
            setPersonalData({ ...personalData, preference: itemValue })
          }
          style={pickerStyles}
        >
          <Picker.Item label="What do you prefer?" value="" />
          <Picker.Item label="Men" value="Men" />
          <Picker.Item label="Women" value="Women" />
          <Picker.Item label="Both" value="Both" />
          <Picker.Item label="Not Sure" value="Not Sure" />
        </Picker>
      </PickerWrapper>

      {/* Height Input */}
      <Input
        placeholder="Your height"
        value={personalData.height}
        onChangeText={(height) => setPersonalData({ ...personalData, height })}
        placeholderTextColor="#888"
      />

      <WhiteButton onPress={handleNext} title="Next" />
    </Container>
  );
}

// Your styled components (same as before)
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

const PickerWrapper = styled.View`
  width: 90%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  justify-content: center;
  elevation: 5;
`;

const pickerStyles = {
    color: "#888", 
  };