import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import WhiteButton from "../components/WhiteButton";
import { updateProfile, uploadProfilePicture } from "../api/mockApi"; // Import your API call
import { PersonalData, APIErrorResponse, ValidationError } from "../types";
import { launchImageLibrary } from "react-native-image-picker";

export default function PersonalDataStep3() {
  const router = useRouter();
  const { personalData: personalDataString } = useLocalSearchParams();
  const [personalData, setPersonalData] = useState<PersonalData>(
    personalDataString ? JSON.parse(personalDataString) : {}
  );
  const [error, setError] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(personalData.profilePicture || null);

    // Handle image selection
  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });

    if (result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      setImageUri(image.uri);

      try {
        const uploadResponse = await uploadProfilePicture(image); // Call the API function to upload the image
        setPersonalData({ ...personalData, profilePicture: uploadResponse.fileUrl });
      } catch (uploadError) {
        setError("Image upload failed.");
      }
    }
  };

  // Handle submit with API call
  const handleSubmit = async () => {
    try {
      const data = await updateProfile(personalData);
      router.push("/dashboard"); // Navigate to the dashboard upon success
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
    <Container>
      <BackButton onPress={() => router.back()}>
        <BackArrow>←</BackArrow>
      </BackButton>

      <Title>Your Profile</Title>

      {/* Profile Picture Placeholder */}
      <ProfilePictureContainer>
        <ProfilePicture source={{ uri: imageUri || "https://cdn.usegalileo.ai/stability/7fa5b77f-a521-4605-b8fe-86ed75b44f5a.png" }} />
        <ProfilePictureText onPress={handleImagePick}>Upload Photo</ProfilePictureText>
      </ProfilePictureContainer>

      {/* Bio Input */}
      <BioInput
        placeholder="Tell others about you..."
        value={personalData.bio}
        onChangeText={(bio) => setPersonalData({ ...personalData, bio })}
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
      />

      {error && <ErrorText>{error}</ErrorText>}

      <WhiteButton onPress={handleSubmit} title="Submit" />
    </Container>
  );
}

/* Styled Components */
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

const ProfilePictureContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 9px;
  margin-bottom: 10px;
`;

const ProfilePictureText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`;

const BioInput = styled.TextInput`
  width: 90%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  text-align-vertical: top;
  elevation: 5;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 10px;
`;
