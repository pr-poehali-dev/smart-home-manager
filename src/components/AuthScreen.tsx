import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AuthScreenProps {
  onComplete: (userData: any) => void;
}

const AuthScreen = ({ onComplete }: AuthScreenProps) => {
  const [step, setStep] = useState<'phone' | 'code' | 'apartment'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [status, setStatus] = useState<'owner' | 'tenant'>('owner');

  const handlePhoneSubmit = () => {
    if (phone.length < 10) {
      toast.error('Введите корректный номер телефона');
      return;
    }
    toast.success('Код отправлен на ваш телефон');
    setStep('code');
  };

  const handleCodeSubmit = () => {
    if (code.length !== 4) {
      toast.error('Введите 4-значный код');
      return;
    }
    setStep('apartment');
  };

  const handleApartmentSubmit = () => {
    if (!apartment || !entrance) {
      toast.error('Заполните все поля');
      return;
    }

    const userData = {
      phone,
      apartment,
      entrance,
      status,
      complex: 'ЖК Солнечный',
    };

    toast.success('Добро пожаловать!');
    onComplete(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center pb-3">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Building2" className="text-white" size={40} />
          </div>
          <CardTitle className="text-2xl font-heading">
            {step === 'phone' && 'Вход в приложение'}
            {step === 'code' && 'Введите код'}
            {step === 'apartment' && 'Ваша квартира'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'phone' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <div className="relative">
                  <Icon name="Phone" className="absolute left-3 top-3 text-gray-400" size={20} />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button onClick={handlePhoneSubmit} className="w-full" size="lg">
                Получить код
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">или войти через</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <Icon name="Mail" size={18} />
                  Email
                </Button>
                <Button variant="outline" className="gap-2">
                  <Icon name="Fingerprint" size={18} />
                  Bio ID
                </Button>
              </div>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Код отправлен на номер <br />
                  <span className="font-semibold">{phone}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Код подтверждения</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="____"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button onClick={handleCodeSubmit} className="w-full" size="lg">
                Подтвердить
              </Button>

              <Button variant="ghost" className="w-full" onClick={() => setStep('phone')}>
                Изменить номер
              </Button>
            </>
          )}

          {step === 'apartment' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="apartment">Номер квартиры</Label>
                <Input
                  id="apartment"
                  type="text"
                  placeholder="45"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entrance">Подъезд / Корпус</Label>
                <Input
                  id="entrance"
                  type="text"
                  placeholder="1"
                  value={entrance}
                  onChange={(e) => setEntrance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Ваш статус</Label>
                <Select value={status} onValueChange={(value: 'owner' | 'tenant') => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Собственник</SelectItem>
                    <SelectItem value="tenant">Арендатор</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <Icon name="Info" className="text-blue-600 mt-0.5" size={18} />
                <p className="text-sm text-gray-700">
                  Ваши данные будут проверены управляющей компанией в течение 24 часов
                </p>
              </div>

              <Button onClick={handleApartmentSubmit} className="w-full" size="lg">
                Продолжить
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
