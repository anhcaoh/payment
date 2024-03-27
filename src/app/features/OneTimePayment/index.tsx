"use client";
import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import Paragraph from "@/app/components/Paragraph";
import Radio from "@/app/components/Radio";
import Image from "next/image";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import fields from "./configs/fields.json";
import {
  ONE_TIME_PAYMENT_DESCRIPTION,
  ONE_TIME_PAYMENT_FIELDS_REQUIRED,
  ONE_TIME_PAYMENT_FORM,
  ONE_TIME_PAYMENT_HEADING,
  ONE_TIME_PAYMENT_MAKE_PAYMENT,
  ONE_TIME_PAYMENT_WHERE_CVV_NUMBER,
  ONE_TIME_PAYMENT_WHERE_ROUTING_ACCOUNT_NUMBER,
} from "./constants";

export type FormSchema = typeof fields | { [key: string]: string };

const OneTimePayment = () => {
  const { register, handleSubmit, watch, control } = useForm<FormSchema>({
    defaultValues: { typeOfChecking: "checking" },
  });
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  const FieldsRenderer = useMemo(
    () =>
      ({ fields, className }: { fields: any[]; className: string }) => {
        const renderAnyFields = (field: any) => {
          return (
            <>
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
            </>
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
                "flex flex-row gap-6",
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
      <div>
        <Heading>{ONE_TIME_PAYMENT_HEADING}</Heading>
        <Paragraph>{ONE_TIME_PAYMENT_DESCRIPTION}</Paragraph>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} name={ONE_TIME_PAYMENT_FORM}>
        <>
          <div className="sm:divide-x-0 lg:divide-x-2 border-2 border-gray-300 grid place-items-center lg:grid-cols-2 sm:grid-cols-1">
            <div className="sm:divide-y-0 lg:divide-y-2 divide-gray-300 flex flex-col min-w-[406px]">
              {Object.entries(groupedByFields)?.map((keyFields) => {
                const [key, fields] = keyFields as [string, {}[]];
                return (
                  <FieldsRenderer
                    key={key}
                    fields={fields}
                    className="px-2 py-4"
                  />
                );
              })}
            </div>
            <div className="flex items-end w-80">
              <div className="p-3 text-center">
                <Paragraph
                  className={[
                    "!leading-5 p-4 font-medium m-auto",
                    watch("typeOfChecking") === "checking" ? "w-60" : "",
                  ]
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
            <Button type="submit">{ONE_TIME_PAYMENT_MAKE_PAYMENT}</Button>
            <label className="p-1 text-label">
              {ONE_TIME_PAYMENT_FIELDS_REQUIRED}
            </label>
          </div>
        </>
      </Form>
    </>
  );
};
export default OneTimePayment;
