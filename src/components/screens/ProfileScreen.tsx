import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { tajikComplexes } from '@/data/tajikData';

interface ProfileScreenProps {
  userData: any;
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen = ({ userData, onBack, onLogout }: ProfileScreenProps) => {
  const { t } = useLanguage();
  const [showApartmentDialog, setShowApartmentDialog] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
  });
  const [biometrics, setBiometrics] = useState(false);
  const [newApartment, setNewApartment] = useState({
    complex: tajikComplexes[0],
    entrance: '',
    apartment: '',
  });

  const apartments = [
    { id: '1', complex: userData.complex || tajikComplexes[0], entrance: userData.entrance || '1', apartment: userData.apartment || '45', isActive: true },
    { id: '2', complex: tajikComplexes[1], entrance: '2', apartment: '78', isActive: false },
  ];

  const handleAddApartment = () => {
    if (!newApartment.apartment || !newApartment.entrance) {
      toast.error(t.requests.fillRequired);
      return;
    }
    toast.success(t.profile.apartmentAdded);
    setShowApartmentDialog(false);
    setNewApartment({ complex: tajikComplexes[0], entrance: '', apartment: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 flex-1">{t.profile.title}</h1>
          <LanguageSwitcher />
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
                  <p className="text-sm opacity-90">{userData.status === 'owner' ? t.auth.owner : t.auth.tenant}</p>
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
                    <p className="text-sm text-gray-600">{t.profile.complex}</p>
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
                    <p className="text-sm text-gray-600">{t.profile.apartment}</p>
                    <p className="font-semibold text-gray-900">{t.auth.entrance} {userData.entrance}, кв. {userData.apartment}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                  onClick={() => setShowApartmentDialog(true)}
                >
                  {t.profile.changeApartment}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Мои квартиры */}
        <Card className="border border-gray-200 rounded-3xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{t.profile.myApartments}</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 text-sm h-8"
                onClick={() => setShowApartmentDialog(true)}
              >
                <Icon name="Plus" size={16} className="mr-1" />
                {t.profile.addApartment}
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
                        <p className="text-sm text-gray-600">{t.auth.entrance} {apt.entrance}, кв. {apt.apartment}</p>
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
            <h3 className="font-bold text-gray-900 mb-4">{t.profile.notifications}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <Icon name="Bell" className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t.profile.pushNotifications}</p>
                    <p className="text-xs text-gray-600">{t.profile.pushDesc}</p>
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
                    <p className="font-medium text-gray-900">{t.profile.emailNotifications}</p>
                    <p className="text-xs text-gray-600">{t.profile.emailDesc}</p>
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
                    <p className="font-medium text-gray-900">{t.profile.smsNotifications}</p>
                    <p className="text-xs text-gray-600">{t.profile.smsDesc}</p>
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
            <h3 className="font-bold text-gray-900 mb-4">{t.profile.security}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Icon name="Fingerprint" className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t.profile.biometrics}</p>
                    <p className="text-xs text-gray-600">{t.profile.biometricsDesc}</p>
                  </div>
                </div>
                <Switch checked={biometrics} onCheckedChange={setBiometrics} />
              </div>
              
              <button className="flex items-center gap-3 w-full py-3 px-2 rounded-xl hover:bg-gray-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon name="Lock" className="text-red-600" size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{t.profile.changePassword}</p>
                  <p className="text-xs text-gray-600">{t.profile.changePasswordDesc}</p>
                </div>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Помощь и поддержка */}
        <Card className="border border-gray-200 rounded-3xl">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 mb-4">{t.profile.helpSupport}</h3>
            <div className="space-y-2">
              <button className="flex items-center gap-3 w-full py-3 px-2 rounded-xl hover:bg-gray-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon name="FileText" className="text-gray-600" size={20} />
                </div>
                <p className="flex-1 text-left font-medium text-gray-900">{t.profile.termsOfUse}</p>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
              
              <button className="flex items-center gap-3 w-full py-3 px-2 rounded-xl hover:bg-gray-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon name="Shield" className="text-gray-600" size={20} />
                </div>
                <p className="flex-1 text-left font-medium text-gray-900">{t.profile.privacyPolicy}</p>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
              
              <button className="flex items-center gap-3 w-full py-3 px-2 rounded-xl hover:bg-gray-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon name="Star" className="text-gray-600" size={20} />
                </div>
                <p className="flex-1 text-left font-medium text-gray-900">{t.profile.rateApp}</p>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Версия приложения */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">{t.profile.version} 1.0.0</p>
        </div>

        {/* Выход */}
        <Button
          variant="outline"
          className="w-full h-12 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 font-semibold rounded-xl"
          onClick={onLogout}
        >
          <Icon name="LogOut" size={20} className="mr-2" />
          {t.profile.logout}
        </Button>
      </div>

      {/* Диалог добавления квартиры */}
      <Dialog open={showApartmentDialog} onOpenChange={setShowApartmentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.profile.addApartmentTitle}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="complex">{t.profile.complex}</Label>
              <Select value={newApartment.complex} onValueChange={(value) => setNewApartment({ ...newApartment, complex: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t.profile.complexPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {tajikComplexes.map((complex) => (
                    <SelectItem key={complex} value={complex}>
                      {complex}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="entrance">{t.profile.entranceNumber}</Label>
              <Input
                id="entrance"
                placeholder="1"
                value={newApartment.entrance}
                onChange={(e) => setNewApartment({ ...newApartment, entrance: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="apartment">{t.auth.apartmentNumber}</Label>
              <Input
                id="apartment"
                placeholder="45"
                value={newApartment.apartment}
                onChange={(e) => setNewApartment({ ...newApartment, apartment: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowApartmentDialog(false)}
                className="flex-1"
              >
                {t.cancel}
              </Button>
              <Button onClick={handleAddApartment} className="flex-1">
                {t.profile.addApartment}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования профиля */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.profile.editProfile}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>{t.auth.phone}</Label>
              <Input value={userData.phone} disabled />
              <p className="text-xs text-gray-500 mt-1">{t.profile.phoneNote}</p>
            </div>

            <div>
              <Label>{t.profile.status}</Label>
              <Select defaultValue={userData.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">{t.auth.owner}</SelectItem>
                  <SelectItem value="tenant">{t.auth.tenant}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEditProfile(false)}
                className="flex-1"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={() => {
                  toast.success(t.profile.profileUpdated);
                  setShowEditProfile(false);
                }}
                className="flex-1"
              >
                {t.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileScreen;
