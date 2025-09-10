export interface IRadio {
  label: string;
  id: string;
  name: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
}
