"use client";
import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Input, { IInput } from "@/app/components/Input";
import Paragraph from "@/app/components/Paragraph";
import Radio from "@/app/components/Radio";
import { SubmitHandler, useForm } from "react-hook-form";
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
      name: "loanAccountNumber",
      label: "Loan Account Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
    },
    {
      id: "type-of-checking",
      name: "typeOfChecking",
      label: "Type of Checking",
      type: "radio",
      values: [
        { name: "checking", label: "Checking" },
        { name: "debitCard", label: "Debit Card" },
      ],
    },
    // Checking
    {
      id: "routing-number",
      name: "routingNumber",
      label: "Routing Number",
      placeholder: "Enter value",
      error: "Routing Number is required",
      schema: {
        required: true,
        message: "Routing Number is required",
      },
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:debitCard",
    },
    {
      id: "bank-account-number",
      name: "bankAccountNumber",
      label: "Bank Account Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:debitCard",
    },
    {
      id: "confirm-bank-account-number",
      name: "confirmBankAccountNumber",
      label: "Confirm Bank Account Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:debitCard",
    },

    // Debit Card
    {
      id: "card-number",
      name: "cardNumber",
      label: "Card Number",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:checking",
    },
    {
      id: "name-on-card",
      name: "nameOnCard",
      label: "Name On Card",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:checking",
    },
    {
      id: "expiration-date",
      name: "expirationDate",
      label: "Expiration Date",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:checking",
    },
    {
      id: "cvv",
      name: "cvv",
      label: "CVV",
      placeholder: "Enter value",
      type: "number" as IInput["type"],
      hidden: "typeOfChecking:checking",
    },
  ];
  type FormSchema = typeof fields | { [key: string]: string };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: { typeOfChecking: "checking" },
  });
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  const FieldsRenderer = ({ field }: { field: any }) => {
    return (
      <>
        {/* Input text/texarea/number */}
        {(field.type === "text" ||
          field.type === "textarea" ||
          field.type === "number") && <Input {...field} register={register} />}
        {/* Radio select */}
        {field.type === "radio" && <Radio {...field} register={register} />}
      </>
    );
  };

  return (
    <>
      <div>
        <Heading>{ONE_TIME_PAYMENT_HEADING}</Heading>
        <Paragraph>{ONE_TIME_PAYMENT_DESCRIPTION}</Paragraph>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} name={ONE_TIME_PAYMENT_FORM}>
        <>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex flex-col gap-6 w-min">
              {fields?.map((field) => {
                const hiddenOnCondition = field.hidden?.split(":");
                const [key, value] = hiddenOnCondition || [];
                const values = watch();
                const isHidden =
                  hiddenOnCondition &&
                  values &&
                  (values as { [key: string]: string })[key] === value;
                return isHidden ? null : (
                  <FieldsRenderer key={field.id} field={field} />
                );
              })}
            </div>
          </div>
          <div>
            <Button type="submit">{ONE_TIME_PAYMENT_MAKE_PAY}</Button>
          </div>
        </>
      </Form>
    </>
  );
};
export default OneTimePayment;
