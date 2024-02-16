import React, { useState } from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ backgroundColor, size, label, ...props }) => {
  const [isPrimary, setIsPrimary] = useState(props.primary);

  const handleClick = () => {
    setIsPrimary(!isPrimary); // primary状態をトグル
    if (props.onClick) {
      props.onClick(); // propsで渡されたonClickハンドラがあれば実行
    }
  };

  const mode = isPrimary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={backgroundColor && { backgroundColor }}
      {...props}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  primary: false,
  backgroundColor: null,
  size: "medium",
  onClick: undefined,
};
