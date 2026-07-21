import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useLanguage } from '@/context/LanguageContext'

const LangSelector = () => {
    const {lang, setLang} = useLanguage();
  return (
     <Select value={lang} onValueChange={(v: any) => setLang(v)}>
            <SelectTrigger className="w-28 self-start sm:self-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
            </SelectContent>
          </Select>
  )
}

export default LangSelector