'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

export default function Third() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  return (
    <>
      {' '}
      <div className="flex flex-col gap-5">
        <div className="mx-auto sm:w-[500px] md:w-[650px] lg:w-[700px]">
          <iframe
            height="430"
            src="https://www.youtube.com/embed/fuBcyBr4T2c?si=Snc6IGBYoCbBmuu0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full"
          ></iframe>
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <h1 className="text-4xl font-semibold bg-blue-500 rounded-md p-2 mb-5">
            👉🏻 과제3 - 상태관리
          </h1>
          <h2>
            <Link
              href="https://github.com/IT-Cotato/9th-FE-Networking-3"
              target="_blank"
              className="text-white cursor-pointer font-semibold text-lg hover:text-blue-400 transition-colors"
            >
              <span>{'🔥'}</span> 템플릿 코드 보러가기 (클릭)
            </Link>
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
                <p>1. 위와 같이 동작하는 상태관리 시스템을 만들어 주세요!</p>
                <p>
                  2. 사용자는 내가 보고싶은 영화를 입력하고{' '}
                  <span className="text-blue-400">Add movie 버튼</span>을
                  클릭하여 <span className="text-blue-400">영화를 추가</span>할
                  수 있습니다.
                </p>
                <p>
                  3. 사용자는 내가 보고싶은 영화들 목록에서 🗑️ 를 클릭하여{' '}
                  제거할 수 있습니다.
                </p>
                <p>
                  4. 사용자는 ✅ 버튼을 클릭하여 해당 영화를 내가 보고 싶은
                  영화들 목록에서 내가 봤던 영화들 목록으로 이동할 수 있습니다.
                </p>
                <p>
                  5. 사용자는 ❌ 버튼을 클릭하여 해당 영화를 내가 봤던 영화들
                  목록에서 내가 보고 싶은 영화들 목록으로 돌아갈 수 있습니다.
                </p>
                <p>
                  6. 사용자는 👍 버튼을 클릭하여 해당 영화를 내가 봤던 영화들
                  목록에서 내가 좋아하는 영화들 목록으로 이동할 수 있습니다.
                </p>
                <p>
                  7. 사용자는 👎 버튼을 클릭하여 해당 영화를 내가 좋아하는
                  영화들 목록에서 내가 봤던 영화들 목록으로 이동할 수 있습니다.
                </p>
                <p>
                  8. 브라우저를 새로고침하여도 이전에 입력한 값들이 유지되도록
                  구현해주세요.
                </p>
                <p>
                  9. 사용자가 아무것도 입력하지 않고 Add movie 버튼을 클릭 수
                  있도록 하면 안됩니다. <br />
                  따라서 사용자가 아무것도 입력하지 않았을 경우에는{' '}
                  <span className="text-blue-400">에러메세지</span>를 함께
                  보여주세요! <br /> (에러 메세지는 제공되는 템플릿의 영화제목
                  이라는 placeholder를 가진 input태그 아래에 보이도록
                  진행해주세요 )
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
                  1.{' '}
                  <Link
                    href="https://react-hook-form.com/"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 React 기반의 폼 관리 라이브러리(React-Hook-Form)
                  </Link>
                </p>
                <p>
                  2.{' '}
                  <Link
                    href="https://zustand-demo.pmnd.rs/"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 Zustand (클릭)
                  </Link>
                </p>
                <p>
                  3.{' '}
                  <Link
                    href="https://jotai.org/"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 Jotai (클릭)
                  </Link>
                </p>
                <p>
                  4.{' '}
                  <Link
                    href="https://recoiljs.org/ko/"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 Recoil (클릭)
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
                  href="https://github.com/Cllaude99/Cotato-9th-FE-Networking-Solution/tree/main/week3"
                  target="_blank"
                  className="text-white cursor-pointer font-semibold text-lg hover:text-blue-400 transition-colors"
                >
                  👉🏻 &nbsp; 3주차 과제 Solution 보러가기 (클릭)
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
