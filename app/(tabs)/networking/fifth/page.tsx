'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

export default function Fifth() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="mx-auto sm:w-[500px] md:w-[650px] lg:w-[700px]">
          <iframe
            height="430"
            src="https://www.youtube.com/embed/gpcyuAzf7Q4?si=0pANUvqoZKB8CxJ7"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full"
          ></iframe>
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <h1 className="text-4xl font-semibold bg-blue-500 rounded-md p-2 mb-5">
            👉🏻 과제5 - 비동기 프로그래밍 02
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
              <h1 className="text-3xl font-semibold">✅ 요구사항</h1>
            </div>
            {isClicked1 && (
              <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
                <p>1. 위와 같이 동작하는 movie-app을 만들어 주세요!</p>
                <p>
                  2. 사용자는 메뉴를 클릭하여 popular, coming-soon,
                  now-playing에 대한 영화들을 확인할 수 있습니다.
                </p>
                <p>
                  3.위 1번과정에서{' '}
                  <Link href="https://www.themoviedb.org/" target="_blank">
                    https://www.themoviedb.org/
                  </Link>{' '}
                  를 참고하여, 요구사항에 맞는 url로 데이터를 요청하고 응답하는
                  과정을 진행해주세요.
                </p>
                <p>
                  4.(선택사항) 영화 포스터에 마우스를 올리면, 해당 영화의 크기를
                  키워주세요!
                </p>
                <p>
                  5. (선택사항) 사용자가 메뉴를 통해 페이지를 이동할때, 현재
                  사용자가 어느 페이지에 있는지 알려주세요! <br />
                  (위 동영상에는 사용자가 선택한 메뉴로 파란색 원이 이동합니다)
                </p>

                <p>
                  6.(선택사항) 영화의 포스터가 보여지는 과정에서, 해당 영화의
                  포스터를 하나씩 순서대로 보여주도록 구현해주세요! <br />
                  (위 동영상에서는 모든 영화 포스터가 같은 순서로 나오는 것이
                  아닌, 순차적으로 보여지고 있음을 확인할 수 있습니다)
                </p>
                <p>
                  7. 영화 포스터를 클릭하면, 모달창이 나오고 해당 모달창에
                  클릭한 영화에 대한 세부정보를 표시해주세요! <br />(
                  <Link href="https://www.themoviedb.org/" target="_blank">
                    https://www.themoviedb.org/
                  </Link>
                  에서 영화의 상세정보를 확인하는 api링크를 확인할 수 있습니다){' '}
                  <br />
                  영화 포스터의 이미지를 보여주는 과정은 아래 url에 나와 있는
                  설명을 참고해주세요 (
                  <Link
                    href=" https://developer.themoviedb.org/docs/image-basics"
                    target="_blank"
                  >
                    https://developer.themoviedb.org/docs/image-basics
                  </Link>
                  )
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
                  <Link
                    href="https://developer.themoviedb.org/reference/intro/getting-started"
                    target="_blank"
                    className="text-white hover:text-blue-400"
                  >
                    👉🏻 api 엔드포인트 참고{' '}
                  </Link>
                </p>
                <p>
                  <Link
                    href="https://developer.themoviedb.org/docs/image-basics"
                    target="_blank"
                    className="text-white hover:text-blue-400"
                  >
                    👉🏻 영화 포스터 이미지 보여주는 방법 참고
                  </Link>
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
                <Link
                  href="https://github.com/Cllaude99/Cotato-9th-FE-Networking-Solution/tree/main/week5"
                  target="_blank"
                  className="text-white cursor-pointer font-semibold text-lg hover:text-blue-400 transition-colors"
                >
                  👉🏻 &nbsp; 5주차 과제 Solution 보러가기 (클릭)
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
