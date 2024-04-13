import { AlertModal } from "@acme/ui/alert-modal";
import { Button } from "@acme/ui/button";
import { DeleteIcon } from "@acme/ui/icons";
import { message } from "@acme/ui/toast";

import { api } from "~/trpc/react";

export function DeleteTask({ id }: { id: string }) {
  const deleteWord = api.english.delete.useMutation({
    onSuccess: async () => {
      message.success("Deleted");
      // setCurrentRow(undefined);
      // setDeleteModalOpen(false);
      // await utils.english.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return (
    <AlertModal
      // open={deleteModalOpen}
      // onOpenChange={setDeleteModalOpen}
      title="Confirm delete"
      description="Are you sure you want to delete this word?"
      okLoading={deleteWord.isPending}
      onConfirm={() => {
        deleteWord.mutate(id);
      }}
      trigger={<Button danger variant="outline" icon={<DeleteIcon />} />}
    />
  );
}
