import React from 'react'
import ContentEditable from 'react-contenteditable'

type TextInputState = {
  content: string
}

export default class extends React.Component {
  state: TextInputState

  constructor(props: {}) {
    super(props)
    this.state = { content: 'yeet' }
  }

  handleChange = (event: any) => {
    this.setState({content: event.target.value})
  }

  render() {
    return (
      <ContentEditable html={this.state.content} onChange={(e: any) => this.handleChange(e)} />
    )
  }
}