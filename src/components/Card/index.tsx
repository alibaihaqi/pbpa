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
      <p className="contact-name">
        { contact.first_name } { contact.last_name }
      </p>
      <p className="contact-created_at">
        Created at: { format(new Date(contact.created_at), 'dd-MMM-yyyy') }
      </p>
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
  
  .contact-name {
    color: #191308;
    font-size: 16px;
  }

  .contact-created_at {
    color: #191308;
    font-size: 12px;
    padding-top: 8px;
  }
`