import { Form } from "antd";
import { ResumeData } from "../config/resumeData";
import FormItem from "./@vyductan/components/FormItem";
import Input from "./@vyductan/components/Input";
import Icon from "./@vyductan/Icon";

type ContactProps = {
  data: ResumeData["main"];
};
const Contact = ({ data }: ContactProps) => {
  if (!data) return <></>;
  const { name, address, phone, email, contactMessage } = data;

  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData: { [key: string]: string | null } = {};
  //     Array.from(e.currentTarget.elements).forEach((field) => {
  //       const x = field as HTMLInputElement;
  //       if (!x.name) return;
  //       formData[x.name] = x.value;
  //     });
  //
  //     await fetch("/api/mail", {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //     });
  //   };
  const handleFinish = (values: any) => {
    console.log(values);
    // TODO
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
          <Form onFinish={handleFinish}>
            <FormItem label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </FormItem>
            <FormItem
              label="Email"
              name="email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Subject"
              name="subject"
              rules={[{ required: true }]}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter Message!" }]}
            >
              <textarea rows={15} name="message" />
            </FormItem>

            <div className="flex justify-center">
              <button type="submit" className="submit">
                Submit
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
