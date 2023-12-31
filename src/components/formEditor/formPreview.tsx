"use client";

import { FormViewer } from "../formViewer/formViewer";
import { useState } from "react";
import { Form } from "@prisma/client";
import BrowserWindow from "../ui/browserWindow";
import { Checkbox } from "../ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  form: Form;
  noToolbar?: boolean;
};

type State = {
  refresh: boolean;
};

export default function FormPreview({ form, noToolbar }: Readonly<Props>) {
  const formViewLink = `${window.location.origin}/view/${form.id}`;

  const [state, setState] = useState<State>({
    refresh: false,
  });
  const { refresh } = state;

  const refreshPreview = () => {
    setState((cs) => ({ ...cs, refresh: !cs.refresh }));
  };

  const Toolbar = (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Checkbox id="savePreviewSubmission" checked />
            <label
              htmlFor="savePreviewSubmission"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save submissions in preview mode
            </label>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Cannot change in free plan</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <BrowserWindow
      onRefresh={refreshPreview}
      link={noToolbar || !form.isPublished ? undefined : formViewLink}
      toolbar={Toolbar}
    >
      <div className="flex flex-col justify-center items-center h-full">
        {form.isPublished ? (
          <FormViewer form={form} refresh={refresh} isPreview={false} />
        ) : (
          <p className="text-muted-foreground">
            Publish your form to see a preview
          </p>
        )}
      </div>
    </BrowserWindow>
  );
}
