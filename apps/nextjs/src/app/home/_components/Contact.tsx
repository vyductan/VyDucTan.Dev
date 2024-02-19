"use client";

import { useState } from "react";

import { sendMailAction } from "@vyductan/api/contact";
import { sendMailSchema } from "@vyductan/api/types";
import { MailOutlined } from "@vyductan/icons";
import { AutoForm, Button, message, useForm } from "@vyductan/ui";

import type { ResumeData } from "../resumeData";

type ContactProps = {
  data: ResumeData["main"];
};
const Contact = ({ data }: ContactProps) => {
  const [isPending, setIsPending] = useState(false);
  const { name, address, phone, email, contactMessage } = data;

  const form = useForm({
    schema: sendMailSchema,
    onSubmit: (values) => {
      setIsPending(true);
      sendMailAction(values)
        .then(() => {
          message.success("Successfully sent your message.");
        })
        .catch((error) => {
          message.error((error as Error).message);
        })
        .finally(() => {
          setIsPending(false);
        });
    },
  });

  if (!data) return <></>;

  return (
    <section id="contact">
      <div className="container">
        <h1>
          <span className="lg:hidden">Get In Touch.</span>
          <MailOutlined className="hidden lg:block" />
        </h1>

        <div className="detail">
          <p>{contactMessage}</p>
          <AutoForm
            form={form}
            fields={[
              {
                type: "text",
                name: "name",
                label: "Name",
              },
              {
                type: "text",
                name: "email",
                label: "Email",
              },
              {
                type: "text",
                name: "subject",
                label: "Subject",
              },
              {
                type: "textarea",
                name: "message",
                label: "Message",
                rows: 15,
              },
              {
                type: "custom",
                render: () => (
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="submit"
                      disabled={isPending}
                      aria-label="Submit"
                    >
                      {isPending ? "Sending" : "Submit"}
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <aside>
          <h1>Address and Phone</h1>
          <p>
            {name}
            <br />
            {email}
            <br />
            <br />
            {address.street} <br />
            {address.city}, {address.state} {address.zip}
            <br />
            <span>{phone}</span>
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
