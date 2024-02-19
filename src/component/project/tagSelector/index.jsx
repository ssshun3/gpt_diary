import { TagsInput } from "../../uiParts/tagsInput";
import styled from "styled-components";
import { useState, useEffect } from "react";
const samplecategories = {
  いつ: ["午前中", "午後", "夜", "早朝", "一日中"],
  どこで: [
    "歯医者",
    "学校",
    "自宅",
    "映画館",
    "図書館",
    "カフェ",
    "公園",
    "ジム",
    "職場",
  ],
  誰が: ["私", "友人", "家族", "同僚", "先生", "上司", "恋人", "後輩", "先輩"],
  何をした: [
    "虫歯の治療",
    "勉強",
    "映画鑑賞",
    "料理",
    "運動",
    "読書",
    "作業",
    "休憩",
  ],
  どうだった: [
    "楽しかった",
    "普通",
    "つまらなかった",
    "充実していた",
    "刺激的だった",
    "リラックスできた",
  ],
};

export const TagSelector = ({
  categories = samplecategories,
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
    return (
      <SelectedTagsWrapper>
        {Object.entries(selectedTags).map(([category, tags]) => (
          <div key={category}>
            <CategoryTitle>{category}:</CategoryTitle>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ))}
      </SelectedTagsWrapper>
    );
  };

  return (
    <ContentWrapper>
      <Wrapper>
        {Object.entries(categories).map(([category, tags]) => (
          <TitleTagWrapper key={category}>
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
          </TitleTagWrapper>
        ))}
        <div>{renderSelectedTags()}</div>
      </Wrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.h3`
  margin: 8px;
`;
const SelectedTagsWrapper = styled.div`
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #1ea7fd;
  color: #fff;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 15px;
  font-size: 14px;
`;

const TitleTagWrapper = styled.div`
  padding: 5px 0 5px 0;
`;
