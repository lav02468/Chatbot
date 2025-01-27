import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
          Welcome to AI Chatbot
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Your personal AI assistant for meaningful conversations
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
