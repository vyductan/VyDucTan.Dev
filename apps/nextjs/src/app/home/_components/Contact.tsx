"use client";

import { sendMailSchema } from "@vyductan/api";
import { MailOutlined } from "@vyductan/icons";
import { AutoForm, Button } from "@vyductan/ui";

// import { MailIcon } from "@vyductan/icons";

import type { ResumeData } from "../resumeData";
import { api } from "~/trpc/react";

// import About from './About'

type ContactProps = {
  data: ResumeData["main"];
};
const Contact = ({ data }: ContactProps) => {
  if (!data) return <></>;
  const { name, address, phone, email, contactMessage } = data;

  const { mutate: sendEmail, isPending } = api.contact.send.useMutation();

  return (
    <section id="contact" className="text-white">
      <div className="container">
        <h1>
          <span className="lg:hidden">Get In Touch.</span>
          <MailOutlined className="hidden lg:block" />
        </h1>

        <div className="detail">
          <p>{contactMessage}</p>
          <AutoForm
            validationSchema={sendMailSchema}
            onSubmit={(values) => {
              sendEmail(values);
            }}
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
            ]}
          />
          <div className="flex justify-center">
            <Button
              htmlType="submit"
              className="submit"
              disabled={isPending}
              aria-label="Submit"
            >
              {isPending ? "Sending" : "Submit"}
            </Button>
          </div>
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
