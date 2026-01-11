import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface VotingScreenProps {
  onBack: () => void;
}

const VotingScreen = ({ onBack }: VotingScreenProps) => {
  const activeVoting = [
    {
      id: '1',
      title: 'Ремонт детской площадки',
      description: 'Предлагается провести капитальный ремонт детской площадки с установкой нового оборудования',
      deadline: '2026-01-20',
      votesFor: 45,
      votesAgainst: 12,
      total: 100,
    },
  ];

  const completedVoting = [
    {
      id: '2',
      title: 'Установка камер видеонаблюдения',
      result: 'Принято',
      votesFor: 78,
      votesAgainst: 15,
      date: '2026-01-05',
    },
  ];

  const handleVote = (voteId: string, vote: 'for' | 'against') => {
    toast.success(`Ваш голос "${vote === 'for' ? 'За' : 'Против'}" учтён`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 pb-24">
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Голосования</h1>
      </div>

      <div className="space-y-3">
        <h2 className="font-heading font-semibold text-lg">Активные голосования</h2>
        {activeVoting.map((voting, index) => (
          <Card
            key={voting.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="font-heading text-lg">{voting.title}</CardTitle>
                <Badge className="bg-green-500">Активно</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{voting.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Прогресс голосования</span>
                  <span className="font-medium">
                    {voting.votesFor + voting.votesAgainst} из {voting.total}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${((voting.votesFor + voting.votesAgainst) / voting.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="ThumbsUp" className="text-green-600" size={16} />
                  <span>За: {voting.votesFor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="ThumbsDown" className="text-red-600" size={16} />
                  <span>Против: {voting.votesAgainst}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Clock" size={14} />
                <span>До {new Date(voting.deadline).toLocaleDateString('ru')}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={() => handleVote(voting.id, 'for')}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Icon name="ThumbsUp" size={18} />
                  За
                </Button>
                <Button
                  onClick={() => handleVote(voting.id, 'against')}
                  variant="destructive"
                  className="gap-2"
                >
                  <Icon name="ThumbsDown" size={18} />
                  Против
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3 mt-8">
        <h2 className="font-heading font-semibold text-lg">Завершённые</h2>
        {completedVoting.map((voting, index) => (
          <Card key={voting.id} className="animate-fade-in">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold">{voting.title}</h3>
                  <Badge className="bg-blue-500 mt-2">{voting.result}</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>За: {voting.votesFor} • Против: {voting.votesAgainst}</span>
                <span>{new Date(voting.date).toLocaleDateString('ru')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VotingScreen;
