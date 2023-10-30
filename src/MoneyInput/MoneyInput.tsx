import React, { useRef, useState, FocusEvent } from 'react'
import _styles from './MoneyInput.module.css'

interface MoneyInputProps {
  locale: string
  label: string
  disabled: boolean
}

const MoneyInput: React.FC<MoneyInputProps> = ({ locale, label, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [rawValue, setRawValue] = useState<string>('')
  const [isValid, setIsValid] = useState(true)

  const convertToCents = (value: string): number => {
    let normalizedValue = value

    normalizedValue = normalizedValue.replace(',', '.')

    const valueNumber = parseFloat(normalizedValue.replace(/[^\d.]/g, ''))
    return Math.round(valueNumber * 100)
  }

  const formatToCurrency = (value: string) => {
    const valueNumber = parseFloat(value)
    if (isNaN(valueNumber)) return ''

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      useGrouping: false,
    }).format(valueNumber)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const pattern = /^[\d.,€$£\s]+$/

    const isValueValid = pattern.test(value)
    setIsValid(isValueValid)

    const valueNumber = value.replace(/[^\d]/g, '')

    if (valueNumber === '') {
      setRawValue('')
      setInputValue('')
      return
    }

    setRawValue(valueNumber)
    const formattedValue = formatToCurrency((parseInt(valueNumber) / 100).toString())
    setInputValue(formattedValue)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (!e.target.value) return

    const intValue = convertToCents(e.target.value)
    console.log(` ${intValue}`)

    e.target.value = intValue.toString()
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (inputRef.current) {
      const formattedValue = formatToCurrency((parseInt(rawValue) / 100).toString())
      inputRef.current.value = formattedValue
    }
  }

  return (
    <form className={_styles.container}>
      <label htmlFor="moneyInput" className={_styles.labelInput}>
        {label}
      </label>
      {disabled ? (
        <input value={inputValue} type="text" className={_styles.fieldDisabledInput} id="moneyInput" readOnly />
      ) : (
        <input
          ref={inputRef}
          type="text"
          className={`${_styles.fieldInput} ${!isValid ? _styles.invalid : ''}`}
          id="moneyInput"
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={inputValue}
        />
      )}
    </form>
  )
}

export default MoneyInput
