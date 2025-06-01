{
  /* THIS IS A DEMO SAMPLE WHILE THE APP IS SPINNING, PLEASE REPLACE IT COMPLETELY */
}

import { TextShimmer } from "@/components/example/TextShimmer";
import { DidYouKnow } from "@/components/example/DidYouKnow";

function App() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl h-40 relative px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 z-30">
            <TextShimmer
              className="font-mono text-base sm:text-lg"
              duration={1.4}
            >
              Generating interface...
            </TextShimmer>
          </div>

          {/* Radial Gradient */}
          <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,var(--tw-gradient-to))]" />
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto px-4 mb-8">
        <DidYouKnow />
      </div>
    </div>
  );
}

export default App;
