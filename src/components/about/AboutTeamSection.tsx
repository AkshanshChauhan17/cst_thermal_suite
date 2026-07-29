"use client";

import { motion, Variants } from "framer-motion";

export default function AboutTeamSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const teamMembers = [
    {
      name: "Rahul Desai",
      role: "Founder & CEO",
    },
    {
      name: "Priya Sharma",
      role: "Chief Product Officer",
    },
    {
      name: "Vikram Patel",
      role: "Head of Thermal Engineering",
    },
    {
      name: "Ananya Singh",
      role: "Director of SaaS Architecture",
    },
    {
      name: "Neha Gupta",
      role: "Director of Finance",
    },
    {
      name: "Arjun Reddy",
      role: "Lead Hardware Integration",
    },
    {
      name: "Kavya Iyer",
      role: "Principal Product Designer",
    },
    {
      name: "Rohan Mehta",
      role: "Senior Token Economist",
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6"
          >
            Leadership
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight"
          >
            Meet our engineering leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            A dedicated group of industrial hardware experts and SaaS architects driving the future of computational thermodynamics across India.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col items-center group"
            >
              <div className="w-full aspect-[4/5] bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-6 group-hover:border-[#5648FC] transition-colors duration-300 relative overflow-hidden">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs z-10 text-center px-4">
                  Photo Placeholder
                </span>
                <div className="absolute inset-0 bg-[#5648FC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-bold text-[#1E1B4B] mb-1">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}