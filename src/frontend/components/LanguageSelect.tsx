import React, { ChangeEvent } from 'react'
import LanguageOptions from './LanguageOptions';
import { ValidLanguageList } from '../../types';

interface LanguageSelectStatefulProps {
  options: PreviewableString[],
  selectedValue: string
}

export interface LanguageSelectDispatchProps {
  onChange: (selectedValue: string) => void
}

export interface PreviewableString {
  preview: any,
  content: string,
  value: string
}

type LanguageSelectProps = LanguageSelectStatefulProps & LanguageSelectDispatchProps

interface LanguageSelectState {
  textValue: string,
  focused: boolean,
  activeOptionIndex: number
}

export default class extends React.Component<LanguageSelectProps, LanguageSelectState> {
  constructor(props: LanguageSelectProps) {
    super(props)

    this.state = {
      textValue: props.options.find(o => o.value === props.selectedValue).content,
      focused: false,
      activeOptionIndex: -1
    }
  }

  textChange(e: ChangeEvent<HTMLInputElement>) {
    this.focus()
    this.setState(
      {
        textValue: e.target.value,
        activeOptionIndex: this.props.options.findIndex(o =>
          o.content.toLowerCase().includes(e.target.value.toLowerCase())
        )
      }
    )
  }

  focus() {
    this.setState({ focused: true })
  }

  blur() {
    this.setState({ focused: false })
  }

  onSelect(i: number) {
    let selectedItem = this.props.options[i]
    this.setState({ textValue: selectedItem.content })
    this.props.onChange(selectedItem.value)
    this.blur()
  }

  onActiveChange(value: number) {
    this.setState({ activeOptionIndex: value })
  }

  onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "Enter":
        if (this.state.activeOptionIndex !== null) {
          this.onSelect(this.state.activeOptionIndex)
        }
        break
      case "ArrowDown":
        this.focus()
        this.moveOptionsPointer(1)
        break
      case "ArrowUp":
        this.moveOptionsPointer(-1)
        this.focus()
        break
      case "Tab":
        this.blur()
        break
      case "Escape":
        this.blur()
        break
      default:
    }
  }

  moveOptionsPointer(distance: number) {
    let newIndex = this.state.activeOptionIndex + distance
    if (newIndex > this.props.options.length - 1) {
      newIndex = this.props.options.length - 1
    }
    if (newIndex < 0) {
      newIndex = 0
    }
    console.log(`pointer to ${newIndex}`)
    this.setState({ activeOptionIndex: newIndex })
  }

  getItemByValue = (value: string) => this.props.options.find(o => o.value === value)
  getItemByIndex = (i: number) => this.props.options[i]

  filteredOptions = () => (
    this.props.options.filter(l =>
      l.content.toLowerCase().includes(this.state.textValue.toLowerCase())
    )
  )

  render() {
    let { options, selectedValue } = this.props
    let selectedItem = this.getItemByValue(selectedValue)
    return (
      <div
        className={`languageSelect ${this.state.focused ? "languageSelect_focused" : ""}`}
      >
        <input type="hidden" value={selectedValue}></input>
        <span className="languageSelect-preview">{selectedItem.preview}</span>
        <input
          type="text"
          className="languageSelect-textInput"
          value={this.state.textValue}
          onFocus={_ => this.focus()}
          onKeyDown={e => this.onKeyPress(e)}
          onChange={e => this.textChange(e)}
        ></input>
        {this.state.focused &&
          <LanguageOptions
            onActiveChange={i => this.onActiveChange(i)}
            onSelect={i => this.onSelect(i)}
            activeValue={this.state.activeOptionIndex}
            items={options.map((l, i) => (
              {
                value: i,
                content: l.content
              }
            ))}
          />
        }
      </div>
    )
  }
}