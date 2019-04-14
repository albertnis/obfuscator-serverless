import React, { ChangeEvent } from 'react'

import AllLanguages, { Language } from '../../types'
import { render } from 'react-dom';

export interface LanguageSelectStatefulProps {
  languages: Language[]
}

export interface LanguageSelectDispatchProps {
  onChange(language: Language, index: number): void
}

export type LanguageSelectProps = LanguageSelectStatefulProps & LanguageSelectDispatchProps

class LanguageSelect extends React.Component<LanguageSelectProps> {

  onChange = (event: ChangeEvent<HTMLSelectElement>, index: number): void => {
    let selectedLanguage = AllLanguages.filter(l => 
      l.code == event.target.value
    )[0]

    this.props.onChange(selectedLanguage, index)
  }

  render() {
    return (
      <span className="languageSelect">
        {this.props.languages.map((l, i) =>
          <select value={l.code} key={i} onChange={(e) => this.onChange(e, i)}>
            {AllLanguages.map((gl, gi) =>
              <option value={gl.code} key={gi}>{gl.name}</option>
            )}
          </select>
        )}
      </span>
    )
  }
}

export default LanguageSelect