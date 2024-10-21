import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";
import { PersonalData, APIErrorResponse, ValidationError } from "../types";
import { updateProfile } from "../api/api";
import axios from "axios";
import DatePicker from "react-native-date-picker";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import StyledButton from "../components/StyledButton";
import BioModal from "../components/BioModal"; // Import the BioModal component

export default function PersonalDataScreen() {
  const router = useRouter();
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: "",
    surname: "",
    dob: "",
    gender: "",
    preference: "",
    country: "",
    height: "",
    job: "",
    study: "",
    bio: "",
    profilePicture: "",
    morePictures: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [isPreferenceModalVisible, setPreferenceModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("AR");
  const [country, setCountry] = useState<Country | null>(null);
  const [isBioModalVisible, setBioModalVisible] = useState(false); // State for bio modal

  const handleDateChange = (date: Date) => {
    setPersonalData({ ...personalData, dob: date.toISOString().split("T")[0] });
    setDatePickerVisible(false);
  };

  const handleGenderSelect = (selectedGender: string) => {
    setPersonalData({ ...personalData, gender: selectedGender });
    setGenderModalVisible(false);
  };

  const handlePreferenceSelect = (selectedPreference: string) => {
    setPersonalData({ ...personalData, preference: selectedPreference });
    setPreferenceModalVisible(false);
  };

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setPersonalData({ ...personalData, country: country.name });
  };

  const handleSubmit = async () => {
    try {
      const data = await updateProfile(personalData);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorResponse = (err.response?.data as APIErrorResponse) || {
          msg: "Unknown error",
        };

        if (errorResponse.errors) {
          setError(
            errorResponse.errors.map((e: ValidationError) => e.msg).join(", ")
          );
        } else if (errorResponse.msg) {
          setError(errorResponse.msg);
        } else {
          setError("Submission failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <ScrollViewContainer>
      <Content>
        <Title>Enter Your Personal Data</Title>
        {error && <ErrorText>{error}</ErrorText>}
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
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <Input
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={personalData.dob}
            editable={false}
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={new Date()}
          mode="date"
          onConfirm={handleDateChange}
          onCancel={() => setDatePickerVisible(false)}
        />
        <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
          <Input
            placeholder="Select Gender"
            value={personalData.gender}
            editable={false}
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <Modal isVisible={isGenderModalVisible}>
          <ModalContainer>
            <ModalOption onPress={() => handleGenderSelect("Male")}>
              <OptionText>Male</OptionText>
            </ModalOption>
            <ModalOption onPress={() => handleGenderSelect("Female")}>
              <OptionText>Female</OptionText>
            </ModalOption>
          </ModalContainer>
        </Modal>
        <TouchableOpacity onPress={() => setPreferenceModalVisible(true)}>
          <Input
            placeholder="Select Preference"
            value={personalData.preference}
            editable={false}
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <Modal isVisible={isPreferenceModalVisible}>
          <ModalContainer>
            <ModalOption onPress={() => handlePreferenceSelect("Man")}>
              <OptionText>Man</OptionText>
            </ModalOption>
            <ModalOption onPress={() => handlePreferenceSelect("Woman")}>
              <OptionText>Woman</OptionText>
            </ModalOption>
            <ModalOption onPress={() => handlePreferenceSelect("Both")}>
              <OptionText>Both</OptionText>
            </ModalOption>
            <ModalOption onPress={() => handlePreferenceSelect("Not sure")}>
              <OptionText>Not sure</OptionText>
            </ModalOption>
          </ModalContainer>
        </Modal>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCountryNameButton
          withAlphaFilter={false}
          withCallingCode={false}
          onSelect={handleCountrySelect}
          containerButtonStyle={{ width: "100%" }}
        />
        <Input
          placeholder="Height"
          value={personalData.height}
          onChangeText={(height) =>
            setPersonalData({ ...personalData, height })
          }
          placeholderTextColor="#888"
        />
        <Input
          placeholder="Job"
          value={personalData.job}
          onChangeText={(job) => setPersonalData({ ...personalData, job })}
          placeholderTextColor="#888"
        />
        <Input
          placeholder="Study"
          value={personalData.study}
          onChangeText={(study) => setPersonalData({ ...personalData, study })}
          placeholderTextColor="#888"
        />
        {/* Bio input with modal */}
        <TouchableOpacity onPress={() => setBioModalVisible(true)}>
          <Input
            placeholder="Bio"
            value={personalData.bio}
            editable={false}
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <BioModal
          isVisible={isBioModalVisible}
          bio={personalData.bio}
          onClose={() => setBioModalVisible(false)}
          onSave={(bio) => setPersonalData({ ...personalData, bio })}
        />
        <Input
          placeholder="Profile Picture URL"
          value={personalData.profilePicture}
          onChangeText={(profilePicture) =>
            setPersonalData({ ...personalData, profilePicture })
          }
          placeholderTextColor="#888"
        />
        <Input
          placeholder="More Pictures (comma separated URLs)"
          value={personalData.morePictures.join(", ")}
          onChangeText={(morePictures) =>
            setPersonalData({
              ...personalData,
              morePictures: morePictures.split(", ").map((p) => p.trim()),
            })
          }
          placeholderTextColor="#888"
        />
        <StyledButton onPress={handleSubmit} title="Submit" />
      </Content>
    </ScrollViewContainer>
  );
}

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const Content = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 12px;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.inputBackground};
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 10px;
  text-align: center;
`;

const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ModalOption = styled.TouchableOpacity`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  align-items: center;
`;

const OptionText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
