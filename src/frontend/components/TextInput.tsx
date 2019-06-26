import React, { ChangeEvent } from 'react'
import ContentEditable from 'react-contenteditable'

export interface TextInputStatefulProps {
  content: string
}

export interface TextInputDispatchProps {
  onChange(text: string): void
}

export type TextInputProps = TextInputStatefulProps & TextInputDispatchProps

export default class extends React.Component<TextInputProps> {
  private maxLength: number = 100

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value)
  }

  render() {
    var e = this.handleChange
    return (
      <div>
        <div className="textInput-prompt">Take the following phrase</div>
        <div className="textInput-wrapper">
          <input
            className="textInput"
            type="text" value={this.props.content}
            onChange={e => this.handleChange(e)}
            maxLength={this.maxLength}
          />
          {this.props.content.length > 35 &&
            <div className="textInput-charCount">
              {this.props.content.length}/{this.maxLength}
            </div>
          }
        </div>
      </div>
    )
  }
}