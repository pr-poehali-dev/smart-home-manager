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
  | 'voting';

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
      default:
        return null;
    }
  };

  if (currentScreen !== 'home') {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">{renderScreen()}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto p-4 space-y-6 pb-24">
        <header className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                {userData.complex}
              </h1>
              <p className="text-gray-600">
                Подъезд {userData.entrance} • Квартира {userData.apartment}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => setCurrentScreen('news')}
            >
              <Icon name="Bell" size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card className="animate-scale-in">
              <CardContent className="pt-4 text-center">
                <p className="text-xs text-gray-600 mb-1">Заявки</p>
                <p className="text-2xl font-bold font-heading">{activeRequests}</p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-4 text-center">
                <p className="text-xs text-gray-600 mb-1">Баланс</p>
                <p className="text-2xl font-bold font-heading text-green-600">{balance} ₽</p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-4 text-center">
                <p className="text-xs text-gray-600 mb-1">Рейтинг УК</p>
                <p className="text-2xl font-bold font-heading">{rating}</p>
              </CardContent>
            </Card>
          </div>
        </header>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <Icon name="Zap" size={20} />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setCurrentScreen('requests')}
              className="h-24 flex-col gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Icon name="Plus" size={28} />
              <span>Новая заявка</span>
            </Button>

            <Button
              onClick={() => setCurrentScreen('ai')}
              className="h-24 flex-col gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <Icon name="Bot" size={28} />
              <span>Помощник</span>
            </Button>

            <Button
              onClick={() => setCurrentScreen('cameras')}
              variant="outline"
              className="h-24 flex-col gap-2 hover:bg-gray-50"
            >
              <Icon name="Video" className="text-gray-700" size={28} />
              <span className="text-gray-700">Камеры</span>
            </Button>

            <Button
              onClick={() => setCurrentScreen('payments')}
              variant="outline"
              className="h-24 flex-col gap-2 hover:bg-gray-50"
            >
              <Icon name="Wallet" className="text-gray-700" size={28} />
              <span className="text-gray-700">Платежи</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <Icon name="Bell" size={20} />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Icon name="Info" className="text-blue-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-medium text-sm">Плановое отключение воды</p>
                <p className="text-xs text-gray-600 mt-1">12 января с 9:00 до 15:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Icon name="Clock" className="text-yellow-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-medium text-sm">Заявка в работе</p>
                <p className="text-xs text-gray-600 mt-1">Протечка в ванной • Мастер в пути</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Icon name="CheckCircle2" className="text-green-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-medium text-sm">Ремонт лифта завершен</p>
                <p className="text-xs text-gray-600 mt-1">Лифт №2 снова работает</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <Icon name="LayoutGrid" size={20} />
              Все сервисы
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-3">
            <button
              onClick={() => setCurrentScreen('requests')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon name="ClipboardList" className="text-blue-600" size={24} />
              </div>
              <span className="text-xs text-center">Заявки</span>
            </button>

            <button
              onClick={() => setCurrentScreen('payments')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="Wallet" className="text-green-600" size={24} />
              </div>
              <span className="text-xs text-center">Платежи</span>
            </button>

            <button
              onClick={() => setCurrentScreen('apartment')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon name="Home" className="text-purple-600" size={24} />
              </div>
              <span className="text-xs text-center">Квартира</span>
            </button>

            <button
              onClick={() => setCurrentScreen('voting')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Icon name="Vote" className="text-orange-600" size={24} />
              </div>
              <span className="text-xs text-center">Голосования</span>
            </button>

            <button
              onClick={() => setCurrentScreen('cameras')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Icon name="Video" className="text-red-600" size={24} />
              </div>
              <span className="text-xs text-center">Камеры</span>
            </button>

            <button
              onClick={() => setCurrentScreen('news')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Icon name="Newspaper" className="text-yellow-600" size={24} />
              </div>
              <span className="text-xs text-center">Новости</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ai')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Icon name="Bot" className="text-indigo-600" size={24} />
              </div>
              <span className="text-xs text-center">AI помощник</span>
            </button>

            <button
              onClick={() => setCurrentScreen('profile')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon name="User" className="text-gray-600" size={24} />
              </div>
              <span className="text-xs text-center">Профиль</span>
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto grid grid-cols-5 gap-2">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'home' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon name="Home" size={22} />
            <span className="text-xs">Главная</span>
          </button>

          <button
            onClick={() => setCurrentScreen('requests')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'requests' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon name="ClipboardList" size={22} />
            <span className="text-xs">Заявки</span>
          </button>

          <button
            onClick={() => setCurrentScreen('ai')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'ai' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon name="Bot" size={22} />
            <span className="text-xs">AI</span>
          </button>

          <button
            onClick={() => setCurrentScreen('news')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors relative ${
              currentScreen === 'news' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon name="Bell" size={22} />
            <span className="text-xs">Новости</span>
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
              currentScreen === 'profile' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon name="User" size={22} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
