import React, { ChangeEvent } from 'react'

import { ValidLanguageNames, ValidLanguageCode, ValidLanguageList } from '../../types'
import LanguageSelect from './LanguageSelect';

export interface LanguageSelectStatefulProps {
  languages: ValidLanguageCode[]
}

export interface LanguageSelectDispatchProps {
  onChange(language: ValidLanguageCode, index: number): void
}

export type LanguageSelectProps = LanguageSelectStatefulProps & LanguageSelectDispatchProps

class LanguageSelectSection extends React.Component<LanguageSelectProps> {
  onChange = (event: ChangeEvent<HTMLSelectElement>, index: number): void => {
    let code = event.target.value as ValidLanguageCode
    this.props.onChange(code, index)
  }

  onFocus = (i: number) => {

  }

  languageSelectElement = ({ l, i, disabled }: { l: ValidLanguageCode, i: number, disabled: boolean }) => (
    <select disabled={disabled} value={l} key={i} onChange={(e) => this.onChange(e, i)}>
      {Object.keys(ValidLanguageCode).map((code) =>
        <option value={code} key={code}>{ValidLanguageNames[code as ValidLanguageCode]}</option>
      )}
    </select>
  )

  languageSelectElementNew = ({ i, disabled }: { i: number, disabled: boolean }) => (
    <LanguageSelect
      onChange={val => this.props.onChange(val as ValidLanguageCode, i)}
      selectedValue={this.props.languages[i]}
      disabled={disabled}
      options={ValidLanguageList.map(l => (
        {
          preview: l.code,
          value: l.code,
          content: l.name
        }
      ))} />
  )

  render() {
    return (
      <span>
        <div>Translate it from</div>
        <this.languageSelectElementNew i={0} key={0} disabled={false} />
        <div>Then through</div>
        {this.props.languages.slice(1).map((l, i) =>
          <this.languageSelectElementNew key={i+1} i={i+1} disabled={false} />
        )}
        <div>Then back to</div>
        <this.languageSelectElementNew i={0} disabled={true} />
      </span>
    )
  }
}

export default LanguageSelectSection