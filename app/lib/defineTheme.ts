import { loader } from "@monaco-editor/react"

const monacoThemes = {
  "vs-dark": "VS Dark",
  "vs-light": "VS Light",
  "hc-black": "High Contrast Dark",
  "hc-light": "High Contrast Light",
  "github-dark": "GitHub Dark",
  "github-light": "GitHub Light",
  monokai: "Monokai",
  dracula: "Dracula",
  nord: "Nord",
  "solarized-dark": "Solarized Dark",
  "solarized-light": "Solarized Light",
}

const themeFileMap: Record<string, string> = {
  'dracula': 'Dracula',
  'monokai': 'Monokai',
  'monokai-bright': 'Monokai Bright',
  'night-owl': 'Night Owl',
  'oceanic-next': 'Oceanic Next',
  'solarized-dark': 'Solarized-dark',
  'solarized-light': 'Solarized-light',
  'github-dark': 'GitHub Dark',
  'github-light': 'GitHub Light',
  'tomorrow-night': 'Tomorrow-Night',
  'tomorrow-night-blue': 'Tomorrow-Night-Blue',
  'tomorrow-night-bright': 'Tomorrow-Night-Bright',
  'tomorrow-night-eighties': 'Tomorrow-Night-Eighties',
  'tomorrow': 'Tomorrow',
  'twilight': 'Twilight',
  'cobalt': 'Cobalt',
  'cobalt2': 'Cobalt2',
  'nord': 'Nord',
  'xcode': 'Xcode_default',
  'chrome-devtools': 'Chrome DevTools',
  'vs-dark': 'vs-dark',
  'vs-light': 'vs-light'
}

async function loadTheme(themeName: string) {
  try {
    // Built-in themes don't need to be loaded
    if (themeName === 'vs-dark' || themeName === 'vs-light') {
      return null;
    }

    // Use the theme file map to get the correct filename
    const themeFileName = themeFileMap[themeName]
    if (!themeFileName) {
      console.warn(`Theme file mapping not found for: ${themeName}`)
      return null
    }

    const response = await fetch(`/themes/${themeFileName}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load theme: ${themeName}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading theme:', error)
    return null
  }
}

export async function defineTheme(theme: string) {
  try {
    // Get the Monaco loader
    const monaco = await loader.init()

    // Handle built-in themes
    if (theme === 'vs-dark' || theme === 'vs-light') {
      monaco.editor.setTheme(theme)
      return
    }

    const themeData = await loadTheme(theme)
    if (!themeData) {
      console.warn(`Theme data not found for: ${theme}. Falling back to vs-dark.`)
      monaco.editor.setTheme('vs-dark')
      return
    }

    // Define the theme
    monaco.editor.defineTheme(theme, themeData)
    monaco.editor.setTheme(theme)
  } catch (error) {
    console.error('Error defining theme:', error)
    // Fallback to vs-dark on error
    const monaco = await loader.init()
    monaco.editor.setTheme('vs-dark')
  }
}

export { monacoThemes }
