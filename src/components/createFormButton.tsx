"use client";

import { Button } from "@/components/ui/button";
import { sendErrorResponseToast, toast } from "@/components/ui/use-toast";
import { createFormController } from "@/lib/controllers/form";
import { formCreateSchema } from "@/lib/validations/form";
import { Workspace } from "@prisma/client";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  workspace: Workspace;
};

type State = {
  isLoading: boolean;
};

export default function CreateFormButton({ workspace }: Props) {
  const [state, setState] = useState<State>({ isLoading: false });
  const { isLoading } = state;

  const router = useRouter();

  const createForm = async () => {
    setState((cs) => ({ ...cs, isLoading: true }));
    try {
      const newFormData = formCreateSchema.parse({
        name: "New form",
        welcomeScreenTitle: "",
        welcomeScreenMessage: "",
        welcomeScreenCTALabel: "",
        overview: "",
        aboutCompany: "",
        formField: [
          {
            fieldName: "",
          },
        ],
      });
      const createdForm = await createFormController(workspace.id, newFormData);
      toast({
        title: "Form created",
        duration: 1500,
      });
      router.push(`/forms/${createdForm.id}`);
    } catch (error: any) {
      await sendErrorResponseToast(error, "Unable to create form");
      setState((cs) => ({ ...cs, isLoading: false }));
    }
  };

  return (
    <Button
      variant="secondary"
      disabled={isLoading}
      onClick={createForm}
      className="font-semibold"
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && <Plus className="mr-2 h-4 w-4" />}
      New Form
    </Button>
  );
}
