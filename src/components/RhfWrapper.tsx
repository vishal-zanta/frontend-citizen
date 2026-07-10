import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface RhfWrapperProps {
  children: React.ReactNode;
  initialValues?: any;
  onSubmit: (data: any, methods: UseFormReturn<any>) => void;
  onError?: (err: any, values: any, methods: UseFormReturn<any>) => void;
  isValidation?: boolean;
  validationSchema?: any;
  className?: string;
  schemaKey?: any;
  resetForm?: any;
  validationOn?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
}

const RhfWrapper: React.FC<RhfWrapperProps> = ({
  children,
  initialValues,
  onSubmit,
  onError,
  isValidation,
  validationSchema,
  className,
  schemaKey,
  resetForm,
  validationOn = "onChange",
}) => {
  // Create resolver that updates when validationSchema changes
  const resolver = useMemo(() => {
    if (!isValidation || !validationSchema) return undefined;
    return zodResolver(validationSchema);
  }, [isValidation, validationSchema]);

  const defaultValues = useMemo(
    () => initialValues || {},
    [JSON.stringify(initialValues)],
  );

  const methods = useForm({
    defaultValues: defaultValues,
    resolver,
    mode: validationOn,
  });

  // Reset form with initial values when they change
  useEffect(() => {
    console.log("RESET", { initialValues });
    methods.reset(initialValues, { keepDefaultValues: false });
  }, [JSON.stringify(initialValues), resetForm]);

  // Only clear errors when validation schema changes (don't trigger validation)
  useEffect(() => {
    if (isValidation && validationSchema) {
      // Clear all errors when schema changes so old errors don't persist
      methods.clearErrors();
    }
  }, [validationSchema, schemaKey]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          (data) => onSubmit(data, methods),
          (err) => onError?.(err, methods.getValues(), methods),
        )}
        id="rhf-form"
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default RhfWrapper;