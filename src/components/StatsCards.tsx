
import { Users, Star, Bookmark, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee } from '@/hooks/useEmployees';

interface StatsCardsProps {
  employees: Employee[];
  bookmarks: number[];
}

const StatsCards = ({ employees, bookmarks }: StatsCardsProps) => {
  const totalEmployees = employees.length;
  const averageRating = employees.reduce((sum, emp) => sum + emp.rating, 0) / totalEmployees || 0;
  const totalBookmarks = bookmarks.length;
  const highPerformers = employees.filter(emp => emp.rating >= 4.5).length;

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Average Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Bookmarked',
      value: totalBookmarks,
      icon: Bookmark,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'High Performers',
      value: highPerformers,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
