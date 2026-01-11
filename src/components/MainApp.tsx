import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

  const balance = 1500;
  const nextPayment = 1020;

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
    return <div className="min-h-screen bg-gray-50">{renderScreen()}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Шапка с адресом */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={16} className="text-gray-500" />
          <span className="text-sm text-gray-900">{userData.complex}, д. 33, кв. {userData.apartment}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setCurrentScreen('news')}
        >
          <Icon name="Bell" size={22} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
      </div>

      {/* Карточка баланса */}
      <div className="p-4">
        <div
          onClick={() => setCurrentScreen('payments')}
          className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-5 text-white cursor-pointer shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Мой баланс: {balance} ₽ 👍</p>
              <p className="text-xs opacity-75">1 мая спишем {nextPayment} ₽</p>
            </div>
            <Icon name="ChevronRight" size={24} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-t border-white/20">
              <span className="text-sm">Экономить до 15% с абонементом</span>
              <div className="w-12 h-6 bg-white/30 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-white/20">
              <span className="text-sm">Настроить автоплатёж</span>
              <div className="w-12 h-6 bg-white/30 rounded-full"></div>
            </div>

            <Button className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold mt-2">
              Пополнить баланс
            </Button>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Быстрые действия</h2>
          <Button variant="ghost" size="sm" className="text-blue-600 text-sm">
            Настроить
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setCurrentScreen('requests')}
            className="flex-shrink-0 w-32 p-4 bg-white rounded-2xl border border-gray-200 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Icon name="FileText" className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-900">Заявки</span>
          </button>

          <button
            onClick={() => setCurrentScreen('payments')}
            className="flex-shrink-0 w-32 p-4 bg-white rounded-2xl border border-gray-200 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <Icon name="CreditCard" className="text-green-600" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-900">Оплаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('cameras')}
            className="flex-shrink-0 w-32 p-4 bg-white rounded-2xl border border-gray-200 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Icon name="Video" className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-900">Камеры</span>
          </button>

          <button
            onClick={() => setCurrentScreen('services')}
            className="flex-shrink-0 w-32 p-4 bg-white rounded-2xl border border-gray-200 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
              <Icon name="Wrench" className="text-pink-600" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-900">Услуги</span>
          </button>
        </div>
      </div>

      {/* Все сервисы */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Все сервисы</h2>

        <div className="bg-white rounded-3xl p-4 border border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => setCurrentScreen('requests')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Icon name="FileText" className="text-blue-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">Заявки</span>
            </button>

            <button
              onClick={() => setCurrentScreen('payments')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                <Icon name="CreditCard" className="text-green-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">Счётчики</span>
            </button>

            <button
              onClick={() => setCurrentScreen('cameras')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center relative">
                <Icon name="Video" className="text-purple-600" size={28} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <span className="text-xs text-gray-700 text-center">Камеры</span>
            </button>

            <button
              onClick={() => setCurrentScreen('chat')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                <Icon name="MessageCircle" className="text-orange-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">Заявки</span>
            </button>

            <button
              onClick={() => setCurrentScreen('services')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center">
                <Icon name="ShoppingBag" className="text-pink-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">Услуги</span>
            </button>

            <button
              onClick={() => setCurrentScreen('apartment')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                <Icon name="Home" className="text-cyan-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">Квартира</span>
            </button>

            <button
              onClick={() => setCurrentScreen('voting')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center">
                <Icon name="Vote" className="text-yellow-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">Голосования</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ai')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Icon name="Bot" className="text-indigo-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">AI помощник</span>
            </button>
          </div>
        </div>
      </div>

      {/* Нижняя навигация */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="grid grid-cols-5 px-2 py-2">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="Home" size={24} className="text-gray-900" />
            <span className="text-[10px] font-medium text-gray-900">Дома</span>
          </button>

          <button
            onClick={() => setCurrentScreen('payments')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="CreditCard" size={24} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Оплаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('requests')}
            className="flex flex-col items-center gap-1 py-2 relative"
          >
            <div className="relative">
              <Icon name="FileText" size={24} className="text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <span className="text-[10px] text-gray-400">Заявки</span>
          </button>

          <button
            onClick={() => setCurrentScreen('chat')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="MessageCircle" size={24} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Чаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('services')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="LayoutGrid" size={24} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Услуги</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
