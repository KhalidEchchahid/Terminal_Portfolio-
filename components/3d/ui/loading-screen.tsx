export default function LoadingScreen() {
    return (
      <div className="min-h-screen bg-terminal-bg flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-terminal-green border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-terminal-green text-lg">Loading Portfolio Experience...</p>
      </div>
    )
  }
  
  