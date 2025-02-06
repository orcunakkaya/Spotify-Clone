export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full py-4 space-x-1">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s] bg-subdued"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s] bg-subdued"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce bg-subdued"></span>
      </div>
    );
  }