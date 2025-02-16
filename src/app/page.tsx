import { InputForm } from "@/components/custom/inputForm";
import { SuggestedRepo } from "@/components/custom/SuggestedRepo";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Repo Base
          </h1>
          <p className="text-lg text-muted-foreground">
            Chat with any GitHub repository. Understand code faster.
          </p>
        </div>

        <div className="bg-background p-6">
          <div className="flex flex-col items-center gap-6">
            <InputForm />
            <p className="text-sm text-muted-foreground px-1 text-center w-full max-w-[60ch]">
              Accepts either the full GitHub repository URL
              (https://github.com/facebook/react) or the shorthand
              (facebook/react) format.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Popular Repositories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SuggestedRepo
              owner="mastra-ai"
              repo="mastra"
              description="Open-source AI assistant framework"
            />
            <SuggestedRepo
              owner="assistant-ui"
              repo="assistant-ui"
              description="Open-source UI components for AI assistants"
            />
            <SuggestedRepo
              owner="vercel"
              repo="next.js"
              description="The React Framework for the Web"
            />
            <SuggestedRepo
              owner="facebook"
              repo="react"
              description="The library for web and native user interfaces"
            />
            <SuggestedRepo
              owner="tailwindlabs"
              repo="tailwindcss"
              description="A utility-first CSS framework"
            />
            <SuggestedRepo
              owner="shadcn"
              repo="ui"
              description="Beautifully designed components"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
