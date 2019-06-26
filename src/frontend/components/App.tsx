import React from 'react'

import TextInputContainer from '../containers/TextInputContainer'
import LanguageSelectSectionContainer from '../containers/LanguageSelectSectionContainer';
import TranslateButtonContainer from '../containers/TranslateButtonContainer';
import ResultsContainer from '../containers/ResultsContainer';
import Row from './Row';

export default () => (
  <div className="appPlaceholder">
    <Row className="">
      <h1>Obfuscator</h1>
      <div className="horizontalRule"></div>
    </Row>
    <Row className="">
      <TextInputContainer />
    </Row>
    <Row className="">
      <LanguageSelectSectionContainer />
    </Row>
    <Row className="">
      <TranslateButtonContainer />
    </Row>
      <ResultsContainer />
  </div>
)