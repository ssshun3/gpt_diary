import React, { useState } from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ size, label, primary, onClick }) => {
  const [isPrimary, setIsPrimary] = useState(primary);

  const handleClick = () => {
    setIsPrimary(!isPrimary);
    if (onClick) {
      onClick();
    }
  };

  const mode = isPrimary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  const buttonProps = { size, label, onClick };

  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      {...buttonProps}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  primary: false,
  size: "medium",
  onClick: undefined,
};
