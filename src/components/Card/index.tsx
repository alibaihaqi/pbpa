import { FC } from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { IContact } from '@/interfaces/contact'

interface IContactCardProps {
  className?: string
  contact: IContact
  key: any
}

const ContactCard: FC<IContactCardProps> = ({
  className,
  contact,
  key,
}) => {
  return (
    <div
      key={key}
      className={className}
    >
      <p className="contact-text_color fs-16">
        Name: { contact.first_name } { contact.last_name }
      </p>
      <p className="contact-text_color fs-12 pt-8">
        Created at: { format(new Date(contact.created_at), 'dd-MMM-yyyy') }
      </p>

      <p className="contact-text_color fs-14 pt-8">
        Phones:
      </p>

      <ul>
        { contact.phones?.map((phone, idx) => {
          return (
            <li
              key={idx}
              className="contact-text_color l-item fs-14 pt-4"
              style={{
                listStylePosition: 'inside'
              }}
            >
              { phone.number }
            </li>
          )
        }) }
      </ul>
    </div>
  )
}

export default styled(ContactCard)`
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  cursor: pointer;
  user-select: none;
  
  .contact-text_color {
    color: #191308;
  }

  .fs-12 {
    font-size: 12px;
  }

  .fs-14 {
    font-size: 14px;
  }

  .fs-16 {
    font-size: 16px;
  }

  .pt-4 {
    padding-top: 4px;
  }

  .pt-8 {
    padding-top: 8px;
  }
`