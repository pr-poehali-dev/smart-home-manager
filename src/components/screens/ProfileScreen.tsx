import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface ProfileScreenProps {
  userData: any;
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen = ({ userData, onBack, onLogout }: ProfileScreenProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Профиль</h1>
      </div>

      <Card className="animate-scale-in">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
              {userData.phone.slice(-2)}
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-bold text-lg">{userData.phone}</h2>
              <p className="text-sm text-gray-600">{userData.status === 'owner' ? 'Собственник' : 'Арендатор'}</p>
            </div>
            <Button variant="outline" size="sm">
              Изменить
            </Button>
          </div>

          <div className="mt-6 space-y-3 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Building2" className="text-gray-600" size={20} />
                <div>
                  <p className="font-medium">Комплекс</p>
                  <p className="text-sm text-gray-600">{userData.complex}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Home" className="text-gray-600" size={20} />
                <div>
                  <p className="font-medium">Квартира</p>
                  <p className="text-sm text-gray-600">Подъезд {userData.entrance}, кв. {userData.apartment}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Bell" className="text-gray-600" size={20} />
              <span>Push-уведомления</span>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Mail" className="text-gray-600" size={20} />
              <span>Email-уведомления</span>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Fingerprint" className="text-gray-600" size={20} />
              <span>Биометрия</span>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardContent className="pt-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Icon name="HelpCircle" size={20} />
            Помощь и поддержка
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Icon name="FileText" size={20} />
            Условия использования
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Icon name="Shield" size={20} />
            Политика конфиденциальности
          </Button>
        </CardContent>
      </Card>

      <Button variant="destructive" className="w-full" onClick={onLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default ProfileScreen;
