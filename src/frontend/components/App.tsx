import React from 'react'

import LanguageSelect from './LanguageSelect'
import TextInputContainer from '../containers/TextInputContainer'

export default ({ message }: { message: string }) => (
  <div className="appPlaceholder">
  Take the following <LanguageSelect languageCode="en" /> phrase: <TextInputContainer />
  </div>
)