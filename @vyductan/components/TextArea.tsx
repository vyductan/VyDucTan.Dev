'use client'

import { Form } from 'antd'
import { type Rule } from 'antd/lib/form'
import { type TextareaHTMLAttributes, useState } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label: string
  rows?: number
  rules?: Rule[]
}
const TextArea = ({ name, label, rows, rules }: TextAreaProps) => {
  const [value, setValue] = useState<string>()
  const required = rules?.some((x) => Object.keys(x).includes('required'))
  return (
    <Form.Item rules={rules}>
      <div className='form-item'>
        <textarea
          id={name}
          className={`${value ? 'filled' : ''}`}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          rows={rows}
        />
        <label htmlFor={name}>
          {label}
          {required && ' *'}
        </label>
      </div>
    </Form.Item>
  )
}

export default TextArea
