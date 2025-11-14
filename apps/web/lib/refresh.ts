"use server";

import { revalidateTag } from "next/cache";

export const refresh = async (tag: string) => {
  revalidateTag(tag, "max");
};
