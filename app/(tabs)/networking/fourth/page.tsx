'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

export default function Fourth() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="mx-auto sm:w-[500px] md:w-[650px] lg:w-[700px]">
          <iframe
            height="430"
            src="https://www.youtube.com/embed/69VkDiefCX4?si=svHUYwHZRLNTv3z8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full"
          ></iframe>
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <h1 className="text-4xl font-semibold bg-blue-500 rounded-md p-2 mb-5">
            👉🏻 과제4 - 비동기 프로그래밍 01
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
              <h1 className="text-3xl font-semibold">
                ✅ 비동기 프로그래밍이란?
              </h1>
            </div>
            {isClicked1 && (
              <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
                <p>
                  <span className="text-blue-400">비동기 프로그래밍</span>이란
                  무엇이고 왜 비동기 방식을 사용하는지, 비동기 방식에는 어떠한
                  방식이 있으며,
                  <br /> 각각의 장단점은 무엇인지에 대해 간단하게 글로
                  기록했습니다! (아래의 링크를 확인해주세요!) <br /> <br />
                  <Link href="https://velog.io/@cllaude/%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D">
                    👉🏻 비동기 프로그래밍이란?
                  </Link>
                </p>
              </div>
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
              <h1 className="text-3xl font-semibold">🎯 과제 목표</h1>
            </div>
            {isClicked2 && (
              <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
                <p>
                  <span className="text-blue-400">개발자</span>는 단순히 코드를
                  구현하는 사람이 아닌, <br />
                  주어진{' '}
                  <span className="text-blue-400">문제가 무엇인지 정의</span>
                  하고 이를{' '}
                  <span className="text-blue-400">
                    논리적인 흐름에 따라 해결
                  </span>
                  하는 사람이라고 생각합니다.
                  <br /> 따라서 구현으로 바로 넘어가기에 앞서, 문제 분석 및
                  설계과정을 통해 주어진 문제를 어떠한 관점으로 바라볼 것인지,{' '}
                  <br />
                  또, 어떤 방식으로 해결해 나갈 것인지{' '}
                  <span className="text-blue-400">스스로 고민</span>해보는
                  경험을 하는 것이 목표입니다.
                </p>
              </div>
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
              <h1 className="text-3xl font-semibold">🙌 과제</h1>
            </div>
            {isClicked3 && (
              <div className="bg-neutral-800 w-full h-max rounded-md flex items-center p-5 text-lg">
                <p>
                  비동기 프로그래밍 01 과제는{' '}
                  <span className="text-blue-400">
                    정답이 따로 존재하지 않습니다.
                  </span>{' '}
                  <br />
                  문제에서 주어진 요구사항을 확인하고,{' '}
                  <span className="text-blue-400">
                    어떠한 관점으로 주어진 문제를 바라보았는지
                  </span>
                  , <br />
                  또, <span className="text-blue-400">문제를 어떻게 분석</span>
                  하였으며 주어진{' '}
                  <span className="text-blue-400">
                    문제를 해결하기 위해 어떻게 설계하였는지
                  </span>
                  에 대해 각자 분석하고 설계한 방법을{' '}
                  <span className="text-blue-400">Colog</span>에 기록하고 아래
                  과제 코드 공유 토글에 공유해주시면 됩니다!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
