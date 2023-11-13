import { FC } from 'react'
import styled from '@emotion/styled'

interface IButtonProps {
  className?: string
  onClickHandler: () => void
  title: string
}

const Button: FC<IButtonProps> = ({
  className,
  onClickHandler,
  title,
}) => {
  return (
    <button
      className={className}
      onClick={onClickHandler}
    >
      { title }
    </button>
  )
}

export default styled(Button)`
  background-color: #E9E3E6;
  background-repeat: no-repeat;
  border: none;
  border-radius: 8px;
  color: #191308;
  cursor: pointer;
  font-size: 16px;
  overflow: hidden;
  outline: none;
  margin-top: 16px;
  padding: 8px 24px;

`