import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import RequestsScreen from '@/components/screens/RequestsScreen';
import AIAssistantScreen from '@/components/screens/AIAssistantScreen';
import PaymentsScreen from '@/components/screens/PaymentsScreen';
import CamerasScreen from '@/components/screens/CamerasScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import ApartmentScreen from '@/components/screens/ApartmentScreen';
import NewsScreen from '@/components/screens/NewsScreen';
import VotingScreen from '@/components/screens/VotingScreen';
import ResidentsChat from '@/components/screens/ResidentsChat';
import ServicesScreen from '@/components/screens/ServicesScreen';

interface MainAppProps {
  userData: any;
  onLogout: () => void;
}

type Screen =
  | 'home'
  | 'requests'
  | 'ai'
  | 'payments'
  | 'cameras'
  | 'profile'
  | 'apartment'
  | 'news'
  | 'voting'
  | 'chat'
  | 'services';

const MainApp = ({ userData, onLogout }: MainAppProps) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);

  const activeRequests = 2;
  const balance = 0;
  const rating = 4.8;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'requests':
        return <RequestsScreen onBack={() => setCurrentScreen('home')} />;
      case 'ai':
        return <AIAssistantScreen onBack={() => setCurrentScreen('home')} />;
      case 'payments':
        return <PaymentsScreen onBack={() => setCurrentScreen('home')} />;
      case 'cameras':
        return <CamerasScreen onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen userData={userData} onBack={() => setCurrentScreen('home')} onLogout={onLogout} />;
      case 'apartment':
        return <ApartmentScreen userData={userData} onBack={() => setCurrentScreen('home')} />;
      case 'news':
        return <NewsScreen onBack={() => setCurrentScreen('home')} />;
      case 'voting':
        return <VotingScreen onBack={() => setCurrentScreen('home')} />;
      case 'chat':
        return <ResidentsChat onBack={() => setCurrentScreen('home')} />;
      case 'services':
        return <ServicesScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return null;
    }
  };

  if (currentScreen !== 'home') {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">{renderScreen()}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-24">
        <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                🏠
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {userData.complex}
                </h1>
                <p className="text-xs text-gray-500">
                  Подъезд {userData.entrance}, кв. {userData.apartment}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => setCurrentScreen('news')}
            >
              <Icon name="Bell" size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Мой баланс: {balance} ₽ 👍</span>
              <Icon name="ChevronRight" size={20} />
            </div>
            <p className="text-xs opacity-90 mb-3">1 мая спишем {balance + 5420} ₽</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                onClick={() => setCurrentScreen('payments')}
              >
                Экономить до 15% с абонементом
              </Button>
              <Button
                size="sm"
                className="bg-white text-blue-600 hover:bg-white/90"
                onClick={() => setCurrentScreen('payments')}
              >
                Пополнить баланс
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Быстрые действия</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Настроить
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setCurrentScreen('requests')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white">
                <Icon name="FileText" size={28} />
              </div>
              <span className="text-xs font-medium text-gray-900">Заявки</span>
            </button>

            <button
              onClick={() => setCurrentScreen('cameras')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center text-white">
                <Icon name="Video" size={28} />
              </div>
              <span className="text-xs font-medium text-gray-900">Камеры</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ai')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center text-white">
                <Icon name="Bot" size={28} />
              </div>
              <span className="text-xs font-medium text-gray-900">AI помощник</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-3 mx-4">
          <h2 className="text-lg font-bold text-gray-900">Услуги активны</h2>
          
          <div
            onClick={() => setCurrentScreen('payments')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Мой баланс: {balance} ₽ 👍</p>
                <p className="text-xs opacity-90">1 мая спишем 1 020 ₽</p>
              </div>
              <Icon name="ChevronRight" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-900">Экономить до 15% с абонементом</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400"
            >
              <Icon name="ToggleLeft" size={32} />
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-900">Настроить автоплатёж</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400"
            >
              <Icon name="ToggleLeft" size={32} />
            </Button>
          </div>

          <Button
            className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 border-0"
            onClick={() => setCurrentScreen('payments')}
          >
            Пополнить баланс
          </Button>
        </div>

        <div className="bg-white rounded-2xl p-4 mx-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Все сервисы</h2>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => setCurrentScreen('requests')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Icon name="FileText" className="text-blue-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Заявки</span>
            </button>

            <button
              onClick={() => setCurrentScreen('cameras')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                <Icon name="Video" className="text-purple-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Камеры</span>
            </button>

            <button
              onClick={() => setCurrentScreen('services')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center">
                <Icon name="ShoppingBag" className="text-pink-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Услуги</span>
            </button>

            <button
              onClick={() => setCurrentScreen('apartment')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                <Icon name="Home" className="text-green-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Квартира</span>
            </button>

            <button
              onClick={() => setCurrentScreen('chat')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                <Icon name="MessageCircle" className="text-orange-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Чаты</span>
            </button>

            <button
              onClick={() => setCurrentScreen('voting')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center">
                <Icon name="Vote" className="text-yellow-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Голосования</span>
            </button>

            <button
              onClick={() => setCurrentScreen('news')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                <Icon name="Newspaper" className="text-cyan-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">Новости</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ai')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Icon name="Bot" className="text-indigo-600" size={28} />
              </div>
              <span className="text-xs text-center text-gray-700">AI помощник</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto grid grid-cols-5 gap-1 px-2 py-2">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'home' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon name="Home" size={24} />
            <span className="text-[10px] font-medium">Дома</span>
          </button>

          <button
            onClick={() => setCurrentScreen('payments')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'payments' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon name="CreditCard" size={24} />
            <span className="text-[10px] font-medium">Счётчики</span>
          </button>

          <button
            onClick={() => setCurrentScreen('requests')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors relative ${
              currentScreen === 'requests' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div className="relative">
              <Icon name="FileText" size={24} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </div>
            <span className="text-[10px] font-medium">Заявки</span>
          </button>

          <button
            onClick={() => setCurrentScreen('chat')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'chat' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon name="MessageCircle" size={24} />
            <span className="text-[10px] font-medium">Чаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('services')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'services' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon name="LayoutGrid" size={24} />
            <span className="text-[10px] font-medium">Услуги</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainApp;