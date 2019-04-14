import React from 'react'

import TextInputContainer from '../containers/TextInputContainer'
import LanguageSelectContainer from '../containers/LanguageSelectContainer';

export default ({ message }: { message: string }) => (
  <div className="appPlaceholder">
  Take the following <LanguageSelectContainer /> phrase: <TextInputContainer />
  </div>
)