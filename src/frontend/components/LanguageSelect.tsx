import React, { ChangeEvent } from 'react'

import { ValidLanguageNames, ValidLanguageCode } from '../../types'

export interface LanguageSelectStatefulProps {
  languages: ValidLanguageCode[]
}

export interface LanguageSelectDispatchProps {
  onChange(language: ValidLanguageCode, index: number): void
}

export type LanguageSelectProps = LanguageSelectStatefulProps & LanguageSelectDispatchProps

class LanguageSelect extends React.Component<LanguageSelectProps> {

  onChange = (event: ChangeEvent<HTMLSelectElement>, index: number): void => {
    let code = event.target.value as ValidLanguageCode
    this.props.onChange(code, index)
  }

  render() {
    return (
      <span className="languageSelect">
        {this.props.languages.map((l, i) =>
          <select value={l} key={i} onChange={(e) => this.onChange(e, i)}>
            {Object.keys(ValidLanguageCode).map((code) =>
              <option value={code} key={code}>{ValidLanguageNames[code as ValidLanguageCode]}</option>
            )}
          </select>
        )}
      </span>
    )
  }
}

export default LanguageSelect