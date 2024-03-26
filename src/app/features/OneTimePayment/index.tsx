import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Paragraph from "@/app/components/Paragraph";
import {
  ONE_TIME_PAYMENT_DESCRIPTION,
  ONE_TIME_PAYMENT_FORM,
  ONE_TIME_PAYMENT_HEADING,
} from "./constants";

const OneTimePayment = () => {
  return (
    <>
      <div>
        <Heading>{ONE_TIME_PAYMENT_HEADING}</Heading>
        <Paragraph>{ONE_TIME_PAYMENT_DESCRIPTION}</Paragraph>
      </div>
      <Form name={ONE_TIME_PAYMENT_FORM}>
        <div className="border-2 border-gray-200 p-4">
          {/* TODO render inputs */}
        </div>
      </Form>
    </>
  );
};
export default OneTimePayment;
