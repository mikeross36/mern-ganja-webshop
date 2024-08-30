type PropsType = {
  type: string;
  name: string;
  id?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  placeHolder?: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  disabled?: boolean;
};

export default function Input({
  type,
  name,
  autoComplete,
  minLength,
  maxLength,
  placeHolder,
  value,
  onChange,
  required,
  disabled,
}: PropsType) {
  return (
    <input
      type={type}
      id={name}
      autoComplete={autoComplete}
      placeholder={placeHolder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="form__input"
    />
  );
}
