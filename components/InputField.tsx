// components/InputField.tsx
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  onPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, onPress, ...props }) => (
  <InputContainer>
    <InputLabel>{label}</InputLabel>
    {onPress ? (
      <TouchableOpacity onPress={onPress}>
        <CustomInput {...props} editable={false} />
      </TouchableOpacity>
    ) : (
      <CustomInput {...props} />
    )}
  </InputContainer>
);

export default InputField;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const InputLabel = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const CustomInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.background};
`;
