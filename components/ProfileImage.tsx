// components/ProfileImage.tsx
import React from "react";
import styled from "styled-components/native";

interface ProfileImageProps {
  uri: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ uri, size = 150 }) => (
  <Image source={{ uri }} size={size} />
);

export default ProfileImage;

const Image = styled.Image<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  margin-bottom: 20px;
`;
