import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ApartmentScreenProps {
  userData: any;
  onBack: () => void;
}

const ApartmentScreen = ({ userData, onBack }: ApartmentScreenProps) => {
  const meters = [
    { type: 'Холодная вода', value: '145.2', unit: 'м³', icon: 'Droplet' },
    { type: 'Горячая вода', value: '89.5', unit: 'м³', icon: 'Flame' },
    { type: 'Электричество', value: '1234', unit: 'кВт⋅ч', icon: 'Zap' },
  ];

  const documents = [
    { name: 'Акт приёмки квартиры', date: '2024-06-15', icon: 'FileCheck' },
    { name: 'Гарантийный талон', date: '2024-06-15', icon: 'ShieldCheck' },
    { name: 'Инструкция по эксплуатации', date: '2024-06-15', icon: 'Book' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Моя квартира</h1>
      </div>

      <Card className="animate-scale-in bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Home" size={32} />
            <div>
              <p className="text-2xl font-bold font-heading">Квартира {userData.apartment}</p>
              <p className="text-sm opacity-90">Подъезд {userData.entrance}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm opacity-90">Площадь</p>
              <p className="text-lg font-bold">65 м²</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Этаж</p>
              <p className="text-lg font-bold">5 из 12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-lg">
            <Icon name="Gauge" size={20} />
            Счётчики
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {meters.map((meter, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={meter.icon} className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium">{meter.type}</p>
                  <p className="text-sm text-gray-600">Показания</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{meter.value}</p>
                <p className="text-sm text-gray-600">{meter.unit}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full gap-2">
            <Icon name="Edit" size={18} />
            Передать показания
          </Button>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-lg">
            <Icon name="FileText" size={20} />
            Документы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {documents.map((doc, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-between h-auto py-3"
            >
              <div className="flex items-center gap-3">
                <Icon name={doc.icon} className="text-primary" size={20} />
                <div className="text-left">
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-gray-600">{new Date(doc.date).toLocaleDateString('ru')}</p>
                </div>
              </div>
              <Icon name="Download" className="text-gray-400" size={18} />
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApartmentScreen;
