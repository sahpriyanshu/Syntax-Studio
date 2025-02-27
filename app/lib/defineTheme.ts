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
  'material-darker': 'Material Darker',
  'night-owl': 'Night Owl',
  'aura': 'Aura Dark',
  'tomorrow-night': 'Tomorrow-Night',
  'solarized-dark': 'Solarized-dark',
  'solarized-light': 'Solarized-light',
  'github-dark': 'GitHub Dark',
  'github-light': 'GitHub Light',
  'quiet-light': 'Quiet Light',
  'material-lighter': 'Material Lighter',
  'min-light': 'Min Light',
  'oceanic-next': 'Oceanic Next',
  'cobalt': 'Cobalt',
  'twilight': 'Twilight',
  'tomorrow': 'Tomorrow',
  'xcode': 'Xcode_default',
  'chrome-devtools': 'Chrome DevTools'
}

async function loadTheme(themeName: string) {
  try {
    // Use the theme file map to get the correct filename
    const themeFileName = themeFileMap[themeName] || themeName
    const response = await fetch(`/themes/${themeFileName}.json`)
    if (!response.ok) throw new Error(`Failed to load theme: ${themeName}`)
    return await response.json()
  } catch (error) {
    console.error('Error loading theme:', error)
    return null
  }
}

const defineTheme = (theme: string) => {
  return new Promise((res) => {
    if (["vs-dark", "vs-light", "hc-black", "hc-light"].includes(theme)) {
      // These themes are built-in, no need to load external files
      res(null)
    } else {
      Promise.all([
        loader.init(),
        loadTheme(theme)
      ]).then(([monaco, themeData]) => {
        if (themeData) {
          monaco.editor.defineTheme(theme, themeData)
        }
        res(null)
      }).catch(error => {
        console.error('Error defining theme:', error)
        res(null)
      })
    }
  })
}

export { defineTheme, monacoThemes }
