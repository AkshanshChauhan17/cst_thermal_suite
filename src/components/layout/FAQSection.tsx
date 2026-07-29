"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const answerVariants: Variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      marginTop: 16,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      marginTop: 0,
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  const faqs = [
    {
      question: "What exactly is the Thermal Suite platform?",
      answer: "Thermal Suite is a hybrid enterprise solution bridging high-performance physical thermal coils with an advanced SaaS computational engine. It allows engineering teams to calculate, optimize, and test thermal dynamics using a seamless token-based ecosystem."
    },
    {
      question: "How does the Token Depletion Engine work?",
      answer: "Our system deducts tokens incrementally based on the computational weight of your active calculations. You are charged only for the processing power you consume, ensuring complete transparency and cost efficiency."
    },
    {
      question: "What happens if I run out of tokens during a session?",
      answer: "If your balance hits zero, the Depletion Lock is instantly activated. Your active session is safely suspended and the UI is blurred with a warning prompt. You will not lose your work."
    },
    {
      question: "Can I top up tokens without losing my active calculation?",
      answer: "Yes. When the Depletion Lock activates, the overlay prompt offers a frictionless immediate credit purchase flow. Once topped up, your session resumes instantly from the exact point it was paused."
    },
    {
      question: "How secure is my proprietary thermal data?",
      answer: "We utilize enterprise-grade encryption and isolated data environments. Your proprietary hardware configurations, engineering blueprints, and computational outputs are strictly protected and never shared."
    },
    {
      question: "Can admins manage access for different engineering teams?",
      answer: "Absolutely. The Admin Dashboard provides global oversight. Administrators can monitor active tool states, audit token ledgers, and use one-click access overrides to lock or unlock tools for specific users regardless of balance."
    },
    {
      question: "Are the computational tools available if I don't purchase tokens?",
      answer: "If no action is taken to top up after a depletion lock, or if a user navigates away, the specific tool vanishes from the active dashboard and reverts to the platform's global marketplace as an unowned item."
    },
    {
      question: "Do you offer priority support for enterprise clients in India?",
      answer: "Yes, our enterprise tier includes 24/7 priority support, dedicated account managers, and immediate technical assistance tailored for our Indian and global manufacturing partners."
    }
  ];

  return (
    <section className="w-full bg-[#F7F8FA] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-4 tracking-tight"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            We have put together some commonly asked questions regarding our computational tools and token ecosystem.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white border border-gray-200 shadow-sm self-start"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-[#1E1B4B] text-[15px] pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 text-[#5648FC]">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden px-6"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed pb-6 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}