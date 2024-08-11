// components/ProfileDetailItem.tsx
import React from "react";
import styled from "styled-components/native";

interface ProfileDetailItemProps {
  label: string;
  value: string;
}

const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({ label, value }) => (
  <ProfileText>
    {label}: {value}
  </ProfileText>
);

export default ProfileDetailItem;

const ProfileText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  margin: 5px 0;
`;
