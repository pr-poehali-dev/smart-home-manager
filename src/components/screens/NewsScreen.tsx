import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface NewsScreenProps {
  onBack: () => void;
}

const NewsScreen = ({ onBack }: NewsScreenProps) => {
  const news = [
    {
      type: 'info',
      title: 'Плановое отключение воды',
      description: '12 января с 9:00 до 15:00 будет отключена холодная вода',
      date: '2026-01-10',
      icon: 'Info',
      color: 'blue',
    },
    {
      type: 'warning',
      title: 'Ремонт лифта',
      description: 'Лифт №2 будет на техническом обслуживании до 15:00',
      date: '2026-01-11',
      icon: 'AlertTriangle',
      color: 'yellow',
    },
    {
      type: 'success',
      title: 'Работы завершены',
      description: 'Ремонт детской площадки успешно завершен',
      date: '2026-01-09',
      icon: 'CheckCircle2',
      color: 'green',
    },
  ];

  const urgent = [
    {
      title: 'Экстренное отключение',
      description: 'Отключение электричества в подъезде 2',
      time: '10 минут назад',
      icon: 'AlertCircle',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Новости и уведомления</h1>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="urgent">Срочные</TabsTrigger>
          <TabsTrigger value="my">Мои</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {news.map((item, index) => (
            <Card
              key={index}
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${item.color}-100 flex items-center justify-center shrink-0`}
                  >
                    <Icon name={item.icon} className={`text-${item.color}-600`} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.date).toLocaleDateString('ru')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="urgent" className="space-y-3 mt-4">
          {urgent.map((item, index) => (
            <Card key={index} className="animate-fade-in border-red-200 bg-red-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-red-900">{item.title}</h3>
                    <p className="text-sm text-red-800 mt-1">{item.description}</p>
                    <p className="text-xs text-red-700 mt-2">{item.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="my" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Icon name="Bell" className="text-gray-400 mb-4 mx-auto" size={48} />
              <p className="text-gray-600">Здесь появятся уведомления, касающиеся именно вашей квартиры</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsScreen;
