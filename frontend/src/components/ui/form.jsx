import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

const FormField = ({ name, ...props }) => {
  return (
    <Controller
      name={name}
      {...props}
    />
  );
};

const FormItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
);

FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <Label
        ref={ref}
        className={cn(
          error && "text-destructive",
          className
        )}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} />
  )
);

FormControl.displayName = "FormControl";

function FormMessage({ className, children, ...props }) {
  const { error } = useFormField();

  const body = error?.message || children;

  if (!body) return null;

  return (
    <p
      className={cn(
        "text-sm font-medium text-destructive",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
}

function useFormField() {
  const { getFieldState, formState } = useFormContext();

  const fieldContext = React.useContext(FormFieldContext);

  if (!fieldContext) {
    throw new Error(
      "useFormField must be used inside FormField"
    );
  }

  const fieldState = getFieldState(
    fieldContext.name,
    formState
  );

  return {
    name: fieldContext.name,
    ...fieldState,
  };
}

const FormFieldContext = React.createContext({});

export {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};