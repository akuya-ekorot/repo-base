"use client";

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAction } from "next-safe-action/hooks";
import { validateRepositoryInput } from "@/actions/validateRepositoryInput";
import { useState } from "react";

const Page = () => {
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
    <main className="h-dvh flex flex-col items-center justify-center gap-4">
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
        className="max-w-lg"
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
    </main>
  );
};

export default Page;
