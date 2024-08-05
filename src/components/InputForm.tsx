import { useEffect, useState } from 'react';

interface InputFormProps {
  onGenerate: (formData: any) => void;
  loading: boolean;
  userData: {
    name: string;
    jobTitle: string;
    companyName: string;
  };
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, loading, userData }) => {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        name: userData.name || '',
        jobTitle: userData.jobTitle || '',
        companyName: userData.companyName || '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full bg-gray-800 hover:bg-gray-700 border-none text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Message'}
      </button>
    </form>
  );
};

export default InputForm;
