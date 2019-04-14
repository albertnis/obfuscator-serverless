import React, { ChangeEvent } from 'react'
import ContentEditable from 'react-contenteditable'

export interface TextInputState {
  content: string
}

export interface TextInputStatefulProps {
  content: string
}

export interface TextInputDispatchProps {
  onChange(text: string): void
}

export type TextInputProps = TextInputStatefulProps & TextInputDispatchProps

export default class extends React.Component<TextInputProps, TextInputState> {

  constructor(props: TextInputProps) {
    super(props)
    this.state = { content: 'yeet' }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value)
  }

  render() {
    var e = this.handleChange
    return (
      <input
        type="text" value={this.props.content}
        onChange={e => this.handleChange(e)}
      />
    )
  }
}