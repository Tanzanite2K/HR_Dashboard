
import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('hr-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const addBookmark = (employeeId: number) => {
    const newBookmarks = [...bookmarks, employeeId];
    setBookmarks(newBookmarks);
    localStorage.setItem('hr-bookmarks', JSON.stringify(newBookmarks));
  };

  const removeBookmark = (employeeId: number) => {
    const newBookmarks = bookmarks.filter(id => id !== employeeId);
    setBookmarks(newBookmarks);
    localStorage.setItem('hr-bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = (employeeId: number) => {
    return bookmarks.includes(employeeId);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
};
