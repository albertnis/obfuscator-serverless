import React from 'react'

import LanguageSelect from './LanguageSelect'
import TextInput from './TextInput'

export default ({ message }: { message: string }) => (
  <div className="appPlaceholder">
  Take the following <LanguageSelect languageCode="en" /> phrase: <TextInput />
  </div>
)