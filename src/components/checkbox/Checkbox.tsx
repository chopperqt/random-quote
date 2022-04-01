import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import styles from './Checkbox.module.scss'

import { ICheckboxProps } from './'

const Checkbox = ({
  label,
  ...props
}: ICheckboxProps) => {
  const id = uuidv4()

  return (
    <div>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        {...props}
      />
      <label htmlFor={id}>
        {label}
      </label>
    </div>

  )
}

export default Checkbox