'use client';

import { useState, FormEvent } from 'react';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { siteInfo } from '@/app/chat/constants/siteInfo';

interface ChatMessage {
  user: 'User' | 'Bot';
  message: string;
}

export default function ChatTemplate() {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Bot 메시지를 한 글자씩 타이핑 효과로 표시
  const typeBotMessage = (fullText: string) => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      currentIndex++;
      setChatHistory((prev) => {
        const newHistory = [...prev];

        newHistory[newHistory.length - 1] = {
          user: 'Bot',
          message: fullText.slice(0, currentIndex),
        };

        return newHistory;
      });
      if (currentIndex >= fullText.length) {
        clearInterval(typingInterval);
      }
    }, 50);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { user: 'User', message: inputMessage },
    ]);
    setLoading(true);

    const prompt = `사이트 정보:
이름: ${siteInfo.name}
설명: ${siteInfo.description}
주요 기능: ${siteInfo.features.join(', ')}
---
사용자 질문: ${inputMessage}`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();

      if (res.ok) {
        const sanitizedReply = data.reply.replace(/\*/g, '');

        // Bot 메시지를 빈 문자열로 추가 후 타이핑 효과 실행
        setChatHistory((prev) => [...prev, { user: 'Bot', message: '' }]);
        typeBotMessage(sanitizedReply);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { user: 'Bot', message: `Error: ${data.error}` },
        ]);
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { user: 'Bot', message: '알 수 없는 오류가 발생했습니다.' },
      ]);
    } finally {
      setInputMessage('');
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-white shadow-lg p-0 z-50"
        onClick={openModal}
      >
        <Image
          alt="Chatbot Icon"
          className="w-full h-full rounded-full"
          height={64}
          src="/assets/images/chat-bot.png"
          width={64}
        />
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="button"
          tabIndex={0}
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              closeModal();
            }
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg w-11/12 max-w-md h-4/5 max-h-[600px] flex flex-col shadow-lg"
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
            }}
          >
            <div className="relative p-4 border-b border-mono_300 dark:border-mono_700">
              <h2 className="text-xl font-point font-bold text-center text-mono_900">
                Gym<span className="text-main">M</span>ate 챗봇
              </h2>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                type="button"
                onClick={closeModal}
              >
                <XMarkIcon className="w-6 h-6 text-mono_900 " />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              {chatHistory.map((chat, index) => {
                const isUser = chat.user === 'User';

                return (
                  <div
                    key={index}
                    className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 ${
                        isUser
                          ? 'bg-main text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-bl-none'
                      }`}
                    >
                      {!isUser && <div className="font-bold mb-1">GymMate</div>}
                      {chat.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  className="
                    w-full rounded-full border border-gray-300 dark:border-gray-600
                    focus:ring-2 focus:ring-main focus:outline-none
                    py-2 px-4 pr-16
                    bg-gray-200 text-gray-900
                    dark:bg-gray-700 dark:text-gray-100
                  "
                  placeholder="질문을 입력하세요..."
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                  className="
                    absolute right-2 top-1/2 transform -translate-y-1/2
                    bg-main hover:bg-main/90 text-white rounded-full p-2
                    flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  disabled={loading}
                  type="submit"
                >
                  <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
