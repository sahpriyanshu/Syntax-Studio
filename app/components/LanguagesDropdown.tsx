import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languageOptions } from "../constants/languageOptions"

const LanguagesDropdown = ({ language, onSelectChange }) => {
  return (
    <Select
      value={language.value}
      onValueChange={(value) => {
        const selectedLang = languageOptions.find((lang) => lang.value === value)
        onSelectChange(selectedLang)
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

