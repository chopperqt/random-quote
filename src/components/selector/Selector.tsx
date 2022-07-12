import React, { useRef } from 'react'
import cx from 'classnames'

import useSelector from './hooks/useSelector'

import {
  ISelector,
} from './'

import styles from './Selector.module.scss'

const Selector = ({
  options,
  className = '',
  classNameInput = '',
  classNameOptions = '',
  label,
  onChange = () => { },
  initialValue,
  disabled,
}: ISelector) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    handleClick,
    handleFocus,
    handleClickValue,
    open,
    icon,
    value,
  } = useSelector({
    initialValue,
    inputRef: inputRef.current,
    onChange,
  })

  return (
    <div className={cx(styles.layout, className, {
      [styles.disabled]: disabled,
    })}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}
      <div className={styles.wrap}>
        <input
          disabled={disabled}
          ref={inputRef}
          onFocus={handleFocus}
          value={value}
          className={cx(styles.input, classNameInput)}
          type="text"
        />
        <button
          type="button"
          onClick={handleClick}
          className={styles.button}
        >
          {icon}
        </button>
        {open && (
          <div className={cx(styles.options, classNameOptions)}>
            {options.map(({
              key,
              label
            }) => (
              <div
                key={key}
                className={styles.value}
                onClick={() => handleClickValue({ key, label })}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Selector