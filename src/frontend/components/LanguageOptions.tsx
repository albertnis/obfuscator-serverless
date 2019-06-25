import React from 'react'


interface LanguageOptionsProps {
  items: ValueContentPair[]
  activeValue: number
  onSelect: (value: number) => void
  onActiveChange: (value: number) => void
}

interface ValueContentPair {
  value: number,
  content: any
}

export default (props: LanguageOptionsProps) => (
  <div className="languageOptions">
    {props.items.map(item =>
      <div key={item.value}
        onClick={_ => props.onSelect(item.value)}
        onMouseOver={_ => props.onActiveChange(item.value)}
        onMouseLeave={_ => props.onActiveChange(null)}
        className={`languageOptions-option ${item.value === props.activeValue ? 'languageOptions-option_active' : ''}`}
      >
        {item.content}
      </div>
    )}
  </div>
)