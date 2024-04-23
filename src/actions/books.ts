"use server"

import { UploadBookState } from "@/features/upload/uploadBookSlice";
import axios from "axios";
import { cookies } from "next/headers";

export async function sendBook(data: UploadBookState): Promise<any | null> {
  const cookie = cookies().get(`sb-mprijckxtmpmgedyhhaj-auth-token`);

  if (cookie) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      headers: {
        Authorization: JSON.parse(cookie.value!).access_token,
      },
      data,
    });

    return res.data;
  }
}
