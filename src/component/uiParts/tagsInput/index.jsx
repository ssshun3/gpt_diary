import { CiCirclePlus } from "react-icons/ci";
import React from "react";
import { Button } from "../button/Button";
import styled from "styled-components";

export const TagsInput = ({
  tags,
  selectedTags,
  category,
  handleSelect,
  customTag,
  handleCustomTagChange,
  handleAddCustomTag,
}) => {
  return (
    <Wrapper>
      <ButtonWrapper>
        {tags.map((tag) => (
          <Button
            key={tag}
            primary={
              selectedTags[category] && selectedTags[category].includes(tag)
            }
            label={tag}
            onClick={() => handleSelect(category, tag)}
          >
            {tag}
          </Button>
        ))}
      </ButtonWrapper>
      <AddTagWrapper>
        <CustomTagInput
          type="text"
          placeholder="好きなタグを追加する"
          value={customTag[category] || ""}
          onChange={(e) => handleCustomTagChange(category, e.target.value)}
        />
        <StyledIconWithButton onClick={() => handleAddCustomTag(category)}>
          <CiCirclePlus />
          作成
        </StyledIconWithButton>
      </AddTagWrapper>
    </Wrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const CustomTagInput = styled.input`
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 2px 6px;
  height: 29px;
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddTagWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIconWithButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #495057;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  gap: 5px;
  &:hover {
    background-color: #343a40;
  }
  svg {
    font-size: 20px;
  }
`;
