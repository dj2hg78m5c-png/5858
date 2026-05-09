/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Music2, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { cn } from './lib/utils';

// Photo list (assuming users will upload 1.jpg to 12.jpg in the public folder)
const photos = [
  '/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg', '/6.jpg', 
  '/7.jpg', '/8.jpg', '/9.jpg', '/10.jpg', '/11.jpg', '/12.jpg'
];

const sections = [
  {
    text: "岁月从不败美人，\n时间只是为你添了些许沉淀的优雅。",
    images: ["/1.jpg", "/2.jpg"]
  },
  {
    text: "人们常颂赞母爱的伟大，\n但我更想欣赏你的美丽与洒脱。",
    images: ["/3.jpg", "/4.jpg"]
  },
  {
    text: "在成为任何人的母亲之前，\n你首先是你自己。",
    images: ["/5.jpg", "/6.jpg"]
  },
  {
    text: "去悦己，去奔赴，\n去感受这世界每一阵温柔的微风。",
    images: ["/7.jpg", "/8.jpg"]
  },
  {
    text: "别忘了，你也是被\n这个世界温柔爱着的女孩。",
    images: ["/9.jpg", "/10.jpg"]
  },
  {
    text: "做自己世界里，\n那个永远闪闪发光的女孩吧。",
    images: ["/11.jpg", "/12.jpg"]
  }
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio play failed:", e));
    }
  };

  // Background smooth scrolling or subtle parallax could be added here
  
  return (
    <div className="w-full min-h-screen bg-brand-bg text-brand-text font-serif selection:bg-brand-accent">
      {/* Background audio */}
      <audio 
        ref={audioRef} 
        loop 
        src="/yujian.mp3" 
      />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#A68D71 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
            <div className="text-center space-y-8 p-6 z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="w-2 h-2 bg-brand-olive rounded-full mx-auto animate-pulse mb-8" />
                <h1 className="text-4xl md:text-5xl font-light italic tracking-widest mb-4">
                  致 婷婷
                </h1>
                <p className="text-[11px] tracking-[0.2em] uppercase text-brand-accent font-semibold mt-2">
                  To Tingting
                </p>
              </motion.div>
              
              <motion.button
                onClick={handleEnter}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="group relative px-8 py-4 bg-white/30 backdrop-blur-sm border border-brand-border rounded-full text-brand-dark hover:bg-white/60 hover:text-brand-text transition-all duration-500"
              >
                <span className="flex items-center space-x-2">
                  <span className="tracking-widest text-sm uppercase">开启属于你的时光</span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative pb-32"
          >
            {/* Floating Music Controller */}
            <button 
              onClick={togglePlay}
              className={cn(
                "fixed top-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center border transition-all duration-300",
                isPlaying ? "bg-brand-bg text-brand-olive border-brand-border" : "bg-white/80 text-brand-accent border-brand-border"
              )}
            >
              {isPlaying ? (
                <div className="w-2.5 h-2.5 bg-brand-olive rounded-full animate-pulse" />
              ) : (
                <Music className="w-5 h-5" />
              )}
            </button>

            {/* Main Content Layout - Mobile First, Center desktop */}
            <main className="max-w-md mx-auto min-h-screen bg-white md:shadow-2xl relative overflow-hidden md:my-8 md:rounded-[40px] md:border-[8px] md:border-brand-border flex flex-col">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#A68D71 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
              
              {/* Cover Section */}
              <section className="min-h-screen relative flex items-center justify-center p-8 z-10 w-full">
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-center space-y-6 relative z-10"
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase text-brand-accent font-semibold mb-8">Mother's Day 2026</div>
                  <h1 className="text-4xl font-light italic leading-tight text-brand-text mb-6">
                    母亲节快乐
                  </h1>
                  <div className="flex justify-center space-x-1 mb-6">
                    <div className="w-4 h-0.5 bg-brand-accent"></div>
                    <div className="w-2 h-0.5 bg-brand-accent opacity-50"></div>
                  </div>
                  <p className="text-[11px] tracking-widest uppercase opacity-60 text-brand-accent mt-4">
                    做自己世界里<br/>闪闪发光的女孩
                  </p>
                </motion.div>
              </section>

              {/* Story Sections */}
              {sections.map((section, idx) => (
                <section key={idx} className="min-h-screen flex items-center justify-center py-20 px-6">
                  <div className="flex flex-col items-center space-y-16 w-full">
                    
                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1 }}
                      className="text-center"
                    >
                      <p className="text-lg leading-relaxed text-brand-dark italic whitespace-pre-line px-4">
                        {section.text}
                      </p>
                      <div className="h-[1px] w-12 bg-brand-border mx-auto mt-6"></div>
                    </motion.div>

                    {/* Image pairs or single */}
                    <div className="flex flex-col gap-12 w-full">
                      {section.images.map((src, imgIdx) => (
                        <ImageCard 
                          key={imgIdx} 
                          src={src} 
                          alt={`Tingting ${idx}-${imgIdx}`}
                          align={imgIdx % 2 === 0 ? 'left' : 'right'} 
                        />
                      ))}
                    </div>

                  </div>
                </section>
              ))}

              <section className="py-24 px-8 text-center bg-brand-bg/50 border-t border-brand-border relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  <h2 className="text-xl font-light italic text-brand-text tracking-widest mb-6">永远骄傲，永远婷婷</h2>
                  <div className="w-2 h-2 bg-brand-olive rounded-full mx-auto" />
                </motion.div>
              </section>

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloralDecoration({ align }: { align: 'left' | 'right' }) {
  const isLeft = align === 'left';
  return (
    <>
      <div className={cn(
        "absolute -z-10 pointer-events-none w-[150px] h-[200px]",
         isLeft ? "-bottom-12 -right-16" : "-bottom-12 -left-16"
      )}>
        <BottomVine flipped={!isLeft} />
      </div>
      <div className={cn(
        "absolute -z-10 pointer-events-none w-[120px] h-[150px]",
         isLeft ? "-top-8 -left-10" : "-top-8 -right-10"
      )}>
        <TopVine flipped={!isLeft} />
      </div>
    </>
  );
}

