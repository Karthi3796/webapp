import React, { useState } from 'react'
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
  const {theme} = useContext(ThemeContext)
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 200)
  return (
    <span className={theme==="light"?'Capital':'Capital-dark'}>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  )
}
