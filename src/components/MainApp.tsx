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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {currentScreen !== 'home' && renderScreen()}
      {currentScreen === 'home' && (
        <>
      {/* Шапка с адресом */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('profile')}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md"
          >
            {userData.apartment}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={14} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-900">{userData.complex}</span>
            </div>
            <span className="text-xs text-gray-600">д. 33, кв. {userData.apartment}</span>
          </div>
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
          className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-6 text-white cursor-pointer shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-4 top-16 w-20 h-20 bg-white/10 rounded-full"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs opacity-75 mb-1">Баланс лицевого счета</p>
                <p className="text-3xl font-bold">{balance} ₽</p>
              </div>
              <Icon name="Wallet" size={32} className="opacity-80" />
            </div>

            <div className="bg-white/20 rounded-2xl p-4 mb-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Следующий платеж</span>
                <span className="text-xs opacity-75">1 мая</span>
              </div>
              <p className="text-2xl font-bold">{nextPayment} ₽</p>
            </div>

            <Button className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold h-12 rounded-xl shadow-md">
              <Icon name="Plus" size={20} className="mr-2" />
              Пополнить баланс
            </Button>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Быстрые действия</h2>

        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => setCurrentScreen('requests')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center relative">
              <Icon name="FileText" className="text-blue-600" size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">Заявки</span>
          </button>

          <button
            onClick={() => setCurrentScreen('payments')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <Icon name="CreditCard" className="text-green-600" size={22} />
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">Оплаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('cameras')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Icon name="Video" className="text-purple-600" size={22} />
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">Камеры</span>
          </button>

          <button
            onClick={() => setCurrentScreen('services')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
              <Icon name="Wrench" className="text-pink-600" size={22} />
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">Услуги</span>
          </button>
        </div>
      </div>

      {/* Все сервисы */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Все сервисы</h2>

        <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm">
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

        </>
      )}

      {/* Нижняя навигация - всегда видна */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 px-2 py-2">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="Home" size={24} className={currentScreen === 'home' ? 'text-blue-600' : 'text-gray-400'} />
            <span className={`text-[10px] font-medium ${currentScreen === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>Дома</span>
          </button>

          <button
            onClick={() => setCurrentScreen('payments')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="CreditCard" size={24} className={currentScreen === 'payments' ? 'text-blue-600' : 'text-gray-400'} />
            <span className={`text-[10px] ${currentScreen === 'payments' ? 'text-blue-600' : 'text-gray-400'}`}>Оплаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('requests')}
            className="flex flex-col items-center gap-1 py-2 relative"
          >
            <div className="relative">
              <Icon name="FileText" size={24} className={currentScreen === 'requests' ? 'text-blue-600' : 'text-gray-400'} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <span className={`text-[10px] ${currentScreen === 'requests' ? 'text-blue-600' : 'text-gray-400'}`}>Заявки</span>
          </button>

          <button
            onClick={() => setCurrentScreen('chat')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="MessageCircle" size={24} className={currentScreen === 'chat' ? 'text-blue-600' : 'text-gray-400'} />
            <span className={`text-[10px] ${currentScreen === 'chat' ? 'text-blue-600' : 'text-gray-400'}`}>Чаты</span>
          </button>

          <button
            onClick={() => setCurrentScreen('services')}
            className="flex flex-col items-center gap-1 py-2"
          >
            <Icon name="LayoutGrid" size={24} className={currentScreen === 'services' ? 'text-blue-600' : 'text-gray-400'} />
            <span className={`text-[10px] ${currentScreen === 'services' ? 'text-blue-600' : 'text-gray-400'}`}>Услуги</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainApp;