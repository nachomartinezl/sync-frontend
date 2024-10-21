import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";
import WhiteButton from "../components/WhiteButton";
import { PersonalData } from "../types";

export default function PersonalDataStep1() {
  const router = useRouter();
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: "",
    surname: "",
    dob: "",
    gender: "",
    preference: "",
    country: "",
    height: "",
    bio: "",
    profilePicture: "",
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateChange = (date: Date) => {
    setPersonalData({ ...personalData, dob: date.toISOString().split("T")[0] });
    setDatePickerVisible(false);
  };

  const handleNext = () => {
    router.push({
      pathname: "/aboutYou",
      params: { personalData: JSON.stringify(personalData) },
    });
  };

  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>

      <Title>Your personal data</Title>

      <Input
        placeholder="Name"
        value={personalData.name}
        onChangeText={(name) => setPersonalData({ ...personalData, name })}
        placeholderTextColor="#888"
      />

      <Input
        placeholder="Surname"
        value={personalData.surname}
        onChangeText={(surname) =>
          setPersonalData({ ...personalData, surname })
        }
        placeholderTextColor="#888"
      />

      <TouchableInput
        onPress={() => setDatePickerVisible(true)}
        activeOpacity={1}
      >
        <InputText>
          {personalData.dob ? personalData.dob : "Date of birth"}
        </InputText>
      </TouchableInput>

      <DatePicker
        modal
        open={isDatePickerVisible}
        date={new Date()}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisible(false)}
      />

    <PickerWrapper>
        <Picker
          selectedValue={personalData.gender}
          onValueChange={(itemValue) =>
            setPersonalData({ ...personalData, gender: itemValue })
          }
          style={pickerStyles}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </PickerWrapper>

      <WhiteButton
        onPress={handleNext}
        title="Next"
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
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
  height: 45px;
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
  height: 45px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  justify-content: center;
  elevation: 5;
`;

const InputText = styled.Text`
  color: #888;
  font-size: 16px;
`;

const PickerWrapper = styled.View`
  width: 90%;
  height: 45px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  justify-content: center;
  elevation: 5;
`;

const pickerStyles = {
  color: "#888", 
};