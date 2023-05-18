'use client'
import { MailIcon } from '@vyductan/icons'
import { Form, Input, TextArea, useServerAction } from '@vyductan/react'

import { sendMailAction } from '../_action'
import { SendMailSchema } from '../_schema'
import { type ResumeData } from '../resumeData'
// import About from './About'

type ContactProps = {
  data: ResumeData['main']
}
const Contact = ({ data }: ContactProps) => {
  const {
    mutate: sendMail,
    loading,
    formErrors,
  } = useServerAction(sendMailAction)

  if (!data) return <></>
  const { name, address, phone, email, contactMessage } = data

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
  // placement: "bottomRight",
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
  //

  // async function handleSubmit(d: FormData) {
  //   'use server'
  //   // ...
  //   const x = d.values()
  //   const y = d.entries()
  //
  //   // SendMailSchema.parse(d)
  //   // console.log(d instanceof FormData, '????')
  //   // SendMailSchema.parse(Object.fromEntries(d))
  //   // sendMail(d)
  //   return 'hoi'
  // }

  return (
    <section
      id='contact'
      className='text-white'
    >
      <div className='container'>
        <h1>
          <span className='lg:hidden'>Get In Touch.</span>
          <MailIcon className='hidden lg:block' />
        </h1>

        <div className='detail'>
          <p>{contactMessage}</p>
          <Form
            layout='vertical'
            // onFinish={async (values) => {await handleFinish(values)}}
            // onFinish={(values) => void sendMail(values)}
            errors={formErrors}
            schema={SendMailSchema}
            onFinish={sendMail}
            // onSubmit={(...args) =>
            //   void handleSubmit((data, event) => {
            //     event?.preventDefault()
            //     console.log('Data', data)
            //   })(...args)
            // }
            // onSubmit={(e) => {
            //   e.preventDefault()
            // }}
          >
            <Form.Item
              label='Name'
              name='name'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Subject'
              name='subject'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Message'
              name='message'
            >
              <TextArea rows={15} />
            </Form.Item>

            <div className='flex justify-center'>
              <button
                type='submit'
                className='submit'
                disabled={loading}
                aria-label='Submit'
              >
                {loading ? 'Sending' : 'Submit'}
              </button>
            </div>
          </Form>
        </div>

        <aside>
          <h1>Address and Phone</h1>
          <p className='address'>
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
  )
}

export default Contact
