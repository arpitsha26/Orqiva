import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
function LoadingAnimation() {

    const Thinking_Lables = ["Thinking", "Analyzing", "Reasoning", "Generating"]
    const [labelIndex, setLabelIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLabelIndex((prev) => (prev + 1) % Thinking_Lables.length)
        }, 1800)
        return () => clearInterval(interval)
    }, [])

    const label = Thinking_Lables[labelIndex]

    return (
        <div className='flex items-center gap-3 max-w-[72%] py-1'>
            <div className='relative w-9 h-9 flex items-center justify-center shrink-0'>
                {
                    [0, 0.45, 0.9].map((delay, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full border border-cyan-400/30"
                            initial={{ scale: 0.3, opacity: 0.55 }}
                            animate={{ scale: 1.7, opacity: 0 }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                delay,
                                ease: "easeOut",
                            }}

                        />
                    ))
                }

                <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400"
                    style={{ boxShadow: "0 0 14px rgba(125,211,252,0.55)" }}
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}


                />
            </div>
            <div className='flex overflow-hidden'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={label}
                        className="flex"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        {
                            label.split("").map((ch, i) => (
                                <motion.div
                                    key={i}
                                    className="text-[13px] font-medium tracking-wide text-slate-400"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 1.4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.07,
                                    }}

                                >
                                    {ch}
                                </motion.div>
                            ))
                        }

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    )
}

export default LoadingAnimation
