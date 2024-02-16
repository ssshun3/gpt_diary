import { Tag } from ".";

export default {
  component: Tag,
};

export const Default = {
  args: {
    onClick: () => console.log("clicked"),
    label: "午前中",
  },
};
