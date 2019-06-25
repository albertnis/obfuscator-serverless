import React from 'react'

import TextInputContainer from '../containers/TextInputContainer'
import LanguageSelectSectionContainer from '../containers/LanguageSelectSectionContainer';
import TranslateButtonContainer from '../containers/TranslateButtonContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Row from './Row';

export default () => (
  <div className="appPlaceholder">
    <Row>
      <h1>Obfuscator</h1>
      <div className="horizontalRule"></div>
    </Row>
    <Row>
      <TextInputContainer />
    </Row>
    <Row>
      <LanguageSelectSectionContainer />
    </Row>
    <Row>
      <TranslateButtonContainer />
    </Row>
    <ResultsContainer />
  </div>
)