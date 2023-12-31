import { ChangeEvent, FC } from 'react'
import styled from '@emotion/styled'
import { IContactForm } from '@/constants/form'
import { IPhoneNumber } from '@/interfaces/contact'
import Button from '@/components/Button'

interface ITextFieldProps {
  className?: string
  form: IContactForm
  onChangeInput?: (event: ChangeEvent<HTMLInputElement>) => void
  onPhoneChangeInput?: (event: ChangeEvent<HTMLInputElement>, index: number) => void
  phones?: IPhoneNumber[]
  value?: string
}

const TextField: FC<ITextFieldProps> = ({
  className,
  form,
  onChangeInput,
  onPhoneChangeInput,
  phones,
  value,
}) => {
  const renderTextField = () => {
    if (form.type === 'phones') {
      return phones?.map((phone, idx) => {
        return (
          <input
            key={idx}
            className="input fs-16"
            placeholder={form.placeholder}
            type={form.keyboardType}
            value={phone.number}
            onChange={(e) => {
              onPhoneChangeInput && onPhoneChangeInput(e, idx)
            }}
          />
        )
      })
    }

    return (
      <input
        className="input fs-16"
        name={form.form_id}
        placeholder={form.placeholder}
        type={form.keyboardType}
        value={value as string}
        onChange={onChangeInput}
      />
    )
  }

  return (
    <div className={className}>
      <p className='textfield-title'>
        { form.title }
      </p>

      { renderTextField() }
    </div>
  )
}

export default styled(TextField)`
  background: transparent;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;

  .textfield-title {
    padding-bottom: 8px;
  }
  
  .input {
    border-radius: 4px;
    background: white;
    border: 1px solid #454B66;
    color: #191308;
    margin-bottom: 12px;
    padding: 10px;
    width: 100%;
  }

  .input:last-child {
    margin-bottom: 0
  }

  .input:focus {
    outline: none;
  }

  .fs-16 {
    font-size: 16px;
  }
`