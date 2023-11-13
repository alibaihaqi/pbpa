import { IPhoneNumber } from '@/interfaces/contact'

export interface IContactForm {
  form_id: string
  id?: number
  title: string
  keyboardType: string
  listPhone?: IPhoneNumber[]
  placeholder: string
  type: string
  value: string
}

export const CONTACT_FORMS: IContactForm[] = [
  {
    form_id: 'first_name',
    title: 'First Name',
    keyboardType: 'text',
    placeholder: 'Add your first name',
    type: 'text',
    value: '',
  },
  {
    form_id: 'last_name',
    title: 'Last Name',
    keyboardType: 'text',
    placeholder: 'Add your last name',
    type: 'text',
    value: '',
  },
  {
    form_id: 'phone',
    title: 'Phone Number',
    keyboardType: 'tel',
    placeholder: 'Add your phone number',
    type: 'phones',
    listPhone: [
      {
        number: '',
      }
    ],
    value: '',
  }
]