{/* THIS IS A DEMO SAMPLE WHILE THE APP IS SPINNING, PLEASE REPLACE IT COMPLETELY */}

import { TextShimmer } from "@/components/ui/TextShimmer";
import { DidYouKnow } from "@/components/ui/DidYouKnow";
import { SparklesCore } from "@/components/ui/Sparkles";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#09090b] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-[40rem] h-40 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 z-30">
            <TextShimmer
              className="font-mono text-base sm:text-lg"
              duration={1.4}
            >
              Generating your app...
            </TextShimmer>
          </div>

          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient */}
          <div className="absolute inset-0 w-full h-full bg-[#09090b] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto px-4 mb-8">
        <DidYouKnow />
      </div>
    </div>
  );
}

export default App;
