const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: string | JSX.Element;
}) => {
  return (
    <p className={["leading-8", className].join(" ").trim()}>{children}</p>
  );
};
export default Paragraph;
