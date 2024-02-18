import { IconWithButton } from ".";
import { BiArrowToBottom } from "react-icons/bi";

export default {
  component: IconWithButton,
};

const Template = (args) => <IconWithButton {...args} />;
export const Default = Template.bind({});
Default.args = {
  text: "ボタン",
  onClick: () => alert("クリックされました"),
  Icon: BiArrowToBottom,
};
