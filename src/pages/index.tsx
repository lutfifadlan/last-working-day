import { useState, useEffect } from 'react';
import Link from 'next/link';
import InputForm from '../components/InputForm';
import GeneratedMessage from '../components/GeneratedMessage';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';

interface UserData {
  name: string;
  position: string;
  highlights: string;
  memories: string;
}

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    position: '',
    highlights: '',
    memories: '',
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
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

  const fetchLinkedInData = async () => {
    // Fetch LinkedIn data here
    // This is a placeholder function. You would need to implement the actual data fetching logic.
    // Assuming we get name, position, highlights, and memories from LinkedIn profile
    const data = {
      name: 'John Doe',
      position: 'Software Engineer',
      highlights: 'Implemented new features and optimized existing codebase.',
      memories: 'Working with a fantastic team on challenging projects.',
    };
    setUserData(data);
  };

  useEffect(() => {
    if (session && status === 'authenticated') {
      fetchLinkedInData();
    }
  }, [session, status]);

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
        {status === 'unauthenticated' ? (
          <div>
            <p className="mb-4">You can manually input your data in the form below or sign in with LinkedIn to automatically fill in the data based on your LinkedIn profile.</p>
            <button onClick={() => signIn('linkedin')} className="btn btn-primary mb-4 bg-gray-800 hover:bg-gray-700 border-none text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200" disabled>Sign in with LinkedIn</button>
          </div>
        ) : (
          <div>
            <button onClick={() => signOut()} className="btn btn-primary mb-4 bg-gray-800 hover:bg-gray-700 border-none text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200" disabled>Sign out</button>
            <p className="mb-4">Signed in as {session?.user?.name}. Your data has been automatically filled in from your LinkedIn profile. You can edit the data in the form below if needed.</p>
          </div>
        )}
        <InputForm onGenerate={generateMessage} loading={loadingMessage} userData={userData} />
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
