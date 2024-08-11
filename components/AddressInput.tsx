import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styled from "styled-components/native";

interface AddressInputProps {
  onAddressSelected: (address: string) => void;
  apiKey: string;
  placeholder?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  onAddressSelected,
  apiKey,
  placeholder = "Enter Address",
}) => {
  return (
    <Container>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        fetchDetails={true}
        onPress={(data, details = null) => {
          const address = data.description;
          onAddressSelected(address);
        }}
        query={{
          key: apiKey,
          language: "en",
        }}
        styles={{
          textInput: {
            height: 40,
            borderColor: "#888",
            borderWidth: 1,
            marginBottom: 12,
            padding: 10,
            color: "#000",
            backgroundColor: "#fff",
          },
        }}
      />
    </Container>
  );
};

export default AddressInput;

const Container = styled.View`
  width: 100%;
`;
