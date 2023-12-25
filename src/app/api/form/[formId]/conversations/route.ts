import { db } from "@/lib/db";
import { sendErrorResponse } from "@/lib/errorHandlers";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

const routeContextSchema = z.object({
  params: z.object({
    formId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const user = await getCurrentUser();
    const form = await db.form.findFirst({
      where: {
        id: params.formId,
        userId: user.id,
      },
      include: {
        conversation: true,
      },
    });
    const conversations = form?.conversation;
    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return sendErrorResponse(error);
  }
}
