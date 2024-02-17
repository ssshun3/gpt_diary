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

export const TagSelector = ({ categories = samplecategories, onSelect }) => {
  const [selectedTags, setSelectedTags] = useState({});
  const [customTag, setCustomTag] = useState({});

  useEffect(() => {
    if (typeof onSelect === "function") {
      onSelect(selectedTags);
    }
  }, [selectedTags, onSelect]);

  const handleSelect = (category, tag) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = { ...prevSelectedTags };

      // カテゴリーに対する現在のタグリストを取得（存在しない場合は空の配列）
      const currentTags = updatedTags[category] || [];

      if (currentTags.includes(tag)) {
        // タグが既に選択されていれば削除
        updatedTags[category] = currentTags.filter((t) => t !== tag);
      } else {
        // タグが選択されていなければ追加
        updatedTags[category] = [...currentTags, tag];
      }

      return updatedTags;
    });
  };

  const handleAddCustomTag = (category) => {
    if (customTag[category] && customTag[category].trim() !== "") {
      // 新しいカスタムタグをカテゴリーに追加
      const newTags = {
        ...categories,
        [category]: [...categories[category], customTag[category]],
      };
      categories[category] = newTags[category]; // カテゴリーのタグリストを更新
      setCustomTag({ ...customTag, [category]: "" }); // 入力フィールドをクリア
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
