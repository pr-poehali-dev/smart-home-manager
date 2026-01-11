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
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { formatSomoni } from '@/data/tajikData';

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
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const balance = 2500;
  const nextPayment = 1850;

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
            <span className="text-xs text-gray-600">{t.auth.entrance} {userData.entrance}, {t.home.apartment.toLowerCase()} {userData.apartment}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
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
                <p className="text-xs opacity-75 mb-1">{t.home.balance}</p>
                <p className="text-3xl font-bold">{formatSomoni(balance)}</p>
              </div>
              <Icon name="Wallet" size={32} className="opacity-80" />
            </div>

            <div className="bg-white/20 rounded-2xl p-4 mb-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t.home.nextPayment}</span>
                <span className="text-xs opacity-75">1 мая</span>
              </div>
              <p className="text-2xl font-bold">{formatSomoni(nextPayment)}</p>
            </div>

            <Button className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold h-12 rounded-xl shadow-md">
              <Icon name="Plus" size={20} className="mr-2" />
              {t.home.topUp}
            </Button>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{t.home.quickActions}</h2>

        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => setCurrentScreen('requests')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center relative">
              <Icon name="FileText" className="text-blue-600" size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">{t.home.requests}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('payments')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <Icon name="CreditCard" className="text-green-600" size={22} />
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">{t.home.payments}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('cameras')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Icon name="Video" className="text-purple-600" size={22} />
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">{t.home.cameras}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('services')}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
              <Icon name="Wrench" className="text-pink-600" size={22} />
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">{t.home.services}</span>
          </button>
        </div>
      </div>

      {/* Все сервисы */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{t.home.allServices}</h2>

        <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => setCurrentScreen('requests')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Icon name="FileText" className="text-blue-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.requests}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('payments')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                <Icon name="CreditCard" className="text-green-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.payments}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('cameras')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                <Icon name="Video" className="text-purple-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.cameras}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('services')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center">
                <Icon name="Wrench" className="text-pink-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.services}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('chat')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center relative">
                <Icon name="MessageCircle" className="text-amber-600" size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.chat}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('apartment')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Icon name="Gauge" className="text-indigo-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.counters}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('apartment')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
                <Icon name="Home" className="text-teal-600" size={28} />
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.apartment}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('voting')}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center relative">
                <Icon name="Vote" className="text-orange-600" size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</span>
              </div>
              <span className="text-xs text-gray-700 text-center">{t.home.voting}</span>
            </button>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Нижняя навигация */}
      {currentScreen === 'home' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 z-50">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <button
              onClick={() => setCurrentScreen('home')}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <Icon name="Home" size={24} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-600">{t.nav.home}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('payments')}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <Icon name="CreditCard" size={24} className="text-gray-400" />
              <span className="text-xs text-gray-500">{t.nav.payments}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ai')}
              className="relative -mt-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                <Icon name="Sparkles" size={28} className="text-white" />
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('requests')}
              className="flex flex-col items-center gap-1 px-4 py-1 relative"
            >
              <Icon name="FileText" size={24} className="text-gray-400" />
              <span className="text-xs text-gray-500">{t.nav.requests}</span>
              <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => setCurrentScreen('chat')}
              className="flex flex-col items-center gap-1 px-4 py-1 relative"
            >
              <Icon name="MessageCircle" size={24} className="text-gray-400" />
              <span className="text-xs text-gray-500">{t.nav.chat}</span>
              <span className="absolute top-0 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainApp;