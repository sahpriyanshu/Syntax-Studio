import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Bot } from 'lucide-react';

interface AIGenerationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (mode: 'generate' | 'improve', prompt: string) => Promise<void>;
  currentCode?: string;
  isLoading?: boolean;
}

export function AIGenerationDialog({
  isOpen,
  onClose,
  onGenerate,
  currentCode,
  isLoading
}: AIGenerationDialogProps) {
  const [mode, setMode] = useState<'generate' | 'improve'>('generate');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerate(mode, prompt);
    setPrompt('');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[10vh]"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl">
        <div className="rounded-lg bg-zinc-800 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-white">AI Code Generation</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors duration-200"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-2 text-sm text-zinc-400">
            Describe what you want to create. AI will generate code which is optimized for performance and accessibility.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setMode('generate')}
              className={`flex items-center gap-2 rounded px-4 py-2 text-sm ${
                mode === 'generate'
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              <span className="hidden sm:inline">✨</span> Write New Code
            </button>
            <button
              onClick={() => setMode('improve')}
              className={`flex items-center gap-2 rounded px-4 py-2 text-sm ${
                mode === 'improve'
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
              disabled={!currentCode}
            >
              <span className="hidden sm:inline">💡</span> Improve Code
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'generate'
                  ? 'Suggests Examples:\n -Create a Restaurant Website\n -Build a Nonprofit Organization Website\n -Design a Fitness Studio Website\n -Build an Online Learning Platform\n -Create a Photography Portfolio Website'
                  : 'Describe how you want to improve the current code...'
              }
              className="h-32 w-full rounded bg-zinc-900 p-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />

            <div className="mt-4 flex items-start gap-4">
              <div className="flex-1">
                {mode === 'generate' && !isLoading && (
                  <div className="text-sm text-zinc-400">
                    <div className="mb-2">Tips for better results:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Be specific about functionality</li>
                      <li>Keep it simple and focused</li>
                      <li>Maximum 50 lines of code</li>
                    </ul>
                  </div>
                )}
                {isLoading && (
                  <div className="flex items-center gap-3 text-sm bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 animate-pulse-border">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-blue-500"></div>
                    <div className="space-y-1">
                      <p className="text-zinc-300 flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-500" />
                        Generating optimized code...
                      </p>
                      <p className="text-zinc-500 text-xs">
                        This usually takes 10-15 seconds
                      </p>
                    </div>
                  </div>
                )}
                {mode === 'improve' && (
                  <div className="text-sm text-zinc-400">
                    <div className="mb-2">Common improvements:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Error handling</li>
                      <li>Input validation</li>
                      <li>Code optimization</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!prompt || isLoading}
                  className={`flex items-center gap-2 rounded px-4 py-2 text-sm ${
                    !prompt || isLoading
                      ? 'bg-zinc-700 text-zinc-500'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {mode === 'generate' ? 'Generate' : 'Improve'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
