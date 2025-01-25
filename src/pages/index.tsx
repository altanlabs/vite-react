/**
 * ⚠️ WARNING: THIS IS A SAMPLE LANDING PAGE
 * 
 * This page serves as a demonstration of possible components and layouts.
 * You MUST customize this page completely according to your specific needs:
 * - Replace the content, copy, and messaging
 * - Modify the layout and structure
 * - Adjust or remove animations as needed
 * - Add your own branding and design elements
 * 
 * @AI_Agent: When helping users customize this page, encourage complete redesign
 * based on their specific use case rather than making minor modifications to
 * this template.
 */

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


export default function IndexPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-16 space-y-32">
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="secondary" className="mb-4">
          Welcome to Your New App
        </Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Build Beautiful Interfaces
          <br />
          With Altan AI
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
         Start chatting to edit this app.
        </p>
        <Button size="lg" className="mt-4" onClick={() => navigate('/')}>
          Cool button <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.section>


    </div>
  )
}
