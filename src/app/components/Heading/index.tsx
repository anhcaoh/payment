import { PropsWithChildren } from "react";

const Heading = ({ children }: PropsWithChildren) => {
  return <h2 className="font-bold text-heading">{children}</h2>;
};
export default Heading;
