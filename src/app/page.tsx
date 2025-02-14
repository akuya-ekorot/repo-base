import { InputForm } from "@/components/custom/inputForm";
import { cookies } from "next/headers";

const Page = async () => {
  const resourceId = (await cookies()).get("resourceId");

  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-4">
      <InputForm />
    </main>
  );
};

export default Page;
