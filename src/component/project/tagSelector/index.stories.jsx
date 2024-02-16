import { TagSelector } from ".";

export default {
  component: TagSelector,
};

const categories = {
  いつ: ["午前中", "午後", "夜"],
  どこで: ["歯医者", "学校", "自宅", "映画館"],
  誰が: ["私", "友人", "家族"],
  何をした: ["虫歯の治療", "勉強", "映画鑑賞"],
  どうだった: ["楽しかった", "普通", "つまらなかった"],
};

// onSelect関数のダミー実装
const onSelect = (category, tag) => {
  console.log(`Selected: ${category} - ${tag}`);
};

export const Default = () => (
  <TagSelector categories={categories} onSelect={onSelect} />
);
