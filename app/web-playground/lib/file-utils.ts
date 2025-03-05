export function getLanguageFromFileName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  
  const languageMap: { [key: string]: string } = {
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'json': 'json',
    'md': 'markdown',
    'py': 'python',
    'rb': 'ruby',
    'php': 'php',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'hs': 'haskell',
    'pl': 'perl',
    'r': 'r',
    'jl': 'julia',
    'm': 'objectivec',
    'txt': 'plaintext'
  }

  return languageMap[extension] || 'plaintext'
}

export function getMimeType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  
  const mimeMap: { [key: string]: string } = {
    'html': 'text/html',
    'htm': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'jsx': 'text/javascript',
    'ts': 'text/typescript',
    'tsx': 'text/typescript',
    'json': 'application/json',
    'md': 'text/markdown',
    'txt': 'text/plain'
  }

  return mimeMap[extension] || 'text/plain'
}
