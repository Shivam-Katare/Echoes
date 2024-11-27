'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { Check, ChevronsUpDown } from 'lucide-react';

const ComboSelector = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  displayValue = (option) => option?.name,
}) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return displayValue(option).toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox
      as="div"
      value={selectedValue}
      onChange={(option) => {
        setQuery('')
        onChange(option)
      }}
    >
      <div className="relative">
        <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label>
      </div>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-[12px] border-0 bg-secondary py-4 pl-3 pr-10 text-gray-900 shadow-sm ring-inset focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={displayValue}
          placeholder={placeholder}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        {filteredOptions.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-background py-1 text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="group relative cursor-pointer select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate group-data-[selected]:font-semibold">{displayValue(option)}</span>

                <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  )
}

ComboSelector.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  displayValue: PropTypes.func,
};

export default ComboSelector;