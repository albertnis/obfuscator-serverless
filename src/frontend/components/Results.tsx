import React from 'react'
import { LanguageTextMapping } from '../store/translate/types';
import { ValidLanguageNames } from '../../types';

export interface ResultsStatefulProps {
  translations: LanguageTextMapping[]
}

export type ResultsProps = ResultsStatefulProps

export default (props: ResultsProps) => (
  <div>
    {props.translations && props.translations.map((trans, i) => 
      <div key={i}><span>{ValidLanguageNames[trans.languageCode]}: </span>{trans.text}</div>
    )}
  </div>
)