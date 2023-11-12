import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'

import ContactCard  from '@/components/Card'
import Error  from '@/components/Error'
import Loading  from '@/components/Loading'
import Pagination  from '@/components/Pagination'
import { IContact } from '@/interfaces/contact'
import { GET_CONTACT_LIST } from '@/services/contact/getContactList'
import { isHideLoadMoreButtonState } from '@/store/contact'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`

export default function CardList() {
  const [isHideLoadMoreButton, setIsHideLoadMoreButton ] = useRecoilState(isHideLoadMoreButtonState)
  const { loading, error, data, fetchMore } = useQuery(GET_CONTACT_LIST, {
    variables: {
      offset: 0,
      limit: Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION),
    },
    // notifyOnNetworkStatusChange: true,
  })

  if (loading) return <Loading />
  if (error) return <Error errorData={error} />

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
      
      <Pagination
        isHideButton={isHideLoadMoreButton}
        onLoadMoreClick={async () => {
          const { data: newData } = await fetchMore({
            variables: {
              offset: data.contact.length,
            },
          })

          if (newData.contact?.length < Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION)) {
            setIsHideLoadMoreButton(true)
          }
        }}
      />
    </Section>
  )
}
