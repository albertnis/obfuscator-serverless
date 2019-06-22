import React from 'react'

import TextInputContainer from '../containers/TextInputContainer'
import LanguageSelectContainer from '../containers/LanguageSelectContainer';
import TranslateButtonContainer from '../containers/TranslateButtonContainer';
import ResultsContainer from '../containers/ResultsContainer';

export default ({ message }: { message: string }) => (
  <div className="appPlaceholder">
    <div>Take the following <LanguageSelectContainer /> phrase: <TextInputContainer /><TranslateButtonContainer /></div>
    <ResultsContainer />
  </div>
)