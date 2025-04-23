'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Code, Loader2 } from 'lucide-react';

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
];

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: '/api/explain',
  });

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    // Format the code submission with language info
    const prompt = `Please explain this ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``;
    setInput(prompt);
    
    // Submit the chat form
    const form = document.createElement('form');
    form.addEventListener('submit', handleSubmit);
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get the last assistant message to display as the explanation
  const explanation = messages
    .filter(message => message.role === 'assistant')
    .pop()?.content || '';

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 bg-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <Code className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Code Explainer</h1>
            </div>
            <p className="mt-2 opacity-90">
              Paste your code and get a detailed explanation in plain language
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-900">
                  Your Code
                </label>
                <div className="flex items-center">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mr-2 block text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="relative flex-grow">
                <textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full min-h-[400px] p-4 font-mono text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                  placeholder="Paste your code here..."
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(code)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleCodeSubmit}
                disabled={isLoading || !code.trim()}
                className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium 
                  ${isLoading || !code.trim() 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Explaining...
                  </span>
                ) : (
                  'Explain This Code'
                )}
              </button>
            </div>

            <div className="flex flex-col h-full">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Explanation</h2>
              <div className="flex-grow p-6 bg-gray-50 rounded-md border border-gray-200 overflow-y-auto min-h-[400px]">
                {explanation ? (
                  <div className="prose max-w-none text-gray-900">
                    {explanation.split('\n').map((line, index) => (
                      <p key={index} className={line.startsWith('#') ? 'font-bold mt-4' : 'mt-2'}>
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-600 italic">
                    Your explanation will appear here...
                  </div>
                )}
              </div>
              {explanation && (
                <button
                  onClick={() => copyToClipboard(explanation)}
                  className="mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
                >
                  {copied ? 'Copied!' : 'Copy explanation'}
                  <Copy className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-700">
          <p>Powered by OpenAI and Vercel AI SDK</p>
        </div>

        {/* Hidden input for ai/react's useChat hook */}
        <form onSubmit={handleSubmit} className="hidden">
          <input
            name="userMessage"
            value={input}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </main>
  );
}
