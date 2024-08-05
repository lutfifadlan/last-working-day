import { useState, useEffect } from 'react';
import Link from 'next/link';
import InputForm from '../components/InputForm';
import GeneratedMessage from '../components/GeneratedMessage';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface UserData {
  name: string;
  position: string;
  highlights: string;
  memories: string;
}

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const theme = darkMode === false ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  };

  const generateMessage = async (formData: UserData) => {
    setLoadingMessage(true);
    const response = await fetch('/api/generate-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message);
    setLoadingMessage(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <img src="/background-image.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="w-full max-w-2xl bg-base-100 p-8 rounded-lg shadow-xl z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Last Working Day Message Generator</h1>
          <button onClick={toggleDarkMode} className="btn btn-sm btn-ghost">
            {darkMode ? <SunIcon className="h-6 w-6 text-gray-500" /> : <MoonIcon className="h-6 w-6 text-gray-500" />}
          </button>
        </div>
        <InputForm onGenerate={generateMessage} loading={loadingMessage} />
        {message && <GeneratedMessage message={message} />}
        <footer className="mt-4 text-center">
          <Link href="/privacy-policy" className="text-sm text-gray-600 hover:underline">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Home;
