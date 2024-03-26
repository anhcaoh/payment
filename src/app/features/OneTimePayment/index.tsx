import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Paragraph from "@/app/components/Paragraph";
import Radio from "@/app/components/Radio";
import Text, { ITextInput } from "@/app/components/Text";
import {
  ONE_TIME_PAYMENT_DESCRIPTION,
  ONE_TIME_PAYMENT_FORM,
  ONE_TIME_PAYMENT_HEADING,
  ONE_TIME_PAYMENT_MAKE_PAY,
} from "./constants";

const OneTimePayment = () => {
  const fields = [
    {
      id: "loan-account-number",
      name: "loan-account-number",
      label: "Loan Account Number",
      placeholder: "Enter value",
      type: "text" as ITextInput["type"],
    },
    {
      id: "type-of-checking",
      name: "type-of-checking",
      label: "Type of Checking",
      type: "radio",
      values: [
        { name: "checking", label: "Checking", value: "checking" },
        { name: "debit-card", label: "Debit Card", value: "debit-card" },
      ],
    },
    {
      id: "routing-number",
      name: "routing-number",
      label: "Routing Number",
      placeholder: "Enter value",
      error: "Routing Number is required",
      schema: {
        required: true,
        message: "Routing Number is required",
      },
      type: "text" as ITextInput["type"],
    },
    {
      id: "bank-account-number",
      name: "bank-account-number",
      label: "Bank Account Number",
      placeholder: "Enter value",
      type: "text" as ITextInput["type"],
    },
    {
      id: "confirm-bank-account-number",
      name: "confirm-bank-account-number",
      label: "Confirm Bank Account Number",
      placeholder: "Enter value",
      type: "text" as ITextInput["type"],
    },
  ];
  const FieldsRenderer = ({ field }: { field: any }) => {
    return (
      <>
        {/* Text input/texarea */}
        {(field.type === "text" || field.type === "textarea") && (
          <Text {...field} />
        )}
        {/* Radio select */}
        {field.type === "radio" && <Radio {...field} />}
      </>
    );
  };

  return (
    <>
      <div>
        <Heading>{ONE_TIME_PAYMENT_HEADING}</Heading>
        <Paragraph>{ONE_TIME_PAYMENT_DESCRIPTION}</Paragraph>
      </div>
      <Form name={ONE_TIME_PAYMENT_FORM}>
        <>
          <div className="border-2 border-gray-300 p-4">
            {/* TODO render inputs */}
            <div className="flex flex-col gap-6 w-min">
              {fields?.map((field) => {
                return <FieldsRenderer key={field.id} field={field} />;
              })}
            </div>
          </div>
          <div>
            <Button>{ONE_TIME_PAYMENT_MAKE_PAY}</Button>
          </div>
        </>
      </Form>
    </>
  );
};
export default OneTimePayment;
