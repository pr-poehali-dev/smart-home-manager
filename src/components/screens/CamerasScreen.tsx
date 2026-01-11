import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface CamerasScreenProps {
  onBack: () => void;
}

const CamerasScreen = ({ onBack }: CamerasScreenProps) => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const cameras = [
    { id: '1', name: 'Подъезд 1', status: 'online', location: 'entrance' },
    { id: '2', name: 'Лифт №1', status: 'online', location: 'elevator' },
    { id: '3', name: 'Двор', status: 'online', location: 'yard' },
    { id: '4', name: 'Парковка', status: 'online', location: 'parking' },
  ];

  if (selectedCamera) {
    const camera = cameras.find((c) => c.id === selectedCamera);
    return (
      <div className="h-screen flex flex-col bg-black">
        <div className="bg-black/80 backdrop-blur p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSelectedCamera(null)} className="text-white">
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-white font-heading font-bold">{camera?.name}</h1>
          <Button variant="ghost" size="icon" className="text-white">
            <Icon name="Maximize" size={24} />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <Icon name="Video" className="text-white/50 mb-4" size={64} />
            <p className="text-white/70">Live видео</p>
            <p className="text-white/50 text-sm mt-2">{camera?.name}</p>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur p-4 flex gap-2 justify-center">
          <Button variant="secondary" size="icon">
            <Icon name="Camera" size={20} />
          </Button>
          <Button variant="secondary" size="icon">
            <Icon name="ZoomIn" size={20} />
          </Button>
          <Button variant="secondary" size="icon">
            <Icon name="Archive" size={20} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Камеры</h1>
      </div>

      <Tabs defaultValue="live">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="archive">Архив</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-3 mt-4">
          {cameras.map((camera, index) => (
            <Card
              key={camera.id}
              className="animate-fade-in hover:shadow-lg transition-shadow cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedCamera(camera.id)}
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg flex items-center justify-center relative">
                  <Icon name="Video" className="text-white/50" size={48} />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold">{camera.name}</h3>
                    <p className="text-sm text-gray-600">Сегодня, {new Date().toLocaleTimeString('ru')}</p>
                  </div>
                  <Icon name="Play" className="text-primary" size={24} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="archive" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Icon name="Archive" className="text-gray-400 mb-4 mx-auto" size={48} />
              <p className="text-gray-600">Выберите дату и время для просмотра архива</p>
              <Button className="mt-4">Выбрать период</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CamerasScreen;
