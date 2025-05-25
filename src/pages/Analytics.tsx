
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Award, PieChart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { useEmployees } from '@/hooks/useEmployees';
import { useBookmarks } from '@/hooks/useBookmarks';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const Analytics = () => {
  const { employees } = useEmployees();
  const { bookmarks } = useBookmarks();
  const [departmentData, setDepartmentData] = useState<any[]>([]);
  const [ratingDistribution, setRatingDistribution] = useState<any[]>([]);
  const [bookmarkTrends, setBookmarkTrends] = useState<any[]>([]);

  useEffect(() => {
    if (employees.length > 0) {
      // Department-wise analytics
      const deptStats = employees.reduce((acc: any, emp) => {
        if (!acc[emp.department]) {
          acc[emp.department] = { count: 0, totalRating: 0 };
        }
        acc[emp.department].count++;
        acc[emp.department].totalRating += emp.rating;
        return acc;
      }, {});

      const deptData = Object.entries(deptStats).map(([dept, stats]: [string, any]) => ({
        department: dept,
        averageRating: (stats.totalRating / stats.count).toFixed(1),
        employeeCount: stats.count,
        bookmarkedCount: employees.filter(emp => 
          emp.department === dept && bookmarks.includes(emp.id)
        ).length
      }));

      setDepartmentData(deptData);

      // Rating distribution
      const ratingStats = [1, 2, 3, 4, 5].map(rating => ({
        rating: `${rating} Star${rating > 1 ? 's' : ''}`,
        count: employees.filter(emp => Math.floor(emp.rating) === rating).length
      }));

      setRatingDistribution(ratingStats);

      // Mock bookmark trends (in a real app, this would come from historical data)
      const mockTrends = [
        { month: 'Jan', bookmarks: 5 },
        { month: 'Feb', bookmarks: 8 },
        { month: 'Mar', bookmarks: 12 },
        { month: 'Apr', bookmarks: 15 },
        { month: 'May', bookmarks: 18 },
        { month: 'Jun', bookmarks: bookmarks.length }
      ];

      setBookmarkTrends(mockTrends);
    }
  }, [employees, bookmarks]);

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6B7280', '#8B5A2B', '#EC4899'];

  const totalEmployees = employees.length;
  const averageRating = employees.reduce((sum, emp) => sum + emp.rating, 0) / totalEmployees || 0;
  const highPerformers = employees.filter(emp => emp.rating >= 4.5).length;
  const topDepartment = departmentData.sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating))[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span>Analytics Dashboard</span>
          </h1>
          <p className="text-gray-600">Insights into team performance and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalEmployees}</div>
              <p className="text-xs text-green-600 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Rating
              </CardTitle>
              <Award className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <p className="text-xs text-green-600 mt-1">+0.2 from last quarter</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                High Performers
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{highPerformers}</div>
              <p className="text-xs text-gray-600 mt-1">{Math.round((highPerformers / totalEmployees) * 100)}% of team</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Top Department
              </CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{topDepartment?.department || 'N/A'}</div>
              <p className="text-xs text-gray-600 mt-1">{topDepartment?.averageRating || 0} avg rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="departments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="departments">Department Analytics</TabsTrigger>
            <TabsTrigger value="ratings">Rating Distribution</TabsTrigger>
            <TabsTrigger value="trends">Bookmark Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Average Rating by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="department" 
                        angle={-45} 
                        textAnchor="end" 
                        height={80}
                        fontSize={12}
                      />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Bar dataKey="averageRating" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Employee Count by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        dataKey="employeeCount"
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ department, employeeCount }) => `${department}: ${employeeCount}`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Performance Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Bookmark Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={bookmarkTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="bookmarks" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
