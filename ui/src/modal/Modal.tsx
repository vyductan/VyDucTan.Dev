"use client";

import * as React from "react";

import type { DialogProps } from "./components";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components";

type ModalProps = DialogProps & {
  className?: string;
  children?: React.ReactNode;
  description?: React.ReactNode;
  footer?:
    | ((params: {
        originNode: React.ReactNode;
        extra: { OkBtn: React.FC; CancelBtn: React.FC };
      }) => React.ReactNode)
    | React.ReactNode;
  okText?: string;
  okLoading?: boolean;
  title?: React.ReactNode;
  trigger?: React.ReactNode;
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const Modal = ({
  className,
  children,
  description,
  footer,
  okText,
  okLoading,
  title,
  trigger,
  onOk,
  onCancel,
  onOpenChange,
  ...rest
}: ModalProps) => {
  const CancelBtn = () => (
    <DialogClose asChild onClick={onCancel}>
      <Button variant="outline">Cancel</Button>
    </DialogClose>
  );
  const OkBtn = () => (
    <Button loading={okLoading} onClick={onOk}>
      {okText ?? "Ok"}
    </Button>
  );
  const footerToRender = !footer ? (
    <>
      {CancelBtn}
      {OkBtn}
    </>
  ) : typeof footer === "function" ? (
    footer({ originNode: null, extra: { OkBtn, CancelBtn } })
  ) : (
    footer
  );
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        onOpenChange?.(isOpen);
        if (!isOpen) {
          onCancel?.();
        }
      }}
      {...rest}
    >
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className={className}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] px-5 [&>[data-radix-scroll-area-viewport]]:px-1">
          {children}
        </ScrollArea>

        <DialogFooter>{footerToRender}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export { Modal };

export { type ModalProps };
