import React, { useState } from "react";
import { TagSelector } from "../../project/tagSelector";
import styled from "styled-components";

export const CreateDiary = () => {
  const [tagSelectors, setTagSelectors] = useState([
    {
      id: 0,
      component: (
        <TagSelector
          key={0}
          onSelect={(category, tag) => handleTagSelect(0, category, tag)}
        />
      ),
    },
  ]);

  const addTagSelector = () => {
    const newId = tagSelectors.length;
    const newSelector = {
      id: newId,
      component: (
        <TagSelector
          key={newId}
          onSelect={(category, tag) => handleTagSelect(newId, category, tag)}
        />
      ),
    };
    setTagSelectors((prevSelectors) => [...prevSelectors, newSelector]);
  };

  const removeTagSelector = (id) => {
    setTagSelectors((prevSelectors) =>
      prevSelectors.filter((selector) => selector.id !== id)
    );
  };

  const handleTagSelect = (id, category, tag) => {
    console.log(`TagSelector ${id} - Category: ${category}, Tag: ${tag}`);
  };

  return (
    <Wrapper>
      {tagSelectors.map((selector) => (
        <div key={selector.id}>
          {selector.component}
          <button onClick={() => removeTagSelector(selector.id)}>取消</button>
        </div>
      ))}
      <button onClick={addTagSelector}>エピソードを追加</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 40px;
`;
