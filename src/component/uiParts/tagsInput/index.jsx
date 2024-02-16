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
      <div>
        <CustomTagInput
          type="text"
          placeholder="カスタムタグを追加"
          value={customTag[category] || ""}
          onChange={(e) => handleCustomTagChange(category, e.target.value)}
        />
        <button onClick={() => handleAddCustomTag(category)}>タグ追加</button>
      </div>
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
