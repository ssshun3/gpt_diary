import { TagsInput } from "../../uiParts/tagsInput";
import styled from "styled-components";
import { useState } from "react";

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
  const handleSelect = (category, tag) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = { ...prevSelectedTags };
      if (updatedTags[category]) {
        if (updatedTags[category].includes(tag)) {
          updatedTags[category] = updatedTags[category].filter(
            (t) => t !== tag
          );
          if (updatedTags[category].length === 0) {
            delete updatedTags[category];
          }
        } else {
          updatedTags[category].push(tag);
        }
      } else {
        updatedTags[category] = [tag];
      }
      return updatedTags;
    });

    // onSelectが関数であることを確認し、選択されたタグの現在の状態を引数として渡す
    if (typeof onSelect === "function") {
      onSelect({
        ...selectedTags,
        [category]: selectedTags[category]
          ? selectedTags[category].includes(tag)
            ? selectedTags[category].filter((t) => t !== tag) // タグを解除
            : [...selectedTags[category], tag] // 新しいタグを追加
          : [tag], // 新しいカテゴリの初回選択
      });
    }
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
            <h3>{category}</h3>
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
`;
