import { AlertCircle } from 'lucide-react';

export default function ErrorDisplay({ errorDetails }) {
  if (!errorDetails?.type) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex items-center gap-2 text-red-700 font-medium">
        <AlertCircle className="w-5 h-5" />
        {errorDetails.message}
      </div>
      {errorDetails.suggestions?.length > 0 && (
        <ul className="mt-2 text-sm text-red-600 space-y-1">
          {errorDetails.suggestions.map((suggestion, index) => (
            <li key={index}>• {suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
