import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface RequestsScreenProps {
  onBack: () => void;
}

type RequestStatus = 'new' | 'in_progress' | 'completed';
type RequestCategory = 'plumbing' | 'electricity' | 'elevator' | 'heating' | 'common_area' | 'other';

interface Request {
  id: string;
  title: string;
  category: RequestCategory;
  status: RequestStatus;
  date: string;
  description: string;
  rating?: number;
  photos?: string[];
}

const RequestsScreen = ({ onBack }: RequestsScreenProps) => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      title: 'Протечка в ванной',
      category: 'plumbing',
      status: 'in_progress',
      date: '2026-01-10',
      description: 'Течет кран под раковиной',
    },
    {
      id: '2',
      title: 'Не работает свет',
      category: 'electricity',
      status: 'new',
      date: '2026-01-11',
      description: 'Пропало освещение на 5 этаже',
    },
  ]);

  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    category: '' as RequestCategory | '',
    description: '',
    location: '',
    photos: [] as string[],
  });

  const statusColors: Record<RequestStatus, string> = {
    new: 'bg-blue-500',
    in_progress: 'bg-yellow-500',
    completed: 'bg-green-500',
  };

  const statusLabels: Record<RequestStatus, string> = {
    new: 'Открыта',
    in_progress: 'В работе',
    completed: 'Закрыта',
  };

  const categories = [
    { value: 'plumbing', label: 'Сантехника', icon: '💧', color: 'bg-blue-50 text-blue-600' },
    { value: 'electricity', label: 'Электрика', icon: '⚡', color: 'bg-yellow-50 text-yellow-600' },
    { value: 'elevator', label: 'Лифт', icon: '🛗', color: 'bg-purple-50 text-purple-600' },
    { value: 'heating', label: 'Отопление', icon: '🔥', color: 'bg-orange-50 text-orange-600' },
    { value: 'common_area', label: 'Общие зоны', icon: '🏢', color: 'bg-green-50 text-green-600' },
    { value: 'other', label: 'Другое', icon: '📋', color: 'bg-gray-50 text-gray-600' },
  ];

  const handleCreateRequest = () => {
    if (!newRequest.title || !newRequest.category || !newRequest.description) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const request: Request = {
      id: Date.now().toString(),
      title: newRequest.title,
      category: newRequest.category as RequestCategory,
      status: 'new',
      date: new Date().toISOString().split('T')[0],
      description: newRequest.description,
      photos: newRequest.photos,
    };

    setRequests([request, ...requests]);
    setNewRequest({ title: '', category: '', description: '', location: '', photos: [] });
    setShowNewRequestDialog(false);
    toast.success('Заявка успешно создана!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  };

  const getCategoryData = (category: RequestCategory) => {
    return categories.find((c) => c.value === category) || categories[5];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Заявки</h1>
            <p className="text-sm text-gray-600">Всего заявок — {requests.length}</p>
          </div>
        </div>
      </div>

      {/* Список заявок */}
      <div className="p-4 space-y-3">
        {requests.map((request) => {
          const categoryData = getCategoryData(request.category);
          return (
            <Card key={request.id} className="border border-gray-200 rounded-2xl overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl ${categoryData.color} flex items-center justify-center text-2xl shrink-0`}>
                    {categoryData.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          №{request.id.slice(-4)} {request.status === 'new' && 'открыта'}
                          {request.status === 'in_progress' && 'в работе'}
                          {request.status === 'completed' && 'закрыта'}
                        </h3>
                        <p className="text-sm text-gray-600">{request.description}</p>
                      </div>
                      <Badge
                        className={`${
                          request.status === 'new'
                            ? 'bg-orange-50 text-orange-600 border-orange-200'
                            : request.status === 'in_progress'
                            ? 'bg-cyan-50 text-cyan-600 border-cyan-200'
                            : 'bg-green-50 text-green-600 border-green-200'
                        } shrink-0`}
                        variant="outline"
                      >
                        {request.status === 'new' && 'Платная'}
                        {request.status === 'in_progress' && 'Платная'}
                        {request.status === 'completed' && 'Закрыта'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatDate(request.date)}</span>
                    </div>
                  </div>

                  <Icon name="ChevronRight" size={20} className="text-gray-400 shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Кнопка создать заявку */}
      <Button
        onClick={() => setShowNewRequestDialog(true)}
        className="fixed bottom-24 right-4 h-14 px-6 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
      >
        <Icon name="Plus" size={20} className="mr-2" />
        Создать заявку
      </Button>

      {/* Диалог новой заявки */}
      <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Новая заявка</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Выбор категории */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-3 block">
                Категория проблемы <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setNewRequest({ ...newRequest, category: cat.value as RequestCategory })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      newRequest.category === cat.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium text-gray-900">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Заголовок */}
            <div>
              <Label htmlFor="title" className="text-sm font-semibold text-gray-900 mb-2 block">
                Заголовок <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Icon name="FileText" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="title"
                  placeholder="Кратко опишите проблему"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  className="pl-10 h-12 rounded-xl border-gray-300"
                />
              </div>
            </div>

            {/* Местоположение */}
            <div>
              <Label htmlFor="location" className="text-sm font-semibold text-gray-900 mb-2 block">
                Местоположение
              </Label>
              <div className="relative">
                <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Где находится проблема?"
                  value={newRequest.location}
                  onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                  className="pl-10 h-12 rounded-xl border-gray-300"
                />
              </div>
            </div>

            {/* Описание */}
            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-900 mb-2 block">
                Подробное описание <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Опишите проблему детально: что случилось, когда заметили, какие есть последствия..."
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                className="min-h-[120px] rounded-xl border-gray-300 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">Минимум 20 символов</p>
            </div>

            {/* Фото */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                Прикрепить фото
              </Label>
              <button
                type="button"
                className="w-full h-32 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <Icon name="Camera" size={32} className="text-gray-400" />
                <span className="text-sm text-gray-600 font-medium">Добавить фото</span>
                <span className="text-xs text-gray-500">Максимум 5 фото</span>
              </button>
            </div>

            {/* Кнопки */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-semibold"
                onClick={() => setShowNewRequestDialog(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
                onClick={handleCreateRequest}
              >
                Создать заявку
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsScreen;
