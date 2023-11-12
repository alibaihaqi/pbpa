import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import ContactCard  from '@/components/Card'
import { IContact } from '@/interfaces/contact'
import { GET_CONTACT_LIST } from '@/services/contact/getContactList'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`

export default function CardList() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      offset: 0,
      limit: Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION),
    }
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error}`

  return (
    <Section>
      { data?.contact.map((contact: IContact) => {
        return (
          <ContactCard
            key={contact.id}
            contact={contact}
          />
        )
      }) }
    </Section>
  )
}
