'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

export default function Second() {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isClicked4, setIsClicked4] = useState(false);
  const [isClicked5, setIsClicked5] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="mx-auto sm:w-[500px] md:w-[650px] lg:w-[700px]">
          <iframe
            height="430"
            src="https://www.youtube.com/embed/VYwBmZhBJS0?si=ndCbtBaWEalK7fVM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full"
          ></iframe>
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <h1 className="text-4xl font-semibold bg-blue-500 rounded-md p-2 mb-5">
            👉🏻 과제2 - react-router-dom
          </h1>
          <h2>
            <Link
              href="https://github.com/IT-Cotato/9th-FE-Networking-2"
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
                <p>1. 위와 같이 동작하는 반응형 헤더를 만들어주세요!</p>
                <p>
                  2. 헤더를 만드는데 필요한 아이콘은{' '}
                  <span className="text-blue-400">
                    public/imgs, assets/imgs{' '}
                  </span>
                  에 저장되어 있으며 코드에도 첨부되어 있습니다. <br />
                  (따로 다운받지 않으셔도 됩니다.)
                </p>
                <p>
                  3.반응형 헤더의 중단점은{' '}
                  <span className="text-blue-400">화면 너비 기준 768px</span>로
                  하겠습니다.
                </p>
                <p>
                  4. 중단점을 기준으로{' '}
                  <span className="text-blue-400">
                    해당 너비보다 작아질 시{' '}
                  </span>
                  기존의 메뉴들(About, Menu1 ~ Menu4)은 사라지고 돋보기 아이콘은{' '}
                  <span className="text-blue-400">햄버거 메뉴</span>로
                  변환해주세요.
                </p>
                <p>
                  5. 그 후 작아진 화면에서{' '}
                  <span className="text-blue-400">햄버거 메뉴를 클릭</span>하면
                  앞서 사라지게 했던 About,Menu1,Menu2,Menu3,Menu4가 보이도록
                  하면 됩니다
                </p>
                <p>
                  6. <span className="text-blue-400">햄버거버튼을 클릭</span>
                  하면 메뉴가 보여지고 X버튼을 클릭하면 메뉴가 사라지도록
                  해주세요!
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
                  1. 상단에 있는 메뉴들중{' '}
                  <span className="text-blue-400">“About”</span>을 제외한
                  Menu1,2,3,4는 별도의 페이지를 안만드셔도 됩니다!
                </p>
                <p>
                  2.{' '}
                  <Link
                    href="https://ko.legacy.reactjs.org/docs/hooks-state.html"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 useState 참고하러 가기 (클릭)
                  </Link>
                </p>
                <p>
                  3.{' '}
                  <Link
                    href=" https://ko.legacy.reactjs.org/docs/components-and-props.html"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 컴포넌트간 props 전달 참고하기 (클릭)
                  </Link>
                </p>
              </div>
            )}
          </div>
          <div className="mx-auto sm:w-[500px] md:w-[650px] lg:w-[700px] mt-9">
            <iframe
              height="430"
              src="https://www.youtube.com/embed/qz6xvMog2EY?si=iFfZlZxUSauRHLU-"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full"
            ></iframe>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 items-center">
              {isClicked4 ? (
                <ChevronDownIcon
                  className="size-5 cursor-pointer"
                  onClick={() => setIsClicked4((prev) => !prev)}
                />
              ) : (
                <ChevronUpIcon
                  className="size-5 cursor-pointer"
                  onClick={() => setIsClicked4((prev) => !prev)}
                />
              )}
              <h1 className="text-3xl font-semibold">✅ 요구사항</h1>
            </div>
            {isClicked4 && (
              <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
                <p>1. 위 동영상과 같이 라우팅 되도록 해주세요!</p>
                <p>
                  2. <span className="text-blue-400">createBrowserRouter</span>
                  를 이용해서 pages에 있는 컴포넌트를 동영상 참고을 참고하여
                  알맞게 라우팅 해주세요!
                </p>
                <p>
                  3. <span className="text-blue-400">createBrowserRouter</span>
                  에 children를 사용해주세요! (
                  <span className="text-blue-400">Outlet</span>을 이용해주세요)
                </p>
                <p>
                  4. 각 주소에 따라 표시하면 되는 화면은 아래와 같습니다. 화면의
                  경우 <span className="text-blue-400">page 폴더</span>를
                  참고해주세요
                </p>
                <p>
                  {`/ -> Home`} <br />
                  {`/about  -> About`} <br />
                  {`/author/:name -> Author`} <br />
                  {`/author/:name/book -> Book`} <br />
                  {`/author/:name/:book/chapters -> Chapters`} <br />
                  {`/author/:name/:book/characters -> Characters`}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {isClicked5 ? (
                <ChevronDownIcon
                  className="size-5 cursor-pointer"
                  onClick={() => setIsClicked5((prev) => !prev)}
                />
              ) : (
                <ChevronUpIcon
                  className="size-5 cursor-pointer"
                  onClick={() => setIsClicked5((prev) => !prev)}
                />
              )}
              <h1 className="text-3xl font-semibold">🎯 참고사항</h1>
            </div>
            {isClicked5 && (
              <div className="bg-neutral-800 w-full h-max rounded-md p-5 flex flex-col gap-5 text-lg">
                <p>
                  1.{' '}
                  <Link
                    href="https://reactrouter.com/en/main/components/outlet"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 Outlet 사용법 (클릭)
                  </Link>
                </p>
                <p>
                  2.{' '}
                  <Link
                    href=" https://reactrouter.com/en/main/hooks/use-params"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 useParams 사용법 (클릭)
                  </Link>
                </p>
                <p>
                  3.{' '}
                  <Link
                    href=" https://reactrouter.com/en/main/routers/create-browser-router"
                    className="text-white hover:text-blue-400"
                    target="_blank"
                  >
                    👉🏻 createBrowserRouter 사용법 (클릭)
                  </Link>
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
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
                  href="https://github.com/Cllaude99/Cotato-9th-FE-Networking-Solution/tree/main/week2"
                  target="_blank"
                  className="text-white cursor-pointer font-semibold text-lg hover:text-blue-400 transition-colors"
                >
                  👉🏻 &nbsp; 2주차 과제 Solution 보러가기 (클릭)
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
