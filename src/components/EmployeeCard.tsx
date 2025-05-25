
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Bookmark, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Employee } from '@/hooks/useEmployees';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmark = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'Sales': 'bg-green-100 text-green-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Operations': 'bg-gray-100 text-gray-800',
      'Design': 'bg-indigo-100 text-indigo-800',
      'Customer Support': 'bg-red-100 text-red-800',
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm ${
        isHovered ? 'shadow-xl' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {employee.firstName} {employee.lastName}
              </h3>
              <Badge variant="secondary" className={`text-xs ${getDepartmentColor(employee.department)}`}>
                {employee.department}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`h-8 w-8 p-0 ${
              isBookmarked(employee.id) ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked(employee.id) ? 'fill-yellow-500' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-1">
            {renderStars(employee.rating)}
            <span className="text-sm text-gray-600 ml-2">{employee.rating}/5</span>
          </div>

          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span className="truncate">{employee.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>Age {employee.age}</span>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Link to={`/employee/${employee.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </Link>
            <Button variant="default" size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              Promote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
