"use client";
import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import Paragraph from "@/app/components/Paragraph";
import Radio from "@/app/components/Radio";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import fields from "./configs/fields.json";
import {
  ONE_TIME_PAYMENT_DESCRIPTION,
  ONE_TIME_PAYMENT_FIELDS_REQUIRED,
  ONE_TIME_PAYMENT_FORM,
  ONE_TIME_PAYMENT_HEADING,
  ONE_TIME_PAYMENT_MADE_CONFIRMATION,
  ONE_TIME_PAYMENT_MAKE_PAYMENT,
  ONE_TIME_PAYMENT_WHERE_CVV_NUMBER,
  ONE_TIME_PAYMENT_WHERE_ROUTING_ACCOUNT_NUMBER,
} from "./constants";

export type FormSchema = typeof fields | { [key: string]: string };

const OneTimePayment = () => {
  const [paymentMade, setPaymentMade] = useState<{
    message: string;
    confirmation: string;
  } | null>(null);
  const [paymentError, setPaymentError] = useState<{
    message: string;
  } | null>(null);
  const { register, handleSubmit, watch, control } = useForm<FormSchema>({
    defaultValues: { typeOfChecking: "checking" },
  });
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          const error = await response.json();
          setPaymentError(error);
        }
      })
      .then((paymentMade) => {
        setPaymentMade(paymentMade);
      })
      .catch((error) => {
        setPaymentError(error);
      });
  };

  const FieldsRenderer = useMemo(
    () =>
      ({ fields, className }: { fields: any[]; className: string }) => {
        const renderAnyFields = (field: any) => {
          return (
            <Fragment key={field.id}>
              {/* Input text/texarea/number */}
              {(field.type === "text" ||
                field.type === "textarea" ||
                field.type === "number") && (
                <Input
                  {...field}
                  control={control}
                  register={register}
                  className={className}
                />
              )}
              {/* Radio select */}
              {field.type === "radio" && (
                <Radio
                  {...field}
                  control={control}
                  register={register}
                  className={className}
                />
              )}
            </Fragment>
          );
        };
        const isHiddenField = (field: { hidden: string }) => {
          const hiddenOnCondition = field.hidden?.split(":");
          const [key, value] = hiddenOnCondition || [];
          const values = watch();
          const isHidden =
            hiddenOnCondition &&
            values &&
            (values as { [key: string]: string })[key] === value;
          return isHidden;
        };
        if (fields?.length === 1) {
          return fields?.map((field) => {
            return isHiddenField(field) ? null : renderAnyFields(field);
          });
        } else {
          const maybeHiddenField = isHiddenField(fields[0]);
          return (
            <div
              className={[
                "flex flex-row gap-4",
                maybeHiddenField ? "hidden" : "",
              ]
                .join(" ")
                .trim()}
            >
              {fields?.map((field) => {
                return isHiddenField(field) ? null : renderAnyFields(field);
              })}
            </div>
          );
        }
      },
    []
  );
  const groupedByFields = Object.groupBy(
    fields,
    ({ group, name }) => group || name
  );
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} name={ONE_TIME_PAYMENT_FORM}>
        <>
          <div className="mb-4">
            <Heading>{ONE_TIME_PAYMENT_HEADING}</Heading>
            <Paragraph>{ONE_TIME_PAYMENT_DESCRIPTION}</Paragraph>
          </div>
          <div className="sm:divide-x-0 lg:divide-x-2 dark:divide-slate-800 dark:border-slate-800 border-2 border-gray-300 grid place-items-center lg:grid-cols-2 sm:grid-cols-1">
            <div className="sm:divide-y-0 lg:divide-y-2 divide-gray-300 dark:divide-slate-800 flex flex-col min-w-[430px]">
              {Object.entries(groupedByFields)?.map((keyFields) => {
                const [key, fields] = keyFields as [string, {}[]];
                return (
                  <FieldsRenderer
                    key={key}
                    fields={fields}
                    className="px-2 pt-2 pb-4"
                  />
                );
              })}
            </div>
            <div className="flex items-end w-[332px]">
              <div className="p-3 text-center">
                <Paragraph
                  className={["!leading-5 p-4 font-medium m-auto"]
                    .join(" ")
                    .trim()}
                >
                  {watch("typeOfChecking") === "checking"
                    ? ONE_TIME_PAYMENT_WHERE_ROUTING_ACCOUNT_NUMBER
                    : ONE_TIME_PAYMENT_WHERE_CVV_NUMBER}
                </Paragraph>
                <Image
                  alt="helper"
                  className={
                    watch("typeOfChecking") === "checking" ? "-ml-4" : ""
                  }
                  src={
                    watch("typeOfChecking") === "checking"
                      ? "/images/check.png"
                      : "/images/cvv.png"
                  }
                  width={306}
                  height={163}
                />
              </div>
            </div>
          </div>

          <div className="py-4 flex gap-2 items-center">
            <Button
              type="submit"
              disabled={paymentMade && !paymentError ? true : false}
            >
              {ONE_TIME_PAYMENT_MAKE_PAYMENT}
            </Button>
            <label className="p-1 text-label">
              {ONE_TIME_PAYMENT_FIELDS_REQUIRED}
            </label>
          </div>
          {paymentError ? (
            <div className="w-full text-center text-lg text-red-500">
              <Paragraph>{paymentError?.message}</Paragraph>
            </div>
          ) : null}
          {paymentMade ? (
            <div className="w-full text-center text-2xl text-green-500">
              <Paragraph>{paymentMade?.message}</Paragraph>
              <Paragraph>
                <>
                  {ONE_TIME_PAYMENT_MADE_CONFIRMATION}:{" "}
                  {paymentMade?.confirmation}
                </>
              </Paragraph>
            </div>
          ) : null}
        </>
      </Form>
    </>
  );
};
export default OneTimePayment;
