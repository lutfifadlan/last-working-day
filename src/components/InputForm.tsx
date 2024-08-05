import { useState } from 'react';

interface Props {
  onGenerate: (formData: any) => void;
  loading: boolean;
}

const InputForm: React.FC<Props> = ({ onGenerate, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    highlights: '',
    memories: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="label text-gray-900 dark:text-gray-100">
          <span className="label-text">Your Name</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label text-gray-900 dark:text-gray-100">
          <span className="label-text">Your Position</span>
        </label>
        <input
          type="text"
          name="position"
          className="input input-bordered bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={formData.position}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label text-gray-900 dark:text-gray-100">
          <span className="label-text">Your Achievements at the Company</span>
        </label>
        <textarea
          name="highlights"
          className="textarea textarea-bordered bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={formData.highlights}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label text-gray-900 dark:text-gray-100">
          <span className="label-text">Your Memories</span>
        </label>
        <textarea
          name="memories"
          className="textarea textarea-bordered bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={formData.memories}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-primary w-full bg-gray-800 hover:bg-gray-700 border-none text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
              Generating your message, please wait...
            </>
          ) : 'Generate Message'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
