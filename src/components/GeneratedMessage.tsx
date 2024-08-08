import { useState } from 'react';
import { Button } from './ui/button';

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
      <Button
        onClick={copyToClipboard}
        className="mt-4 w-full"
      >
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </Button>
    </div>
  );
};

export default GeneratedMessage;
