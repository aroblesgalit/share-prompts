import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { uesrId, prompt, tag } = await req.json();

  try {
    await connectToDB();
  } catch (error) {

  }
}