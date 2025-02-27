export const editorThemes = {
  dark: [
    { id: "vs-dark", name: "Visual Studio Dark" },
    { id: "github-dark", name: "GitHub Dark" },
    { id: "dracula", name: "Dracula" },
    { id: "monokai", name: "Monokai" },
    { id: "material-darker", name: "Material Darker" },
    { id: "night-owl", name: "Night Owl" },
    { id: "aura", name: "Aura Dark" },
    { id: "tomorrow-night", name: "Tomorrow Night" },
    { id: "solarized-dark", name: "Solarized Dark" },
    { id: "one-dark-pro", name: "One Dark Pro" },
    { id: "cobalt", name: "Cobalt" },
    { id: "twilight", name: "Twilight" },
    { id: "oceanic-next", name: "Oceanic Next" },
    { id: "merbivore", name: "Merbivore" },
  ],
  light: [
    { id: "vs-light", name: "Visual Studio Light" },
    { id: "github-light", name: "GitHub Light" },
    { id: "solarized-light", name: "Solarized Light" },
    { id: "quiet-light", name: "Quiet Light" },
    { id: "material-lighter", name: "Material Lighter" },
    { id: "min-light", name: "Min Light" },
    { id: "tomorrow", name: "Tomorrow" },
    { id: "xcode", name: "Xcode" },
    { id: "chrome-devtools", name: "Chrome DevTools" },
  ]
}

export type EditorTheme = keyof typeof editorThemes
export type ThemeId = typeof editorThemes[EditorTheme][number]["id"]
