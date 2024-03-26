"use client";
import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Input, { IInput } from "@/app/components/Input";
import Paragraph from "@/app/components/Paragraph";
import Radio from "@/app/components/Radio";
import { useMemo } from "react";
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
      type: "number" as IInput["type"],
      schema: {
        required: "Loan Account Number is required",
      },
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
      type: "number" as IInput["type"],
      minLength: 9,
      maxLength: 9,
      schema: {
        required: "Routing Number is required",
      },
      hidden: "typeOfChecking:debitCard",
    },
    {
      id: "bank-account-number",
      name: "bankAccountNumber",
      label: "Bank Account Number",
      placeholder: "Enter value",
      type: "number" as IInput["type"],
      minLength: 9,
      maxLength: 12,
      schema: {
        required: "Bank Account Number is required",
      },
      hidden: "typeOfChecking:debitCard",
    },
    {
      id: "confirm-bank-account-number",
      name: "confirmBankAccountNumber",
      label: "Confirm Bank Account Number",
      placeholder: "Enter value",
      type: "number" as IInput["type"],
      minLength: 9,
      maxLength: 12,
      schema: {
        required: "Confirm Bank Account Number is required",
      },
      hidden: "typeOfChecking:debitCard",
    },

    // Debit Card
    {
      id: "card-number",
      name: "cardNumber",
      label: "Card Number",
      placeholder: "Enter value",
      type: "number" as IInput["type"],
      schema: {
        required: "Card Number is required",
      },
      hidden: "typeOfChecking:checking",
    },
    {
      id: "name-on-card",
      name: "nameOnCard",
      label: "Name On Card",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:checking",
      schema: {
        required: "Card Number is required",
      },
    },
    {
      id: "expiration-date",
      name: "expirationDate",
      label: "Expiration Date",
      placeholder: "Enter value",
      type: "text" as IInput["type"],
      hidden: "typeOfChecking:checking",
      schema: {
        required: "Expiration Date is required",
      },
      group: "exp-cvv",
    },
    {
      id: "cvv",
      name: "cvv",
      label: "CVV",
      placeholder: "Enter value",
      minLength: 3,
      maxLength: 3,
      type: "number" as IInput["type"],
      hidden: "typeOfChecking:checking",
      schema: {
        required: "CVV number is required",
      },
      group: "exp-cvv",
    },
  ];
  type FormSchema = typeof fields | { [key: string]: string };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: { typeOfChecking: "checking" },
  });
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  const FieldsRenderer = useMemo(
    () =>
      ({ field }: { field: any }) => {
        const hiddenOnCondition = field.hidden?.split(":");
        const [key, value] = hiddenOnCondition || [];
        const values = watch();
        const isHidden =
          hiddenOnCondition &&
          values &&
          (values as { [key: string]: string })[key] === value;
        return isHidden ? null : (
          <>
            {/* Input text/texarea/number */}
            {(field.type === "text" ||
              field.type === "textarea" ||
              field.type === "number") && (
              <Input {...field} control={control} register={register} />
            )}
            {/* Radio select */}
            {field.type === "radio" && (
              <Radio {...field} control={control} register={register} />
            )}
          </>
        );
      },
    []
  );

  return (
    <>
      <div>
        <Heading>{ONE_TIME_PAYMENT_HEADING}</Heading>
        <Paragraph>{ONE_TIME_PAYMENT_DESCRIPTION}</Paragraph>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} name={ONE_TIME_PAYMENT_FORM}>
        <>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex flex-col gap-6">
              {fields?.map((field) => (
                <FieldsRenderer key={field.id} field={field} />
              ))}
            </div>
          </div>
          <div className="py-4">
            <Button type="submit">{ONE_TIME_PAYMENT_MAKE_PAY}</Button>
          </div>
        </>
      </Form>
    </>
  );
};
export default OneTimePayment;
