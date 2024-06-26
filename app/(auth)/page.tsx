'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

export default function Home() {
  const [text1] = useTypewriter({
    words: ['Cotato'],
    loop: 1, // 한 번만 반복
    typeSpeed: 70,
  });

  const [showSecondText, setShowSecondText] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [text2] = useTypewriter({
    words: ['Cotato FE Networking'],
    loop: 1, // 한 번만 반복
    typeSpeed: 100,
  });

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSecondText(true);
    }, 0); // Cotato가 타이핑된 후에 3초 후에 Cotato FE Networking 타이핑 시작

    const timer2 = setTimeout(() => {
      setShowSecondSection(true);
    }, 2500); // 전체 타이핑이 끝난 후 3초 후에 두 번째 섹션 나타남

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="my-auto flex flex-col items-center gap-2 *:font-medium w-[60%]"
      >
        <h1 className="text-8xl -mt-7">{text1}</h1>
        <h2 className="text-4xl flex text-center">
          {showSecondText && (
            <>
              {text2}
              <Cursor />
            </>
          )}
        </h2>
      </motion.div>
      {showSecondSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-3 w-[40%] min-w-[300px]"
        >
          <Link href="/create-account" className="primary-btn py-2.5 text-lg">
            Cotato 가입하기
          </Link>
          <div className="flex gap-2 mt-2">
            <span className="flex shrink-0 font-semibold">
              👉🏻 이미 계정이 있나요?
            </span>
            <Link
              href="/login"
              className="hover:underline underline-offset-2 flex shrink-0"
            >
              로그인
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
