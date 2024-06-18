import Image from 'next/image';
import Link from 'next/link';

export default function Networking() {
  return (
    <div className="grid gap-3 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Link href={`/networking/first`}>
        <div className=" w-full h-56 hover:scale-105 cursor-pointer flex flex-col opacity-70 hover:opacity-100 transition-all">
          <h1 className="text-black bg-white text-center h-[180px] flex justify-center items-center text-7xl font-semibold rounded-md">
            Week1
          </h1>
          <h2 className=" text-lg flex justify-center items-center gap-2">
            <Image
              src={`/one.png`}
              width={50}
              height={50}
              alt={'one'}
              className="size-5 text-white bg-transparent rounded-full"
            />
            <span className="text-white">Web Front Basics</span>
          </h2>
        </div>
      </Link>
      <Link href={`/networking/second`}>
        <div className=" w-full h-56 hover:scale-110 transition-transform cursor-pointer opacity-70 hover:opacity-100">
          <h1 className="text-black bg-white text-center h-[180px] flex justify-center items-center text-7xl font-semibold rounded-md">
            Week2
          </h1>
          <h2 className=" text-lg flex justify-center items-center gap-2">
            <Image
              src={`/two.png`}
              width={50}
              height={50}
              alt={'two'}
              className="size-5 text-white bg-transparent rounded-full"
            />
            <span className="text-white">react-router-dom</span>
          </h2>
        </div>
      </Link>
      <Link href={`/networking/third`}>
        <div className=" w-full h-56 hover:scale-110 transition-transform cursor-pointer opacity-70 hover:opacity-100">
          <h1 className="text-black bg-white text-center h-[180px] flex justify-center items-center text-7xl font-semibold rounded-md">
            Week3
          </h1>
          <h2 className="text-lg flex justify-center items-center gap-2">
            <Image
              src={`/three.png`}
              width={50}
              height={50}
              alt={'three'}
              className="size-5 text-white bg-transparent rounded-full"
            />
            <span className="text-white">상태관리</span>
          </h2>
        </div>
      </Link>
      <Link href={`/networking/fourth`}>
        <div className=" w-full h-56 hover:scale-110 transition-transform cursor-pointer opacity-70 hover:opacity-100">
          <h1 className="text-black bg-white text-center h-[180px] flex justify-center items-center text-7xl font-semibold rounded-md">
            Week4
          </h1>
          <h2 className="text-lg flex justify-center items-center gap-2">
            <Image
              src={`/four.png`}
              width={50}
              height={50}
              alt={'four'}
              className="size-5 text-white bg-transparent rounded-full"
            />
            <span className="text-white">비동기 프로그래밍 1</span>
          </h2>
        </div>
      </Link>
      <Link href={`/networking/fifth`}>
        <div className=" w-full h-56 hover:scale-110 transition-transform cursor-pointer opacity-70 hover:opacity-100">
          <h1 className="text-black bg-white text-center h-[180px] flex justify-center items-center text-7xl font-semibold rounded-md">
            Week5
          </h1>
          <h2 className="text-lg flex justify-center items-center gap-2">
            <Image
              src={`/five.png`}
              width={50}
              height={50}
              alt={'five'}
              className="size-5 text-white bg-transparent rounded-full"
            />
            <span className="text-white">비동기 프로그래밍 2</span>
          </h2>
        </div>
      </Link>
    </div>
  );
}
