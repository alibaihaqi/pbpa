import { FC } from 'react'
import { ApolloError } from '@apollo/client'
import styled from '@emotion/styled'

interface IErrorProps {
  className?: string
  errorData: ApolloError | undefined
}

const Error: FC<IErrorProps> = ({
  className,
  errorData,
}) => {
  return (
    <div className={className}>
      <p>Error!</p>
      <p className="pt-8">
        { errorData?.message }
      </p>
    </div>
  )
}

export default styled(Error)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;

  .pt-8 {
    padding-top: 8px;
    text-align: center;
  }
`