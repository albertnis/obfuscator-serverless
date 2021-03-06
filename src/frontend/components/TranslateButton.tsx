import React, { ChangeEvent } from 'react'
import { InputState } from '../store/input/types';

export interface TranslateButtonStatefulProps {
  loading: boolean,
  input: InputState
}

export interface TranslateButtonDispatchProps {
  onClick(input: InputState): void
}

export type TranslateButtonProps = TranslateButtonStatefulProps & TranslateButtonDispatchProps

export default (props: TranslateButtonProps) => (
  <div>
    <button
      className={`translateButton${
        props.loading ? ' translateButton_loading' : ''
      }`}
      disabled={props.loading}
      onClick={e => props.onClick(props.input)}
    >
      Translate</button>
  </div>
)