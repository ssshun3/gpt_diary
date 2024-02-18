import React from "react";
import styled from "styled-components";

export const IconWithButton = ({ Icon, text, onClick, size = 25 }) => {
  return (
    <Button onClick={onClick}>
      <Icon size={size} />
      {text}
    </Button>
  );
};

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
