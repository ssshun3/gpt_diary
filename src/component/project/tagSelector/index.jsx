import { TagsInput } from "../../uiParts/tagsInput";
import styled from "styled-components";
import { useState, useEffect } from "react";
const samplecategories = {
  いつ: ["午前中", "午後", "夜"],
  どこで: ["歯医者", "学校", "自宅", "映画館"],
  誰が: ["私", "友人", "家族"],
  何をした: ["虫歯の治療", "勉強", "映画鑑賞"],
  どうだった: ["楽しかった", "普通", "つまらなかった"],
};
export const TagSelector = ({
  categories = samplecategories,
  onSelect,
  onTagsChange,
}) => {
  const [selectedTags, setSelectedTags] = useState({});
  const [customTag, setCustomTag] = useState({});

  useEffect(() => {
    // 選択されたタグの情報を親コンポーネントに渡す
    if (typeof onTagsChange === "function") {
      onTagsChange(selectedTags);
    }
  }, [selectedTags, onTagsChange]);

  const handleSelect = (category, tag) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = { ...prevSelectedTags };
      const currentTags = updatedTags[category] || [];

      if (currentTags.includes(tag)) {
        updatedTags[category] = currentTags.filter((t) => t !== tag);
      } else {
        updatedTags[category] = [...currentTags, tag];
      }

      return updatedTags;
    });
  };

  const handleAddCustomTag = (category) => {
    if (customTag[category] && customTag[category].trim() !== "") {
      const newTags = {
        ...categories,
        [category]: [...categories[category], customTag[category]],
      };
      categories[category] = newTags[category];
      setCustomTag({ ...customTag, [category]: "" });
    }
  };

  const handleCustomTagChange = (category, value) => {
    setCustomTag({ ...customTag, [category]: value });
  };

  const renderSelectedTags = () => {
    return Object.entries(selectedTags).map(([category, tags]) => (
      <p key={category}>{`${category}: ${tags.join(", ")}`}</p>
    ));
  };

  return (
    <ContentWrapper>
      <Wrapper>
        {Object.entries(categories).map(([category, tags]) => (
          <div key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <TagsInput
              tags={tags}
              selectedTags={selectedTags}
              category={category}
              handleSelect={handleSelect}
              customTag={customTag}
              handleCustomTagChange={handleCustomTagChange}
              handleAddCustomTag={handleAddCustomTag}
            />
          </div>
        ))}
        <div>{renderSelectedTags()}</div>
      </Wrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  border: 2px solid #1ea7fd;
  border-radius: 8px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.h3``;
