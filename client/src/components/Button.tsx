type PropTypes = {
  className: string;
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
};

export default function Button({
  className,
  type,
  children,
  onClick,
  disabled,
}: PropTypes) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
