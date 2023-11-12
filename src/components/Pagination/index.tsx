import { FC } from 'react'
import styled from '@emotion/styled'

interface IPaginationProps {
  className?: string
  isHideButton: boolean
  onLoadMoreClick: () => void
}

const Pagination: FC<IPaginationProps> = ({
  className,
  isHideButton,
  onLoadMoreClick,
}) => {
  if (isHideButton) return null

  return (
    <section className={className}>
      <button
        className='p-button'
        onClick={onLoadMoreClick}
      >
        Load More
      </button>
    </section>
  )
}

export default styled(Pagination)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;

  .p-button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    font-size: 16px;
    overflow: hidden;
    outline: none;
  }
`