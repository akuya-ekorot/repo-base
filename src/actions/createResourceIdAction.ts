"use server";

import { cookies } from "next/headers";
import { actionClient } from ".";
import { revalidatePath } from "next/cache";

export const createResourceId = actionClient
  .metadata({ actionName: "createResourceId" })
  .action(async () => {
    const cookieStore = await cookies();

    cookieStore.set("resourceId", crypto.randomUUID());

    revalidatePath("/");
  });
