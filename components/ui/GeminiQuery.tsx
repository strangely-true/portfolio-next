"use client";

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GeminiQueryProps {
  question: string;
}

const GeminiQuery = ({ question }: GeminiQueryProps) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskGemini = async () => {
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key not found. Please add it to your .env.local file.");
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(question);
      const response = await result.response;
      const text = response.text();
      setAnswer(text);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || "An error occurred while fetching the answer.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 my-8 max-w-2xl mx-auto">
      {/* Single Line Search Bar */}
      <div className="bg-gray-900/70 border border-gray-700 rounded-full p-4 flex items-center gap-4 shadow-lg">
        <div className="flex-1">
          <span className="text-gray-300 text-base">{question}</span>
        </div>
        <button 
          onClick={handleAskGemini}
          disabled={loading}
          className="bg-stone-800 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Ask</span>
              <Image 
                src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.50.0/files/dark/gemini-color.png" 
                alt="Gemini"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          )}
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-red-300 text-sm font-medium mb-1">Error</p>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Answer Display */}
      {answer && (
        <div className="mt-6 bg-gray-900/30 border border-gray-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Image 
              src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.50.0/files/dark/gemini-color.png" 
              alt="Gemini"
              width={32}
              height={32}
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="prose prose-invert prose-sm max-w-none text-gray-200 leading-relaxed prose-table:text-gray-200 prose-th:text-gray-100 prose-td:text-gray-300 prose-th:border-gray-600 prose-td:border-gray-600">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-gray-600 bg-gray-800/50 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-700/50">
                        {children}
                      </thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody className="divide-y divide-gray-600">
                        {children}
                      </tbody>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 border border-gray-600">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-sm text-gray-300 border border-gray-600">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiQuery;
