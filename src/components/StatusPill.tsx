type StatusPillProps = {
  children: string;
  tone?: "private" | "public" | "demo";
};

export function StatusPill({ children, tone = "demo" }: StatusPillProps) {
  return <span className={`status-pill status-pill--${tone}`}>{children}</span>;
}
