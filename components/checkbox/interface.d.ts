interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

interface Option {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  defaultValue?: (string | number)[];
  disabled?: boolean;
  name?: string;
  options?: Array<string | number | Option>;
  value?: (string | number)[];
  onChange?: (checkedValue: (string | number)[]) => void;
}
