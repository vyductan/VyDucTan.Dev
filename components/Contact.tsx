import { Form, notification } from "antd";
import { useState } from "react";
import { ResumeData } from "../config/resumeData";
import Input from "./@vyductan/components/Input";
import TextArea from "./@vyductan/components/TextArea";
import { Icon } from "./@vyductan/icons";

type ContactProps = {
  data: ResumeData["main"];
};
const Contact = ({ data }: ContactProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  if (!data) return <></>;
  const { name, address, phone, email, contactMessage } = data;

  const handleFinish = async (values: any) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/sendmail", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const r = await res.json();
      if (r.success) {
        notification.success({
          message: "Success! Thanks for your contact.",
          placement: "bottomRight",
        });
      } else {
        throw "ERROR";
      }
    } catch (error) {
      notification.error({
        message: "Error!",
        placement: "bottomRight",
      });
    } finally {
      setSubmitting(false);
      form.resetFields();
    }
  };
  return (
    <section id="contact">
      <div className="container">
        <h1>
          <span className="lg:hidden">Get In Touch.</span>
          <Icon name="Mail" className="hidden lg:block" />
        </h1>

        <div className="detail">
          <p>{contactMessage}</p>
          <Form form={form} onFinish={handleFinish}>
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
                disabled={submitting}
                aria-label="Submit"
              >
                {submitting ? "Sending" : "Submit"}
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
