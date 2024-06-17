import Image from 'next/image';
import Link from 'next/link';

interface IListChatProps {
  id: string;
  users: {
    username: string;
    avatar: string | null;
  }[];
  messages: {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    chatRoomId: string;
    userId: number;
    isRead: boolean;
  }[];
  userId: number;
}

export default function ListChat({
  id,
  users,
  messages,
  userId,
}: IListChatProps) {
  const user = users[0];
  const message = messages[0];
  return (
    <Link
      href={`/question/${id}`}
      className="flex gap-5 p-5 items-center hover:opacity-80 transition-opacity"
    >
      {Boolean(user.avatar) ? (
        <Image
          src={user.avatar!}
          alt={user.username}
          width={60}
          height={60}
          className="rounded-md"
        />
      ) : (
        <Image
          src={`/potato.png`}
          alt={user.username}
          width={60}
          height={60}
          className="rounded-md"
        />
      )}
      <div>
        <h2 className="text-lg text-white">{user.username}</h2>
        {message && (
          <>
            <h3 className="text-sm text-neutral-500">
              <span className="text-neutral-400">
                {message.userId === userId ? '나' : user.username}
              </span>
            </h3>
          </>
        )}
      </div>
      {message && !message.isRead && message.userId !== userId && (
        <div className="size-2 rounded-full bg-white ml-auto" />
      )}
    </Link>
  );
}
