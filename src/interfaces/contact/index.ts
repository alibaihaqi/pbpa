export interface IPhoneNumber {
  __typename: string
  number: string
}

export interface IContact {
  id: number
  first_name: string
  last_name: string
  created_at: string
  phones: IPhoneNumber[]
  __typename: string
}