import { ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import Button from '@/components/Button'
import Error from '@/components/Error'
import Section  from '@/components/Section'
import TextField  from '@/components/TextField'
import { CONTACT_FORMS } from '@/constants/form'
import { useStateWithCallback } from '@/hooks/useStateWithCallback'
import { ADD_CONTACT } from '@/services/contact/addContact'
import { GET_CONTACT_DETAIL } from '@/services/contact/getContactDetail'
import { EDIT_CONTACT } from '@/services/contact/editContact'

interface IAddButtonProps {
  addNewPhoneNumberButton?: () => void
  className?: string
}

const addContactButton = ({
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

const AddContactButton = styled(addContactButton)`
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
  const [addContact, { error }] = useMutation(ADD_CONTACT)
  const [editContact, { error: errorUpdate }] = useMutation(EDIT_CONTACT)
  const router = useRouter()

  useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: Number(router.query?.contactId)
    },
    skip: !JSON.parse(router.query?.isEdit as string || 'false'),
    onCompleted: (data) => {
      setContactForm(data.contact_by_pk)
    } 
  })

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
    if (router.query?.isEdit === 'true') {
      await editContact({
        variables: {
          id: Number(router.query?.contactId),
          _set: {
            first_name: contactForm.first_name,
            last_name: contactForm.last_name,
          },
        }
      })
    } else {
      await addContact({
        variables: contactForm,
      })
    }

    setContactForm({
      first_name: '',
      last_name: '',
      phones: [
        { number: '' },
      ]
    })

    await router.back()
  }

  if (error || errorUpdate) <Error errorData={error || errorUpdate} />
  
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

      <AddContactButton addNewPhoneNumberButton={addNewPhoneNumberButton} />

      <Button
        title='Submit'
        onClickHandler={submitContact}
      />
    </Section>
  )
}
