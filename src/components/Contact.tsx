"use client";
import Input from "@vyductan/components/Input";
import TextArea from "@vyductan/components/TextArea";
import { MailIcon } from "@vyductan/icons";
import { Form
  // , notification
} from "antd";

// import { useState } from "react";
import { type ResumeData } from "../config/resumeData";

type ContactProps = {
  data: ResumeData["main"];
};
const Contact = ({ data }: ContactProps) => {
  // const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  if (!data) return <></>;
  const { name, address, phone, email, contactMessage } = data;

  // const handleFinish = (values: unknown) => {
  //   try {
  //     setSubmitting(true);
  //     const res = await fetch("/api/sendmail", {
  //       method: "POST",
  //       body: JSON.stringify(values),
  //     });
  //     const r = await res.json() as {success: boolean};
  //     if (r.success) {
  //       notification.success({
  //         message: "Success! Thanks for your contact.",
  //         placement: "bottomRight",
  //       });
  //     } else {
  //       throw "ERROR";
  //     }
  //   } catch (error) {
  //     notification.error({
  //       message: "Error!",
  //       placement: "bottomRight",
  //     });
  //   } finally {
  //     setSubmitting(false);
  //     form.resetFields();
  //   }
  // };

  return (
    <section id="contact">
      <div className="container">
        <h1>
          <span className="lg:hidden">Get In Touch.</span>
          <MailIcon className="hidden lg:block" />
        </h1>

        <div className="detail">
          <p>{contactMessage}</p>
          <Form form={form} 
            // onFinish={async (values) => {await handleFinish(values)}}
          >
            <Input label="Name" name="name" rules={[{ required: true }]} />
            <Input
              label="Email"
              name="email"
              rules={[{ required: true }, { type: "email" }]}
            />
            <Input
              label="Subject"
              name="subject"
              rules={[{ required: true }]}
            />
            <TextArea
              rows={15}
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter Message!" }]}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="submit"
                // disabled={submitting}
                aria-label="Submit"
              >
                {/* {submitting ? "Sending" : "Submit"} */}
              </button>
            </div>
          </Form>
        </div>

        <aside>
          <h1>Address and Phone</h1>
          <p className="address">
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
