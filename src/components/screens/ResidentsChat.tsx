import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface ResidentsChatProps {
  onBack: () => void;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  sender?: string;
}

const ResidentsChat = ({ onBack }: ResidentsChatProps) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Общий чат дома',
      avatar: '🏠',
      lastMessage: 'Елена: Добрый день! Кто-нибудь знает...',
      time: '14:30',
      unread: 3,
    },
    {
      id: '2',
      name: 'Чат подъезда №2',
      avatar: '🏢',
      lastMessage: 'Алексей: Завтра будут перекрывать воду',
      time: '12:15',
      unread: 7,
    },
    {
      id: '3',
      name: 'Анна Петрова',
      avatar: 'АП',
      lastMessage: 'Спасибо большое!',
      time: '10:45',
      online: true,
    },
    {
      id: '4',
      name: 'Дмитрий Сидоров',
      avatar: 'ДС',
      lastMessage: 'Хорошо, договорились',
      time: 'Вчера',
    },
    {
      id: '5',
      name: 'Родительский комитет',
      avatar: '👨‍👩‍👧',
      lastMessage: 'Мария: Собираемся в субботу',
      time: 'Вчера',
      unread: 12,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      text: 'Добрый день! Подскажите, кто занимается организацией субботников?',
      time: '14:28',
      isOwn: false,
      sender: 'Елена',
    },
    {
      id: '2',
      text: 'Здравствуйте! Обычно УК координирует, но можно и самим организовать',
      time: '14:29',
      isOwn: true,
    },
    {
      id: '3',
      text: 'Я могу помочь с организацией, у меня есть опыт',
      time: '14:30',
      isOwn: false,
      sender: 'Александр',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Логика отправки сообщения
      setMessage('');
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeChat) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Шапка чата */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setActiveChat(null)}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {chats.find((c) => c.id === activeChat)?.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {chats.find((c) => c.id === activeChat)?.name}
            </h3>
            <p className="text-xs text-gray-500">152 участника</p>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${msg.isOwn ? 'order-2' : ''}`}>
                {!msg.isOwn && msg.sender && (
                  <p className="text-xs text-gray-600 mb-1 px-3">{msg.sender}</p>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    msg.isOwn
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Поле ввода */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Icon name="Plus" size={24} />
            </Button>
            <Input
              placeholder="Сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="shrink-0 bg-blue-500 hover:bg-blue-600"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 flex-1">Чаты жителей</h1>
          <Button variant="ghost" size="icon">
            <Icon name="Search" size={20} />
          </Button>
        </div>
        <Input
          placeholder="Поиск по чатам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Список чатов */}
      <div className="divide-y divide-gray-200">
        {filteredChats.map((chat) => (
          <Card
            key={chat.id}
            className="rounded-none border-0 shadow-none hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setActiveChat(chat.id)}
          >
            <div className="p-4 flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {chat.avatar}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 shrink-0 ml-2">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unread && (
                    <Badge className="ml-2 bg-blue-500 text-white shrink-0">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Кнопка создать чат */}
      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
        size="icon"
      >
        <Icon name="MessageCirclePlus" size={24} />
      </Button>
    </div>
  );
};

export default ResidentsChat;
