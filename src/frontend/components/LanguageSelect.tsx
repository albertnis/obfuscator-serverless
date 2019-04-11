import React from 'react'

import AllLanguages, { Language } from '../constants/languages'

export default ({ languageCode }: { languageCode: string }) => (
  <span className="languageSelect">
    {AllLanguages.filter(l => l.code == languageCode)[0].name}
  </span>
)