import React, { ChangeEvent, RefObject } from 'react'
import LanguageOptions from './LanguageOptions';
import { ValidLanguageList } from '../../types';

interface LanguageSelectStatefulProps {
  options: PreviewableString[],
  selectedValue: string,
  disabled: boolean
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
  wrapperRef: RefObject<HTMLDivElement>

  constructor(props: LanguageSelectProps) {
    super(props)
    this.wrapperRef = React.createRef<HTMLDivElement>()
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.state = {
      textValue: props.options.find(o => o.value === props.selectedValue).content,
      focused: false,
      activeOptionIndex: -1
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e: MouseEvent) {
    let wrapper = this.wrapperRef.current
    if (wrapper && !wrapper.contains(event.target as Node)) {
      this.blur()
    }
  }

  textChange(e: ChangeEvent<HTMLInputElement>) {
    this.focus()
    let newIndex = this.props.options.findIndex(o => o.content.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState(
      {
        textValue: e.target.value,
        activeOptionIndex: newIndex
      }
    )
    this.bringIntoView(newIndex)
  }

  focus() {
    if (!this.props.disabled) {
      this.setState({ focused: true,
        textValue: this.props.options.find(o => o.value === this.props.selectedValue).content })
    }
  }

  blur() {
    setTimeout(() =>
      this.setState({
        focused: false,
        activeOptionIndex: -1,
        textValue: this.props.options.find(o => o.value === this.props.selectedValue).content }), 50
    )
  }

  onSelect(i: number) {
    let selectedItem = this.props.options[i]
    this.setState({ textValue: selectedItem.content })
    this.props.onChange(selectedItem.value)
    this.blur()
  }

  selectedValueChange() {
    this.setState({ textValue: this.getItemByValue(this.props.selectedValue).content })
  }

  onActiveChange(value: number) {
    this.setState({ activeOptionIndex: value })
  }

  onKeyPress(e: React.KeyboardEvent<HTMLElement>) {
    switch (e.key) {
      case "Enter":
        if (this.state.activeOptionIndex >= 0) {
          this.onSelect(this.state.activeOptionIndex)
        }
        break
      case "ArrowDown":
        e.preventDefault()
        this.focus()
        this.moveOptionsPointer(1)
        break
      case "ArrowUp":
        e.preventDefault()
        this.focus()
        this.moveOptionsPointer(-1)
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

    this.bringIntoView(newIndex)
  }

  bringIntoView(index: number) {
    let element = this.wrapperRef.current as HTMLElement
    element.querySelectorAll(`.languageOptions-option`)[index].scrollIntoView()
  }

  getItemByValue = (value: string) => this.props.options.find(o => o.value === value)
  getItemByIndex = (i: number) => this.props.options[i]

  filteredOptions = () => (
    this.props.options.filter(l =>
      l.content.toLowerCase().includes(this.state.textValue.toLowerCase()) ||
      l.preview.toLowerCase().includes(this.state.textValue.toLowerCase())
    )
  )

  render() {
    let { options, selectedValue, disabled } = this.props
    let selectedItem = this.getItemByValue(selectedValue)
    return (
      <div
        ref={this.wrapperRef}
        className={`languageSelect${
          this.state.focused ? " languageSelect_focused" : ""
        }${
          disabled ? " languageSelect_disabled" : ""
        }`}
      >
        <input type="hidden" value={selectedValue} onChange={() => this.selectedValueChange()}></input>
        <div onClick={_ => this.focus()} className="languageSelect-preview">{selectedItem.preview}</div>
        <input
          type="text"
          className="languageSelect-textInput"
          value={this.state.focused ? this.state.textValue : selectedItem.content}
          onFocus={_ => this.focus()}
          onClick={_ => this.focus()}
          onKeyDown={e => this.onKeyPress(e)}
          onChange={e => this.textChange(e)}
          disabled={disabled}
        ></input>
        {this.state.focused &&
          <LanguageOptions 
            onActiveChange={i => this.onActiveChange(i)}
            onSelect={i => this.onSelect(i)}
            onFocus={() => this.focus()}
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