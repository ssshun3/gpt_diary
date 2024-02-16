export const Tag = ({ onClick, label }) => {
  return (
    <button label={label} onClick={onClick}>
      {label}
    </button>
  );
};
