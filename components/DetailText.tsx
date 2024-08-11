// components/DetailText.tsx
import styled from "styled-components/native";

const DetailText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

export default DetailText;
