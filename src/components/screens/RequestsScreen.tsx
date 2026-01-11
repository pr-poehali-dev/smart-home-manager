import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    {
      id: '3',
      title: 'Ремонт двери',
      category: 'other',
      status: 'completed',
      date: '2026-01-05',
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
    heating: 'Flame',
    common_area: 'Building2',
    other: 'MoreHorizontal',
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
      description: newRequest.description,
    };

    setRequests([request, ...requests]);
    setNewRequest({ title: '', category: '' as RequestCategory, description: '' });
    toast.success('Заявка создана успешно!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center justify-between mb-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-2xl font-heading font-bold">Мои заявки</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Новая
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
                  onValueChange={(value) =>
                    setNewRequest({ ...newRequest, category: value as RequestCategory })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Сантехника</SelectItem>
                    <SelectItem value="electricity">Электричество</SelectItem>
                    <SelectItem value="elevator">Лифт</SelectItem>
                    <SelectItem value="heating">Отопление</SelectItem>
                    <SelectItem value="common_area">Общие зоны</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
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
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Icon name="Camera" size={18} />
                  Фото
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Icon name="Mic" size={18} />
                  Голос
                </Button>
              </div>
              <Button onClick={handleCreateRequest} className="w-full">
                Отправить заявку
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {requests.map((request, index) => (
          <Card
            key={request.id}
            className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name={categoryIcons[request.category]} className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold">{request.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Icon name="Calendar" size={14} />
                      {new Date(request.date).toLocaleDateString('ru')}
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
                <Button variant="outline" size="sm" className="mt-3 gap-2 w-full">
                  <Icon name="MessageCircle" size={16} />
                  Написать исполнителю
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RequestsScreen;
