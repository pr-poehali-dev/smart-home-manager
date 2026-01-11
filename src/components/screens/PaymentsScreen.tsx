import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface PaymentsScreenProps {
  onBack: () => void;
}

const PaymentsScreen = ({ onBack }: PaymentsScreenProps) => {
  const currentBill = { amount: 5420, dueDate: '2026-01-15', status: 'unpaid' };
  const history = [
    { month: 'Декабрь 2025', amount: 5320, status: 'paid', date: '2025-12-10' },
    { month: 'Ноябрь 2025', amount: 5180, status: 'paid', date: '2025-11-09' },
    { month: 'Октябрь 2025', amount: 5240, status: 'paid', date: '2025-10-12' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Платежи</h1>
      </div>

      <Card className="animate-scale-in bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
        <CardContent className="pt-6 pb-6">
          <p className="text-sm opacity-90 mb-1">К оплате</p>
          <p className="text-4xl font-bold font-heading mb-4">{currentBill.amount.toLocaleString()} ₽</p>
          <p className="text-sm opacity-90 mb-4">До {new Date(currentBill.dueDate).toLocaleDateString('ru')}</p>
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
            Оплатить сейчас
          </Button>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-heading text-lg">
            <span>Автоплатёж</span>
            <Switch />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Оплата будет списываться автоматически за 3 дня до срока
          </p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="font-heading text-lg">История платежей</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{payment.month}</p>
                <p className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString('ru')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{payment.amount.toLocaleString()} ₽</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <Icon name="CheckCircle2" size={14} />
                  <span>Оплачено</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsScreen;
