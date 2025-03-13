import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languageOptions } from "../constants/languageOptions"

interface Language {
  id: number
  name: string
  value: string
  defaultCode: string
  monacoLanguage: string
}

interface LanguagesDropdownProps {
  language: Language
  onSelectChange: (selectedLang: Language) => void
}

const LanguagesDropdown = ({ language, onSelectChange }: LanguagesDropdownProps) => {
  return (
    <Select
      value={language.value}
      onValueChange={(value) => {
        const selectedLang = languageOptions.find((lang) => lang.value === value)
        if (selectedLang) {
          onSelectChange(selectedLang)
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((lang) => (
          <SelectItem key={lang.id} value={lang.value}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguagesDropdown
