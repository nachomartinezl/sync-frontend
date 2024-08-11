// components/CategoryTitle.tsx
import React from "react";
import styled from "styled-components/native";

interface CategoryTitleProps {
  title: string;
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ title }) => (
  <Title>{title}</Title>
);

export default CategoryTitle;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;
