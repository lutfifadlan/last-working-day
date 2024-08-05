import { useState } from 'react';
import InputForm from '../components/InputForm';
import GeneratedMessage from '../components/GeneratedMessage';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    );
  };

  const generateMessage = async (formData: any) => {
    const response = await fetch('/api/generate-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <img src="/background-image.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="w-full max-w-lg bg-base-100 p-6 rounded-lg shadow-xl z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Last Day Message Generator</h1>
          <button onClick={toggleDarkMode} className="btn btn-sm btn-ghost">
            {darkMode ? <SunIcon className="h-6 w-6 text-gray-500" /> : <MoonIcon className="h-6 w-6 text-gray-500" />}
          </button>
        </div>
        <InputForm onGenerate={generateMessage} />
        {message && <GeneratedMessage message={message} />}
      </div>
    </div>
  );
};

export default Home;
