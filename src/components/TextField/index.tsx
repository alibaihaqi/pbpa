import { ChangeEvent, FC } from 'react'
import styled from '@emotion/styled'

interface ITextFieldProps {
  className?: string
  input: string,
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  title: string
}

const TextField: FC<ITextFieldProps> = ({
  className,
  input,
  onChangeInput,
  title,
}) => {
  return (
    <div className={className}>
      <p>{ title }</p>
      <input
        className="input fs-16"
        value={input}
        onChange={onChangeInput}
      />
    </div>
  )
}

export default styled(TextField)`
  background: white;
  display: flex;
  padding: 8px; 
  cursor: pointer;
  user-select: none;
  
  .input {
    border-radius: 4px;
    background: white;
    border: 1px solid #454B66;
    color: #191308;
    padding: 10px;
    width: 100%;
  }

  .input:focus {
    outline: none;
  }

  .fs-16 {
    font-size: 16px;
  }
`