const Flower = ({ cx, cy, delay, scale = 1 }: { cx: number, cy: number, delay: number, scale?: number }) => (
  <motion.g 
    initial={{ opacity: 0, scale: 0, rotate: -45 }}
    whileInView={{ opacity: 1, scale: scale, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    <g transform={`translate(${cx}, ${cy})`}>
      {[0, 72, 144, 216, 288].map(angle => (
        <path key={angle} transform={`rotate(${angle})`} d="M 0 0 C -8 -10 -12 -20 0 -24 C 12 -20 8 -10 0 0" fill="var(--color-brand-accent)" opacity="0.95" />
      ))}
      <circle cx="0" cy="0" r="6" fill="var(--color-brand-olive)" />
      <circle cx="0" cy="0" r="2.5" fill="var(--color-brand-bg)" />
    </g>
  </motion.g>
);

const Leaf = ({ cx, cy, angle, delay, scale = 1 }: { cx: number, cy: number, angle: number, delay: number, scale?: number }) => (
  <motion.g
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: scale }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    <path 
      transform={`translate(${cx}, ${cy}) rotate(${angle})`}
      d="M 0 0 C 10 -8, 20 -4, 25 0 C 20 4, 10 8, 0 0" 
      fill="var(--color-brand-olive)" 
      opacity="0.8"
    />
  </motion.g>
);

function BottomVine({ flipped }: { flipped: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 150 200" fill="none" style={{ transform: flipped ? 'scaleX(-1)' : 'none', overflow: 'visible' }}>
      <motion.path 
        d="M 30 200 Q 60 140 90 80 T 130 20" 
        stroke="var(--color-brand-olive)" 
        strokeWidth="2" 
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeOut" }} }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path 
        d="M 60 140 Q 100 130 130 110" 
        stroke="var(--color-brand-olive)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1, ease: "easeOut", delay: 0.5 }} }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path 
        d="M 90 80 Q 120 70 145 50" 
        stroke="var(--color-brand-olive)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.8 }} }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      <Leaf cx={45} cy={165} angle={150} delay={0.4} scale={1.2} />
      <Leaf cx={75} cy={110} angle={200} delay={0.7} scale={1.1} />
      <Leaf cx={110} cy={50} angle={210} delay={1.1} scale={0.9} />
      
      <Leaf cx={90} cy={133} angle={30} delay={0.8} scale={1.1} />
      <Leaf cx={110} cy={122} angle={-30} delay={1.0} scale={0.9} />

      <Leaf cx={120} cy={76} angle={0} delay={1.0} scale={1} />

      <Flower cx={130} cy={110} delay={1.2} scale={1.2} />
      <Flower cx={145} cy={50} delay={1.4} scale={1.1} />
      <Flower cx={130} cy={20} delay={1.6} scale={0.9} />
      <Flower cx={85} cy={90} delay={1.3} scale={0.7} />
      <Flower cx={50} cy={140} delay={1.0} scale={0.8} />
    </svg>
  )
}

function TopVine({ flipped }: { flipped: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 150" fill="none" style={{ transform: flipped ? 'scaleX(-1)' : 'none', overflow: 'visible' }}>
      <motion.path 
        d="M 80 -10 Q 50 50 30 100 T 10 140" 
        stroke="var(--color-brand-olive)" 
        strokeWidth="2" 
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2, ease: "easeOut" }} }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path 
        d="M 60 30 Q 20 40 10 60" 
        stroke="var(--color-brand-olive)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }} }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      <Leaf cx={70} cy={10} angle={20} delay={0.2} scale={1.1} />
      <Leaf cx={45} cy={70} angle={-30} delay={0.6} scale={1.2} />
      <Leaf cx={25} cy={110} angle={150} delay={0.9} scale={1} />

      <Leaf cx={35} cy={37} angle={-160} delay={0.6} scale={0.9} />

      <Flower cx={10} cy={60} delay={1.0} scale={1.1} />
      <Flower cx={10} cy={140} delay={1.2} scale={0.9} />
      <Flower cx={40} cy={90} delay={1.1} scale={0.7} />
    </svg>
  )
}

function ImageCard({ src, alt, align }: { src: string, alt: string, align: 'left' | 'right' }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn(
        "relative w-[85%] z-10",
        align === 'left' ? "self-start ml-0" : "self-end mr-0"
      )}
    >
      <div className={cn(
        "relative shadow-xl overflow-hidden aspect-[4/5] bg-brand-border border-[6px] border-white flex flex-col items-center justify-center z-10",
        align === 'left' ? "rounded-t-[100px] rounded-br-[20px] rounded-bl-[100px]" : "rounded-t-[100px] rounded-bl-[20px] rounded-br-[100px]"
      )}>
        <div className="absolute inset-0 bg-brand-border animate-pulse -z-10" />
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-brand-bg text-brand-accent p-4 text-center">
            <ImageIcon className="w-8 h-8 mb-4 opacity-40" />
            <span className="text-xs italic">[ 照片: {src.replace('/', '')} ]</span>
          </div>
        ) : (
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <FloralDecoration align={align} />
    </motion.div>
  );
}

