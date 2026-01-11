import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ProfileScreenProps {
  userData: any;
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen = ({ userData, onBack, onLogout }: ProfileScreenProps) => {
  const [showApartmentDialog, setShowApartmentDialog] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
  });
  const [biometrics, setBiometrics] = useState(false);

  const apartments = [
    { id: '1', complex: 'ЖК Солнечный', entrance: '1', apartment: '45', isActive: true },
    { id: '2', complex: 'ЖК Солнечный', entrance: '2', apartment: '78', isActive: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Профиль</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Профиль пользователя */}
        <Card className="border border-gray-200 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-4 border-white/30">
                  {userData.apartment}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl mb-1">{userData.phone}</h2>
                  <p className="text-sm opacity-90">{userData.status === 'owner' ? 'Собственник' : 'Арендатор'}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowEditProfile(true)}
                >
                  <Icon name="Pencil" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon name="Building2" className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Комплекс</p>
                    <p className="font-semibold text-gray-900">{userData.complex}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Icon name="Home" className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Квартира</p>
                    <p className="font-semibold text-gray-900">Подъезд {userData.entrance}, кв. {userData.apartment}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                  onClick={() => setShowApartmentDialog(true)}
                >
                  Сменить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Мои квартиры */}
        <Card className="border border-gray-200 rounded-3xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Мои квартиры</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 text-sm h-8"
                onClick={() => setShowApartmentDialog(true)}
              >
                <Icon name="Plus" size={16} className="mr-1" />
                Добавить
              </Button>
            </div>
            
            <div className="space-y-2">
              {apartments.map((apt) => (
                <button
                  key={apt.id}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    apt.isActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${
                          apt.isActive
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        } flex items-center justify-center font-bold`}
                      >
                        {apt.apartment}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{apt.complex}</p>
                        <p className="text-sm text-gray-600">Подъезд {apt.entrance}, кв. {apt.apartment}</p>
                      </div>
                    </div>
                    {apt.isActive && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <Icon name="Check" size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Настройки уведомлений */}
        <Card className="border border-gray-200 rounded-3xl">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 mb-4">Уведомления</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <Icon name="Bell" className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Push-уведомления</p>
                    <p className="text-xs text-gray-600">Новости и важные события</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon name="Mail" className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email-уведомления</p>
                    <p className="text-xs text-gray-600">Отчеты и счета на почту</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Icon name="MessageSquare" className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">SMS-уведомления</p>
                    <p className="text-xs text-gray-600">Срочные сообщения</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, sms: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Безопасность */}
        <Card className="border border-gray-200 rounded-3xl">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 mb-4">Безопасность</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Icon name="Fingerprint" className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Биометрия</p>
                    <p className="text-xs text-gray-600">Вход по отпечатку</p>
                  </div>
                </div>
                <Switch
                  checked={biometrics}
                  onCheckedChange={setBiometrics}
                />
              </div>
              
              <button className="w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon name="Lock" className="text-red-600" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Изменить пароль</p>
                    <p className="text-xs text-gray-600">Обновите пароль для безопасности</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Прочее */}
        <Card className="border border-gray-200 rounded-3xl">
          <CardContent className="p-4">
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Icon name="HelpCircle" size={20} className="text-cyan-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">Помощь и поддержка</span>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-indigo-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">Условия использования</span>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-slate-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">Политика конфиденциальности</span>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                  <Icon name="Star" size={20} className="text-yellow-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">Оценить приложение</span>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Версия приложения */}
        <div className="text-center text-sm text-gray-500 py-4">
          Версия 1.0.0
        </div>

        {/* Кнопка выхода */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold"
          onClick={onLogout}
        >
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти из аккаунта
        </Button>
      </div>

      {/* Диалог добавления квартиры */}
      <Dialog open={showApartmentDialog} onOpenChange={setShowApartmentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Добавить квартиру</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="complex" className="text-sm font-semibold text-gray-900 mb-2 block">
                ЖК / Комплекс <span className="text-red-500">*</span>
              </Label>
              <Input
                id="complex"
                placeholder="Название комплекса"
                className="h-12 rounded-xl border-gray-300"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="entrance" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Подъезд <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="entrance"
                  placeholder="1"
                  className="h-12 rounded-xl border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="apartment-number" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Квартира <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="apartment-number"
                  placeholder="45"
                  className="h-12 rounded-xl border-gray-300"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Icon name="Info" className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-gray-700">
                Ваши данные будут проверены управляющей компанией в течение 24 часов
              </p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-semibold"
                onClick={() => setShowApartmentDialog(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold"
                onClick={() => {
                  toast.success('Квартира добавлена на проверку');
                  setShowApartmentDialog(false);
                }}
              >
                Добавить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования профиля */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Редактировать профиль</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-900 mb-2 block">
                Номер телефона
              </Label>
              <Input
                id="phone"
                defaultValue={userData.phone}
                disabled
                className="h-12 rounded-xl border-gray-300 bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Изменить номер можно через поддержку</p>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-900 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="h-12 rounded-xl border-gray-300"
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                Статус
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userData.status === 'owner'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <p className="font-semibold text-gray-900">Собственник</p>
                </button>
                <button
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userData.status === 'tenant'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <p className="font-semibold text-gray-900">Арендатор</p>
                </button>
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-semibold"
                onClick={() => setShowEditProfile(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold"
                onClick={() => {
                  toast.success('Профиль обновлен');
                  setShowEditProfile(false);
                }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileScreen;