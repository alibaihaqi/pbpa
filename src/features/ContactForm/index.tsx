import { ChangeEvent } from 'react'

import Button from '@/components/Button'
import Section  from '@/components/Section'
import TextField  from '@/components/TextField'
import { CONTACT_FORMS } from '@/constants/form'
import { useStateWithCallback } from '@/hooks/useStateWithCallback'

export default function ContactForm() {
  const [contactForm, setContactForm] = useStateWithCallback({
    first_name: '',
    last_name: '',
    phones: [
      { number: '' },
    ]
  })

  const addNewPhoneNumberButton = () => {
    setContactForm({
      ...contactForm,
      phones: [...contactForm.phones, { number: '' }]
    })
  }

  const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>, index: number, value: string) => {
    const phones = contactForm.phones
    phones[index].number = value
    setContactForm({
      ...contactForm,
      phones: [...phones]
    })
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Section>
      <h2>Contact Form</h2>

      { CONTACT_FORMS.map((form) => {
        if (form.type === 'phone') {
          return (
            <TextField
              key={form.form_id}
              form={form}
              phones={contactForm[form.form_id]}
              onPhoneChangeInput={handlePhoneInput}
            />
          )
        }

        return (
          <TextField
            key={form.form_id}
            form={form}
            value={contactForm[form.form_id]}
            onChangeInput={handleInput}
          />
        )
      })}

      <Button
        title='Submit'
        onClickHandler={() => {}}
      />
    </Section>
  )
}
