import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import AddButton from '@/components/Button/AddButton'
import ContactCard  from '@/components/Card'
import Error  from '@/components/Error'
import Loading  from '@/components/Loading'
import Pagination  from '@/components/Pagination'
import SearchInput from '@/components/SearchInput'
import Section  from '@/components/Section'

import { IContact } from '@/interfaces/contact'
import { GET_CONTACT_LIST } from '@/services/contact/getContactList'
import { isHideLoadMoreButtonState } from '@/store/contact'
import { useStateWithCallback } from '@/hooks/useStateWithCallback'

const AddButtonWrapper = styled.section`
  display: flex;
  justify-content: end;
  padding: 16px 16px 0 16px;
`

export default function ContactList() {
  const [searchInput, setSearchInput ] = useStateWithCallback('')
  const router = useRouter()

  const [isHideLoadMoreButton, setIsHideLoadMoreButton ] = useRecoilState(isHideLoadMoreButtonState)

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      offset: 0,
      limit: Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION),
    },
  })

  if (loading) return <Loading />
  if (error) return <Error errorData={error} />

  return (
    <>
      <SearchInput
        input={searchInput}
        onChangeInput={(event) => {
          if (event?.target?.value !== searchInput) {
            setSearchInput(event?.target?.value, async (prevVal: string, currVal: string) => {
              if (currVal.length > 2 || currVal.length === 0) {
                const { data: newData } = await refetch({
                  offset: 0,
                  limit: Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION),
                  where: {
                    first_name: {
                      _like: `%${currVal}%`
                    }
                  }
                })
    
                if (newData.contact?.length < Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION)) {
                  setIsHideLoadMoreButton(true)
                }
              }
            })
          }
        }}
      />

      <AddButtonWrapper>
        <AddButton
          title={'Add Contact'}
          onClickHandler={() => {
            router.push('/form')
          }}
        />
      </AddButtonWrapper>

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
                limit: Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION),
              },
            })

            if (newData.contact?.length < Number(process.env.NEXT_PUBLIC_GRAPHQL_LIMIT_PAGINATION)) {
              setIsHideLoadMoreButton(true)
            }
          }}
        />
      </Section>
    </>
  )
}
