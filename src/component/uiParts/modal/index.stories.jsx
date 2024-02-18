// ConfirmModal.stories.js
import React from "react";
import { ConfirmModal } from "./"; // ConfirmModal コンポーネントのパスを適切に設定

export default {
  component: ConfirmModal,
};

const Template = (args) => <ConfirmModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => console.log("Close modal"),
  onConfirm: () => console.log("Confirm delete"),
  diaryId: "diary123",
};
