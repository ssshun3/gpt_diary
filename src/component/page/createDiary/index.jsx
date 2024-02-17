import React, { useState } from "react";
import { TagSelector } from "../../project/tagSelector";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import OpenAI from "openai";

export const CreateDiary = () => {
  const history = useNavigate();
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [tagSelectors, setTagSelectors] = useState([
    {
      id: 0,
      component: (
        <TagSelector
          key={0}
          onSelect={(category, tag) => handleTagSelect(0, category, tag)}
          onTagsChange={(tags) => handleTagsChangeFromChild(0, tags)}
        />
      ),
    },
  ]);

  const addTagSelector = () => {
    const newId = tagSelectors.length; // 新しいIDを生成
    const newSelector = {
      id: newId,
      component: (
        <TagSelector
          key={newId}
          onSelect={(category, tag) => handleTagSelect(newId, category, tag)}
          onTagsChange={(tags) => handleTagsChangeFromChild(newId, tags)} // ここで子からの変更を捉える
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
  const [selectedTagsFromChildren, setSelectedTagsFromChildren] = useState({});

  const handleTagsChangeFromChild = (childId, tags) => {
    setSelectedTagsFromChildren((prev) => ({
      ...prev,
      [childId]: tags,
    }));
  };

  const handleTagSelect = (id, category, tag) => {
    console.log(`TagSelector ${id} - Category: ${category}, Tag: ${tag}`);
  };
  const handleSubmitTags = () => {
    console.log(selectedTagsFromChildren);
    history("/edit-diary");
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
      <button onClick={handleSubmitTags}>タグを提出</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 40px;
`;
