import { useState } from 'react';

interface Props {
  message: string;
}

const GeneratedMessage: React.FC<Props> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Generated Message</h2>
      <div className="bg-base-200 p-4 rounded-lg shadow-inner">
        <p className="whitespace-pre-line">{message}</p>
      </div>
      <button
        onClick={copyToClipboard}
        className="mt-4 btn btn-primary w-full bg-gray-800 hover:bg-gray-700 border-none text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

export default GeneratedMessage;
