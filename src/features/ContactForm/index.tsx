import { ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import Button from '@/components/Button'
import Error from '@/components/Error'
import Section  from '@/components/Section'
import TextField  from '@/components/TextField'
import { CONTACT_FORMS } from '@/constants/form'
import { useStateWithCallback } from '@/hooks/useStateWithCallback'
import { ADD_CONTACT } from '@/services/contact/addContact'

export default function ContactForm() {
  const [contactForm, setContactForm] = useStateWithCallback({
    first_name: '',
    last_name: '',
    phones: [
      { number: '' },
    ]
  })
  const router = useRouter()
  const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT)

  const addNewPhoneNumberButton = () => {
    setContactForm({
      ...contactForm,
      phones: [...contactForm.phones, { number: '' }]
    })
  }

  const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const phones = contactForm.phones
    phones[index].number = event.target.value
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

  const submitContact = async () => {
    await addContact({
      variables: contactForm,
    })

    setContactForm({
      first_name: '',
      last_name: '',
      phones: [
        { number: '' },
      ]
    })

    await router.back()
  }

  if (error) <Error errorData={error} />
  
  return (
    <Section>
      <h2>Contact Form</h2>

      { CONTACT_FORMS.map((form) => {
        if (form.type === 'phones') {
          return (
            <TextField
              key={form.form_id}
              form={form}
              phones={contactForm[form.type]}
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
        onClickHandler={submitContact}
      />
    </Section>
  )
}
