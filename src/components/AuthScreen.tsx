import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { tajikComplexes } from '@/data/tajikData';

interface AuthScreenProps {
  onComplete: (userData: any) => void;
}

const AuthScreen = ({ onComplete }: AuthScreenProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'phone' | 'code' | 'apartment'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [complex, setComplex] = useState('');
  const [status, setStatus] = useState<'owner' | 'tenant'>('owner');

  const handlePhoneSubmit = () => {
    if (phone.length < 10) {
      toast.error(t.requests.fillRequired);
      return;
    }
    toast.success(t.auth.codeSentTo);
    setStep('code');
  };

  const handleCodeSubmit = () => {
    if (code.length !== 4) {
      toast.error(t.requests.fillRequired);
      return;
    }
    setStep('apartment');
  };

  const handleApartmentSubmit = () => {
    if (!apartment || !entrance || !complex) {
      toast.error(t.requests.fillRequired);
      return;
    }

    const userData = {
      phone,
      apartment,
      entrance,
      status,
      complex: complex,
    };

    toast.success(t.auth.welcome);
    onComplete(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center pb-3">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Building2" className="text-white" size={40} />
          </div>
          <CardTitle className="text-2xl font-heading">
            {step === 'phone' && t.auth.login}
            {step === 'code' && t.auth.enterCode}
            {step === 'apartment' && t.auth.yourApartment}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'phone' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.auth.phone}</Label>
                <div className="relative">
                  <Icon name="Phone" className="absolute left-3 top-3 text-gray-400" size={20} />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.auth.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button onClick={handlePhoneSubmit} className="w-full" size="lg">
                {t.auth.getCode}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t.auth.orLoginWith}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <Icon name="Mail" size={18} />
                  {t.auth.email}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Icon name="Fingerprint" size={18} />
                  {t.auth.bioId}
                </Button>
              </div>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  {t.auth.codeSentTo} <br />
                  <span className="font-semibold">{phone}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">{t.auth.confirmCode}</Label>
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
                {t.auth.confirm}
              </Button>

              <Button variant="ghost" className="w-full" onClick={() => setStep('phone')}>
                {t.auth.changeNumber}
              </Button>
            </>
          )}

          {step === 'apartment' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="complex">{t.profile.complex}</Label>
                <Select value={complex} onValueChange={setComplex}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.profile.complexPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {tajikComplexes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartment">{t.auth.apartmentNumber}</Label>
                <Input
                  id="apartment"
                  type="text"
                  placeholder="45"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entrance">{t.auth.entrance}</Label>
                <Input
                  id="entrance"
                  type="text"
                  placeholder="1"
                  value={entrance}
                  onChange={(e) => setEntrance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.auth.yourStatus}</Label>
                <Select value={status} onValueChange={(value: 'owner' | 'tenant') => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">{t.auth.owner}</SelectItem>
                    <SelectItem value="tenant">{t.auth.tenant}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <Icon name="Info" className="text-blue-600 mt-0.5" size={18} />
                <p className="text-sm text-gray-700">
                  {t.auth.verificationInfo}
                </p>
              </div>

              <Button onClick={handleApartmentSubmit} className="w-full" size="lg">
                {t.auth.continue}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;