'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function First() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto sm:w-[500px] md:w-[650px] lg:w-[700px]">
        <iframe
          height="430"
          src="https://www.youtube.com/embed/rAqjY9QM-4k?si=mtjof3ErVFfdimPZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full"
        ></iframe>
      </div>
      <div className="flex flex-col gap-5 mt-8">
        <h1 className="text-4xl font-semibold bg-blue-500 rounded-md p-2 mb-5">
          👉🏻 과제1 - 계산기 만들기
        </h1>
        <h2>
          <a
            href="https://github.com/IT-Cotato/9th-FE-Networking-1"
            target="_blank"
            className="text-white cursor-pointer font-semibold text-lg hover:text-blue-400 transition-colors"
          >
            <span>{'🔥'}</span> 템플릿 코드 보러가기 (클릭)
          </a>
        </h2>
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
            <h1 className="text-3xl font-semibold">✅ 요구사항</h1>
          </div>
          {isClicked1 && (
            <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
              <p>1. 위와 같이 동작하는 계산기를 만들어 주세요!</p>
              <p>
                2. type이 number인{' '}
                <span className="text-red-400">input 태그</span>를 사용해
                입력값을 받도록 해주세요.
              </p>
              <p>
                3. <span className="text-red-400">select태그, option태그</span>{' '}
                으로 산술연산자를 고를 수 있도록 해주세요.
              </p>
              <p>
                4. <span className="text-red-400">Calculate 버튼</span>을
                클릭하면, 결과가 나오도록 구현해 주세요.
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
            <h1 className="text-3xl font-semibold">🎯 참고사항</h1>
          </div>
          {isClicked2 && (
            <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
              <p>
                1. vscode의 왼쪽 extenstion(확장) 탭으로 들어가{' '}
                <span className="text-red-400">Live server</span> 를 검색 후
                설치해주세요.{' '}
              </p>
              <p>
                2. 그 후 vscode의 템플릿 코드가 있는 곳 (index.html) 에서 마우스
                우클릭 →{' '}
                <span className="text-red-400">Open with Liver Server </span>{' '}
                클릭을 하면 화면으로 확인 할 수 있습니다.
              </p>
              <p>
                3. 제공된 템플릿의 경우 React가 다운로드 되어 있지 않습니다!
                따라서 상태를 저장하고 싶다면 아래와 같은 코드를 사용해야
                합니다!
                <br />
                <span className="text-red-400">{`👉🏻 const [a, setA] = React.useState();`}</span>
              </p>
              <p>
                4. &nbsp;
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                  className="text-white cursor-pointer text-lg hover:text-blue-400 transition-colors"
                >
                  <span className="text-red-400">input태그</span> 참고하러 가기
                  (클릭)
                </a>
              </p>
              <p>
                5. &nbsp;
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                  className="text-white cursor-pointer text-lg hover:text-blue-400 transition-colors"
                >
                  <span className="text-red-400">select태그</span> 참고하러 가기
                  (클릭)
                </a>
              </p>
              <p>
                6. &nbsp;
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                  className="text-white cursor-pointer text-lg hover:text-blue-400 transition-colors"
                >
                  <span className="text-red-400">onClick 이벤트</span> 참고하러
                  가기 (클릭)
                </a>
              </p>
              <p>
                7. &nbsp;
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                  className="text-white cursor-pointer text-lg hover:text-blue-400 transition-colors"
                >
                  <span className="text-red-400">onChange 이벤트</span> 참고하러
                  가기 (클릭)
                </a>
              </p>
              <p>
                8. 추가 문의 사항은{' '}
                <Link href={'/faq'} className="underline">
                  과제 FAQ 페이지
                </Link>
                를 이용해 주세요~!
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
            <h1 className="text-3xl font-semibold">🙌 Solution</h1>
          </div>
          {isClicked3 && (
            <div className="bg-neutral-800 w-full h-14 rounded-md flex items-center p-5">
              <a
                href="https://github.com/Cllaude99/Cotato-9th-FE-Networking-Solution/blob/main/week1/index.html"
                target="_blank"
                className="text-white cursor-pointer font-semibold text-lg hover:text-blue-400 transition-colors"
              >
                👉🏻 &nbsp; 1주차 과제 Solution 보러가기 (클릭)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
