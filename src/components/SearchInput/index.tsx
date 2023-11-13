import { ChangeEvent, FC } from 'react'
import styled from '@emotion/styled'
import { IContact } from '@/interfaces/contact'

interface ISearchInputProps {
  className?: string
  input: string,
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: FC<ISearchInputProps> = ({
  className,
  input,
  onChangeInput,
}) => {
  return (
    <section className={className}>
      <input
        className="input fs-16"
        value={input}
        onChange={onChangeInput}
      />
    </section>
  )
}

export default styled(SearchInput)`
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

  .fs-12 {
    font-size: 12px;
  }

  .fs-14 {
    font-size: 14px;
  }

  .fs-16 {
    font-size: 16px;
  }

  .pt-4 {
    padding-top: 4px;
  }

  .pt-8 {
    padding-top: 8px;
  }
`