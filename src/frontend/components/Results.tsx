import React from 'react'
import { LanguageTextMapping } from '../store/translate/types';
import { ValidLanguageNames, ValidLanguageList } from '../../types';
import LanguageSelect from './LanguageSelect';
import Row from './Row';

export interface ResultsStatefulProps {
  translations: LanguageTextMapping[],
  originalMapping: LanguageTextMapping
}

export type ResultsProps = ResultsStatefulProps

const WrappedLanguageSelect = ({ t, i }: { t: LanguageTextMapping, i: number }) => (
  <LanguageSelect
    key={i}
    disabled={true}
    onChange={null}
    selectedValue={t.languageCode}
    options={ValidLanguageList.map(l => (
      {
        preview: l.code,
        value: l.code,
        content: l.name
      }
    ))}
  />
)

export default (props: ResultsProps) => (
  <div>
    {(props.translations !== null) && (
      <Row className="rowResults">
        <div>
          {[props.originalMapping, ...props.translations].map((t, i) =>
            <div className="result">
              <WrappedLanguageSelect t={t} i={i + 1} />
              <div className="result-text">{t.text}</div>
            </div>
          )}
          <div id="rowResults-end"></div>
        </div>
      </Row>
    )}
  </div>
)