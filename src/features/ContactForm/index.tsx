import { ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import Button from '@/components/Button'
import Error from '@/components/Error'
import Section  from '@/components/Section'
import TextField  from '@/components/TextField'
import { CONTACT_FORMS } from '@/constants/form'
import { useStateWithCallback } from '@/hooks/useStateWithCallback'
import { ADD_CONTACT } from '@/services/contact/addContact'

interface IAddButtonProps {
  addNewPhoneNumberButton?: () => void
  className?: string
}

const addButton = ({
  className,
  addNewPhoneNumberButton,
}: IAddButtonProps) => {
  return (
    <div className={className}>
      <button
        className='phone-button'
        onClick={addNewPhoneNumberButton}
      >
        + Add Phone
      </button>
    </div>
  )
}

const AddButton = styled(addButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;

.phone-button {
  background-color: #BFC0C0;
  background-repeat: no-repeat;
  border: 1px solid white;
  border-radius: 4px;
  color: #2D3142;
  cursor: pointer;
  font-size: 14px;
  overflow: hidden;
  outline: none;
  padding: 4px 8px;
}
`

export default function ContactForm() {
  const [contactForm, setContactForm] = useStateWithCallback({
    first_name: '',
    last_name: '',
    phones: [
      { number: '' },
    ]
  })
  const router = useRouter()
  const [addContact, { error }] = useMutation(ADD_CONTACT)

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

      <AddButton addNewPhoneNumberButton={addNewPhoneNumberButton} />

      <Button
        title='Submit'
        onClickHandler={submitContact}
      />
    </Section>
  )
}
