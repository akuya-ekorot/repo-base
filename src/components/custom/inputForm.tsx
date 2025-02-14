"use client";

import { validateRepositoryInput } from "@/actions/validateRepositoryInput";
import { useAction } from "next-safe-action/hooks";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export const InputForm: FC = () => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { execute } = useAction(validateRepositoryInput, {
    onError: ({ error }) => {
      if (error.serverError) {
        setErrorMessage(error.serverError);
      } else if (
        error.validationErrors?.input?._errors &&
        error.validationErrors.input._errors.length > 0
      ) {
        setErrorMessage(error.validationErrors.input._errors[0]);
      } else if (
        error.validationErrors?._errors &&
        error.validationErrors._errors.length > 0
      ) {
        setErrorMessage(error.validationErrors._errors[0]);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    },
    onSuccess: () => setErrorMessage(null),
  });

  const handleSubmit = () => execute({ input });

  return (
    <>
      <form
        className="w-full max-w-lg flex items-center gap-4"
        action={handleSubmit}
      >
        <div className="space-y-3 w-full">
          <Input
            id="input"
            name="input"
            placeholder="facebook/react"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <Button type="submit">import repository</Button>
      </form>

      <Alert
        variant={errorMessage ? "destructive" : "default"}
        className={cn("max-w-lg transition-transform")}
      >
        <AlertCircle className="size-4" />
        <AlertTitle className="font-semibold mt-1 mb-2">
          Input format
        </AlertTitle>
        <AlertDescription>
          Accepts either the full GitHub repository URL
          <span className="font-semibold">
            {" (https://github.com/facebook/react) "}
          </span>
          or the shorthand
          <span className="font-semibold">{" (facebook/react) "}</span> format.
          {errorMessage && (
            <>
              <br />
              <br />
              <span className="font-semibold">Error:</span> {errorMessage}
            </>
          )}
        </AlertDescription>
      </Alert>
    </>
  );
};
