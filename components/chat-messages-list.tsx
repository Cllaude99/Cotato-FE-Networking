'use client';

import { saveMessage } from '@/app/question/[id]/actions';
import { InitialChatMessages } from '@/app/question/[id]/page';
import { formatToTimeAgo } from '@/lib/utils';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SUPABASE_PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeGVnc3NienJsZXp6ZXFuZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MTk4ODEsImV4cCI6MjAzNDE5NTg4MX0.frXSrfPxTyWBwzuqK4UzrCfH-tF8DOnc0qi4R6CvY4o';
const SUPABASE_URL = 'https://mqxegssbzrlezzeqnfcs.supabase.co';

interface IChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string | null;
  readMessage: (messageId: number) => void;
}
export default function ChatMessagesList({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
  readMessage,
}: IChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const channel = useRef<RealtimeChannel>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        isRead: false,
        user: {
          username: '',
          avatar: '',
        },
      },
    ]);
    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        id: Date.now(),
        created_at: new Date(),
        payload: message,
        userId,
        isRead: false,
        user: {
          username,
          avatar,
        },
      },
    });
    // 대화내용 저장
    await saveMessage(message, chatRoomId);
    setMessage('');
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on('broadcast', { event: 'message' }, (payload) => {
        readMessage(messages[messages.length - 1].id);
        setMessages((prevMsg) => [...prevMsg, payload.payload]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId, messages, readMessage]);

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-start w-[80%] mx-auto mt-8">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${
            message.userId === userId ? 'justify-end' : ''
          }`}
        >
          {message.userId === userId ? null : Boolean(message.user.avatar) ? (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-8 rounded-full"
            />
          ) : (
            <Image
              src={`/potato.png`}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-8 rounded-full"
            />
          )}
          <div
            className={`flex flex-col gap-1 ${
              message.userId === userId ? 'items-end' : ''
            }`}
          >
            <span
              className={`${
                message.userId === userId ? 'bg-blue-500' : 'bg-neutral-500'
              } p-2.5 rounded-md`}
            >
              {message.payload}
            </span>
            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
      <form className="flex relative mt-5" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:right-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="메세지를 작성해주세요!"
          autoComplete="off"
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-blue-500 transition-colors hover:text-blue-300" />
        </button>
      </form>
    </div>
  );
}
