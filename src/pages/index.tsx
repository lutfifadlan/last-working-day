import { useState } from 'react';
import Link from 'next/link';
import GeneratedMessage from '../components/GeneratedMessage';
import { ModeToggle } from '@/components/ModeToggle';
import InputsForm from '../components/Input';
import Image from 'next/image';
// import RetroGrid from "@/components/magicui/retro-grid";
import DotPattern from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';

interface UserData {
  name: string;
  position: string;
  highlights: string;
  memories: string;
}

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);

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
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] ",
        )}
      />
      <Image
        src="/background-image.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-30"
      />
      <div className="w-full max-w-2xl bg-base-100 p-8 rounded-lg shadow-xl z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Last Working Day Message Generator</h1>
          <ModeToggle/>
        </div>
        <InputsForm onGenerate={generateMessage} loading={loadingMessage} />
        {message && <GeneratedMessage message={message} />}
        <footer className="mt-4 text-center">
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Home;
