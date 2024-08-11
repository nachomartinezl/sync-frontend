// components/TopBar.tsx
import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface TopBarProps {
  name: string;
  onProfilePress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ name, onProfilePress }) => (
  <TopBarContainer>
    <Greeting>Hello, {name}</Greeting>
    <TouchableOpacity onPress={onProfilePress}>
      <UserImage source={{ uri: "https://via.placeholder.com/40" }} />
    </TouchableOpacity>
  </TopBarContainer>
);

export default TopBar;

const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Greeting = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const UserImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
