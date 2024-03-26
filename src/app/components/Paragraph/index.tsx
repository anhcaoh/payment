import { PropsWithChildren } from "react";

const Paragraph = ({ children }: PropsWithChildren) => {
  return <p className="leading-8">{children}</p>;
};
export default Paragraph;
