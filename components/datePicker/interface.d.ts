interface DatePickerProps {
  value?: Dayjs;
  defaultValue?: Dayjs;
  onChange?: (date: Dayjs, formattedDate: string) => void;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  disabledDate?: (date: Dayjs) => boolean;
  showTime?: boolean;
  className?: string;
}
