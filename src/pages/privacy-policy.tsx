const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-base-100 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we handle your personal information and data.
        </p>
        <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We do not collect any personal data or store any information in a database. All requests are directly forwarded to the OpenAI API for processing.
        </p>
        <h2 className="text-2xl font-bold mb-2">How We Use Information</h2>
        <p className="mb-4">
          The information you provide in the input form is used solely to generate the last working day message using the OpenAI API. We do not store this information.
        </p>
        <h2 className="text-2xl font-bold mb-2">Third-Party Services</h2>
        <p className="mb-4">
          We use the OpenAI API to process your input and generate messages. The OpenAI API is a third-party service, and their privacy policy governs the handling of your data.
        </p>
        <h2 className="text-2xl font-bold mb-2">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We encourage you to review this policy periodically for any changes.
        </p>
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
