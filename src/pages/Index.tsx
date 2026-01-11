import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

type RequestStatus = 'new' | 'in_progress' | 'completed';
type RequestCategory = 'plumbing' | 'electricity' | 'elevator' | 'common_area' | 'warranty';

interface Request {
  id: string;
  title: string;
  category: RequestCategory;
  status: RequestStatus;
  date: string;
  apartment: string;
  description: string;
  rating?: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      title: 'Протечка в ванной',
      category: 'plumbing',
      status: 'in_progress',
      date: '2026-01-10',
      apartment: '45',
      description: 'Течет кран под раковиной',
    },
    {
      id: '2',
      title: 'Не работает свет в коридоре',
      category: 'electricity',
      status: 'new',
      date: '2026-01-11',
      apartment: '45',
      description: 'Пропало освещение на 5 этаже',
    },
    {
      id: '3',
      title: 'Ремонт двери',
      category: 'warranty',
      status: 'completed',
      date: '2026-01-05',
      apartment: '45',
      description: 'Гарантийный ремонт входной двери',
      rating: 5,
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    title: '',
    category: '' as RequestCategory,
    description: '',
  });

  const statusColors: Record<RequestStatus, string> = {
    new: 'bg-blue-500',
    in_progress: 'bg-yellow-500',
    completed: 'bg-green-500',
  };

  const statusLabels: Record<RequestStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Выполнена',
  };

  const categoryIcons: Record<RequestCategory, string> = {
    plumbing: 'Droplet',
    electricity: 'Zap',
    elevator: 'MoveVertical',
    common_area: 'Building2',
    warranty: 'ShieldCheck',
  };

  const categoryLabels: Record<RequestCategory, string> = {
    plumbing: 'Сантехника',
    electricity: 'Электричество',
    elevator: 'Лифт',
    common_area: 'Общие зоны',
    warranty: 'Гарантия',
  };

  const handleCreateRequest = () => {
    if (!newRequest.title || !newRequest.category) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const request: Request = {
      id: Date.now().toString(),
      title: newRequest.title,
      category: newRequest.category,
      status: 'new',
      date: new Date().toISOString().split('T')[0],
      apartment: '45',
      description: newRequest.description,
    };

    setRequests([request, ...requests]);
    setNewRequest({ title: '', category: '' as RequestCategory, description: '' });
    toast.success('Заявка создана успешно!');
  };

  const analyticsData = {
    totalRequests: 247,
    activeRequests: 18,
    avgResponseTime: '2.5 ч',
    satisfaction: 4.6,
  };

  const problemsByCategory = [
    { category: 'Сантехника', count: 89, trend: '+12%' },
    { category: 'Электричество', count: 64, trend: '-5%' },
    { category: 'Лифты', count: 42, trend: '+8%' },
    { category: 'Общие зоны', count: 52, trend: '+3%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <header className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                MyResidence
              </h1>
              <p className="text-gray-600 mt-1">ЖК Солнечный • Квартира 45</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Bell" size={24} />
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Icon name="ClipboardList" size={18} />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-shadow animate-scale-in">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Home" className="text-primary" size={24} />
                  </div>
                  <p className="text-sm text-gray-600">Моя квартира</p>
                  <p className="text-2xl font-bold font-heading mt-1">45</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Wallet" className="text-secondary" size={24} />
                  </div>
                  <p className="text-sm text-gray-600">Баланс</p>
                  <p className="text-2xl font-bold font-heading mt-1 text-green-600">0 ₽</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="ClipboardList" className="text-blue-500" size={24} />
                  </div>
                  <p className="text-sm text-gray-600">Заявки</p>
                  <p className="text-2xl font-bold font-heading mt-1">{requests.filter(r => r.status !== 'completed').length}</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Star" className="text-yellow-500" size={24} />
                  </div>
                  <p className="text-sm text-gray-600">Рейтинг УК</p>
                  <p className="text-2xl font-bold font-heading mt-1">4.8</p>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Icon name="Plus" size={20} />
                  Быстрая заявка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-blue-50 hover:border-primary transition-colors">
                        <Icon name="Droplet" className="text-primary" size={28} />
                        <span className="text-sm">Сантехника</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-heading">Создать заявку</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Проблема</label>
                          <Input
                            placeholder="Опишите проблему"
                            value={newRequest.title}
                            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Категория</label>
                          <Select
                            value={newRequest.category}
                            onValueChange={(value) => setNewRequest({ ...newRequest, category: value as RequestCategory })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plumbing">Сантехника</SelectItem>
                              <SelectItem value="electricity">Электричество</SelectItem>
                              <SelectItem value="elevator">Лифт</SelectItem>
                              <SelectItem value="common_area">Общие зоны</SelectItem>
                              <SelectItem value="warranty">Гарантия</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Описание</label>
                          <Textarea
                            placeholder="Подробное описание проблемы..."
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleCreateRequest} className="w-full">
                          Отправить заявку
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-yellow-50 hover:border-yellow-500 transition-colors">
                    <Icon name="Zap" className="text-yellow-600" size={28} />
                    <span className="text-sm">Электрика</span>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-purple-50 hover:border-purple-500 transition-colors">
                    <Icon name="MoveVertical" className="text-purple-600" size={28} />
                    <span className="text-sm">Лифт</span>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-green-50 hover:border-green-500 transition-colors">
                    <Icon name="Building2" className="text-green-600" size={28} />
                    <span className="text-sm">Общие зоны</span>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-red-50 hover:border-red-500 transition-colors">
                    <Icon name="ShieldCheck" className="text-red-600" size={28} />
                    <span className="text-sm">Гарантия</span>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-gray-50 hover:border-gray-500 transition-colors">
                    <Icon name="MoreHorizontal" className="text-gray-600" size={28} />
                    <span className="text-sm">Другое</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Icon name="Bell" size={20} />
                  Объявления
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Icon name="Info" className="text-blue-600 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Плановое отключение воды</p>
                    <p className="text-sm text-gray-600 mt-1">12 января с 9:00 до 15:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Icon name="CheckCircle2" className="text-green-600 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Ремонт лифта завершен</p>
                    <p className="text-sm text-gray-600 mt-1">Лифт №2 снова работает</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold">Мои заявки</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Новая заявка
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-heading">Создать заявку</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Проблема</label>
                      <Input
                        placeholder="Опишите проблему"
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Категория</label>
                      <Select
                        value={newRequest.category}
                        onValueChange={(value) => setNewRequest({ ...newRequest, category: value as RequestCategory })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plumbing">Сантехника</SelectItem>
                          <SelectItem value="electricity">Электричество</SelectItem>
                          <SelectItem value="elevator">Лифт</SelectItem>
                          <SelectItem value="common_area">Общие зоны</SelectItem>
                          <SelectItem value="warranty">Гарантия</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Описание</label>
                      <Textarea
                        placeholder="Подробное описание проблемы..."
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleCreateRequest} className="w-full">
                      Отправить заявку
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {requests.map((request, index) => (
              <Card key={request.id} className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        request.category === 'plumbing' ? 'bg-blue-100' :
                        request.category === 'electricity' ? 'bg-yellow-100' :
                        request.category === 'elevator' ? 'bg-purple-100' :
                        request.category === 'common_area' ? 'bg-green-100' :
                        'bg-red-100'
                      }`}>
                        <Icon 
                          name={categoryIcons[request.category]} 
                          className={
                            request.category === 'plumbing' ? 'text-blue-600' :
                            request.category === 'electricity' ? 'text-yellow-600' :
                            request.category === 'elevator' ? 'text-purple-600' :
                            request.category === 'common_area' ? 'text-green-600' :
                            'text-red-600'
                          }
                          size={20}
                        />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg">{request.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {new Date(request.date).toLocaleDateString('ru')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="MapPin" size={14} />
                            Кв. {request.apartment}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${statusColors[request.status]} text-white`}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                  
                  {request.status === 'completed' && request.rating && (
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t">
                      <span className="text-sm text-gray-600 mr-2">Оценка:</span>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < request.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  )}

                  {request.status === 'in_progress' && (
                    <Button variant="outline" size="sm" className="mt-3 gap-2">
                      <Icon name="MessageCircle" size={16} />
                      Написать исполнителю
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Shield" className="text-secondary" size={24} />
              <h2 className="text-2xl font-heading font-bold">Панель управляющей компании</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="animate-scale-in">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Всего заявок</p>
                    <Icon name="TrendingUp" className="text-green-600" size={18} />
                  </div>
                  <p className="text-3xl font-bold font-heading">{analyticsData.totalRequests}</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Активных</p>
                    <Icon name="Activity" className="text-blue-600" size={18} />
                  </div>
                  <p className="text-3xl font-bold font-heading text-blue-600">{analyticsData.activeRequests}</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Ср. время</p>
                    <Icon name="Clock" className="text-purple-600" size={18} />
                  </div>
                  <p className="text-3xl font-bold font-heading text-purple-600">{analyticsData.avgResponseTime}</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Удовлетворенность</p>
                    <Icon name="Star" className="text-yellow-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold font-heading text-yellow-600">{analyticsData.satisfaction}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Icon name="BarChart3" size={20} />
                  Проблемы по категориям
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {problemsByCategory.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{item.count}</span>
                          <Badge variant={item.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-yellow-500' :
                            index === 2 ? 'bg-purple-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(item.count / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Icon name="MapPin" size={20} />
                  Карта повторяющихся проблем
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold">Подъезд 2, этаж 5</p>
                        <p className="text-sm text-gray-600 mt-1">Проблемы с освещением</p>
                        <p className="text-xs text-gray-500 mt-2">3 заявки за месяц</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Лифт №3</p>
                        <p className="text-sm text-gray-600 mt-1">Частые поломки</p>
                        <p className="text-xs text-gray-500 mt-2">2 заявки за месяц</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Подъезд 1, парковка</p>
                        <p className="text-sm text-gray-600 mt-1">Проблемы с освещением</p>
                        <p className="text-xs text-gray-500 mt-2">2 заявки за месяц</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Детская площадка</p>
                        <p className="text-sm text-gray-600 mt-1">Требуется ремонт</p>
                        <p className="text-xs text-gray-500 mt-2">2 заявки за месяц</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
