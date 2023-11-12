import { FC } from 'react'
import { ApolloError } from '@apollo/client'
import styled from '@emotion/styled'

interface IErrorProps {
  className?: string
  errorData: ApolloError
}

const Error: FC<IErrorProps> = ({
  className,
  errorData,
}) => {
  return (
    <div className={className}>
      <p>Error!</p>
      <p className="pt-8">
        { errorData.message }
      </p>
    </div>
  )
}

export default styled(Error)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  .pt-8 {
    padding-top: 8px;
  }
`