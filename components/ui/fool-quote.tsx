import React from 'react';

interface FoolQuoteProps {
  children: React.ReactNode;
}

const FoolQuote: React.FC<FoolQuoteProps> = ({ children }) => {
  return (
    <div className="my-6 p-4 bg-gray-800/50 border-l-4 border-rose-500 rounded-r-lg">
      <p className="font-bold text-rose-400 mb-2">The Fool Says:</p>
      <p className="text-gray-300 italic">{children}</p>
    </div>
  );
};

export default FoolQuote;
