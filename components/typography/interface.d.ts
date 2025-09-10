export interface TypographyUIProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "paragraph"
    | "caption"
    | "quote"
    | "code";
  children: React.ReactNode;
  className?: string;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  italic?: boolean;
  underline?: boolean;
  strong?: boolean;
}
