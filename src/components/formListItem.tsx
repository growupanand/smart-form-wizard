"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/fetch";
import { Form } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ExternalLink,
  Loader2,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type Props = {
  form: Form;
  onDeleted: (form: Form) => void;
};

type State = {
  isDeleting: boolean;
};

export function FormListItem({ form, onDeleted }: Readonly<Props>) {
  const [state, setState] = useState<State>({ isDeleting: false });
  const { isDeleting } = state;

  const deleteForm = async () => {
    setState((cs) => ({ ...cs, isDeleting: true }));
    try {
      await apiClient(`form/${form.id}`, {
        method: "DELETE",
      });
      toast({
        action: (
          <div className="w-full">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 rounded-full p-1">
                <Check className="text-white " />
              </div>
              <span>Form deleted</span>
            </div>
          </div>
        ),
        duration: 1500,
      });
      onDeleted(form);
    } catch (error) {
      toast({
        title: "Unable to delete form",
        duration: 1500,
        action: (
          <Button
            variant="secondary"
            disabled={isDeleting}
            onClick={deleteForm}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Retry"
            )}
          </Button>
        ),
      });
    } finally {
      setState((cs) => ({ ...cs, isDeleting: false }));
    }
  };

  return (
    <div className="py-1 flex justify-between items-center hover:bg-gray-50 hover:ps-3 transition-all">
      <div className="grow">
        <Link href={`/forms/${form.id}`}>
          <Button
            variant="link"
            className="w-full hover:no-underline justify-start font-normal  ps-0 "
          >
            {form.name}
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="max-lg:hidden">
          {form.isPublished ? (
            <Link href={`/view/${form.id}`} target="_blank">
              <Button variant="link">
                View form <ExternalLink className="w-4 h-4 ms-2" />
              </Button>
            </Link>
          ) : (
            <Button variant="link" disabled>
              Not published
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isDeleting}>
            <Button
              variant="link"
              size="icon"
              className="h-8 w-8 hover:no-underline"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreVertical className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {form.isPublished ? (
              <Link href={`/view/${form.id}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer lg:hidden">
                  <ExternalLink className="w-4 h-4 mr-2" /> View form
                </DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuLabel className="text-muted-foreground font-normal lg:hidden">
                Not published
              </DropdownMenuLabel>
            )}
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={deleteForm}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete form
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
