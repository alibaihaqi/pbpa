import { FC } from 'react'
import styled from '@emotion/styled'

interface ILoadingProps {
  className?: string
}

const Loading: FC<ILoadingProps> = ({ className }) => {
  return (
    <div className={className}>
      <p>Loading...</p>
    </div>
  )
}

export default styled(Loading)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`