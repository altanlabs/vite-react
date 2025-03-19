import { motion } from "framer-motion"
import { SplashCursor } from "@/components/ui/SplashCursor"
import { TextShimmerWave } from "@/components/ui/TextShimmerWave"

export default function IndexPage() {
  return (
    <>
      <SplashCursor />
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <motion.section 
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <TextShimmerWave 
            as="h1" 
            className="text-2xl md:text-3xl"
            duration={2}
            spread={1.2}
          >
            Altan is creating your app
          </TextShimmerWave>
          <p className="text-lg md:text-xl text-gray-300">
            Play with the cursor in the meantime
          </p>
        </motion.section>
      </div>
    </>
  )
}
