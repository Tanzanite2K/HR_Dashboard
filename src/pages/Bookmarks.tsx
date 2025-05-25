
import { useState, useEffect } from 'react';
import { Bookmark, Users, Trash2, TrendingUp, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import EmployeeCard from '@/components/EmployeeCard';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useEmployees, Employee } from '@/hooks/useEmployees';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { employees } = useEmployees();
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const bookmarkedEmps = employees.filter(emp => bookmarks.includes(emp.id));
    setBookmarkedEmployees(bookmarkedEmps);
  }, [employees, bookmarks]);

  const handleRemoveAll = () => {
    bookmarks.forEach(id => removeBookmark(id));
  };

  const handlePromoteAll = () => {
    // This would typically trigger a promotion workflow
    console.log('Promoting all bookmarked employees...');
  };

  const handleAssignProject = () => {
    // This would typically open a project assignment modal
    console.log('Assigning project to bookmarked employees...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
                <Bookmark className="h-8 w-8 text-yellow-500" />
                <span>Bookmarked Employees</span>
              </h1>
              <p className="text-gray-600">Manage your saved team members</p>
            </div>
            {bookmarkedEmployees.length > 0 && (
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleAssignProject}>
                  <Briefcase className="h-4 w-4 mr-2" />
                  Assign Project
                </Button>
                <Button onClick={handlePromoteAll} className="bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Promote All
                </Button>
                <Button variant="destructive" onClick={handleRemoveAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {bookmarkedEmployees.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Bookmarked
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{bookmarkedEmployees.length}</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Average Rating
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {bookmarkedEmployees.length > 0 
                    ? (bookmarkedEmployees.reduce((sum, emp) => sum + emp.rating, 0) / bookmarkedEmployees.length).toFixed(1)
                    : '0'
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Departments
                </CardTitle>
                <Briefcase className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(bookmarkedEmployees.map(emp => emp.department)).size}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookmarked Employees Grid */}
        {bookmarkedEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bookmark className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No bookmarked employees</h3>
            <p className="text-gray-500 mb-6">Start bookmarking employees from the dashboard to see them here</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/">Go to Dashboard</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
