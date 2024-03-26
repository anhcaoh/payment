import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Input, { IInput } from "@/app/components/Input";
import Paragraph from "@/app/components/Paragraph";
import Radio from "@/app/components/Radio";
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
      type: "text" as IInput["type"],
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
    // Checking
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
      type: "text" as IInput["type"],
    },
    {
      id: "bank-account-number",
      name: "bank-account-number",
      label: "Bank Account Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
    },
    {
      id: "confirm-bank-account-number",
      name: "confirm-bank-account-number",
      label: "Confirm Bank Account Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
    },

    // Debit Card
    {
      id: "card-number",
      name: "card-number",
      label: "Card Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
    },
    {
      id: "name-on-card",
      name: "name-on-card",
      label: "Name On Card",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
    },
    {
      id: "expiration-date",
      name: "expiration-date",
      label: "Expiration Date",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
    },
    {
      id: "cvv-number",
      name: "cvv-number",
      label: "CVV",
      placeholder: "Enter value",
      type: "number" as IInput["type"],
    },
  ];
  const FieldsRenderer = ({ field }: { field: any }) => {
    return (
      <>
        {/* Input text/texarea/number */}
        {(field.type === "text" ||
          field.type === "textarea" ||
          field.type === "number") && <Input {...field} />}
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
