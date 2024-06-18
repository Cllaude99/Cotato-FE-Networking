'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function First() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto">
        <iframe
          width="680"
          height="400"
          src="https://www.youtube.com/embed/rAqjY9QM-4k?si=mtjof3ErVFfdimPZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="flex flex-col gap-5 mt-8">
        <h1 className="text-3xl font-semibold bg-blue-500 rounded-md p-2">
          👉🏻 과제1 - 계산기 만들기
        </h1>
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 items-center">
            {isClicked1 ? (
              <ChevronDownIcon
                className="size-5 cursor-pointer"
                onClick={() => setIsClicked1((prev) => !prev)}
              />
            ) : (
              <ChevronUpIcon
                className="size-5 cursor-pointer"
                onClick={() => setIsClicked1((prev) => !prev)}
              />
            )}
            <h1 className="text-2xl font-semibold">✅ 요구사항</h1>
          </div>
          {isClicked1 && (
            <div className="bg-neutral-800 w-full h-24 rounded-md"></div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {isClicked2 ? (
              <ChevronDownIcon
                className="size-5 cursor-pointer"
                onClick={() => setIsClicked2((prev) => !prev)}
              />
            ) : (
              <ChevronUpIcon
                className="size-5 cursor-pointer"
                onClick={() => setIsClicked2((prev) => !prev)}
              />
            )}
            <h1 className="text-2xl font-semibold">🎯 참고사항</h1>
          </div>
          {isClicked2 && (
            <div className="bg-neutral-800 w-full h-24 rounded-md"></div>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            {isClicked3 ? (
              <ChevronDownIcon
                className="size-5 cursor-pointer"
                onClick={() => setIsClicked3((prev) => !prev)}
              />
            ) : (
              <ChevronUpIcon
                className="size-5 cursor-pointer"
                onClick={() => setIsClicked3((prev) => !prev)}
              />
            )}
            <h1 className="text-2xl font-semibold">🙌 Solution</h1>
          </div>
          {isClicked3 && (
            <div className="bg-neutral-800 w-full h-24 rounded-md"></div>
          )}
        </div>
      </div>
    </div>
  );
}
