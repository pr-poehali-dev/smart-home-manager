import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AIAssistantScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistantScreen = ({ onBack }: AIAssistantScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ваш умный помощник. Могу помочь создать заявку, ответить на вопросы о доме или подсказать, что делать в различных ситуациях.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const quickQuestions = [
    { icon: 'Droplet', text: 'Протекает потолок', category: 'urgent' },
    { icon: 'Zap', text: 'Не работает свет', category: 'issue' },
    { icon: 'Wallet', text: 'Как оплатить?', category: 'question' },
    { icon: 'Calendar', text: 'Когда отключат воду?', category: 'question' },
  ];

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('протек') || lowerQuestion.includes('течет')) {
      return 'Понял, протечка — это срочно! Я уже создаю заявку для сантехника. Пока мастер в пути, перекройте воду, если возможно. Заявка №' + Math.floor(Math.random() * 1000) + ' создана.';
    }
    
    if (lowerQuestion.includes('свет') || lowerQuestion.includes('электр')) {
      return 'Проблема с электричеством зафиксирована. Создаю заявку электрику. Проверьте, пожалуйста, автоматы в щитке. Заявка создана!';
    }
    
    if (lowerQuestion.includes('оплат')) {
      return 'Оплатить коммуналку можно в разделе "Платежи". Принимаем карты, Apple Pay и Google Pay. Хотите, чтобы я настроил автоплатёж?';
    }
    
    if (lowerQuestion.includes('вод') || lowerQuestion.includes('отключ')) {
      return 'По плану отключение воды 12 января с 9:00 до 15:00. Я отправлю напоминание накануне!';
    }
    
    return 'Спасибо за вопрос! Я передам его в управляющую компанию. Обычно отвечают в течение часа. Могу чем-то ещё помочь?';
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success('Слушаю вас...');
      setTimeout(() => {
        setIsRecording(false);
        handleSend('Протекает потолок в ванной');
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Icon name="Bot" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-heading font-bold">AI Помощник</h1>
              <p className="text-xs text-gray-600">Онлайн • Отвечаю мгновенно</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(q.text)}
                className="whitespace-nowrap gap-2"
              >
                <Icon name={q.icon} size={14} />
                {q.text}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Напишите ваш вопрос..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button
              size="icon"
              variant={isRecording ? 'destructive' : 'outline'}
              onClick={handleVoiceInput}
              className="shrink-0"
            >
              <Icon name={isRecording ? 'MicOff' : 'Mic'} size={20} />
            </Button>
            <Button size="icon" onClick={() => handleSend()} className="shrink-0">
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantScreen;
