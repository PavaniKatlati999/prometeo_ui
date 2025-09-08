export interface CountDownUIProps {
  targetDate: Date | string | number;
  onFinish?: () => void;
  className?: string;
}
