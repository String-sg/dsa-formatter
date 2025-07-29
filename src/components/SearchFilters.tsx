import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Student } from '../types/Student';

interface SearchFiltersProps {
  students: Student[];
  filteredStudents: Student[];
  onFilteredStudentsChange: (filtered: Student[]) => void;
  isDarkMode?: boolean;
}

export function SearchFilters({ students, filteredStudents, onFilteredStudentsChange, isDarkMode = false }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedCCA, setSelectedCCA] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique schools and CCAs for filter options
  const uniqueSchools = Array.from(new Set(students.map(s => s.primarySchool))).filter(Boolean).sort();
  const uniqueCCAs = Array.from(new Set(
    students.flatMap(s => s.ccaActivities.map(cca => cca.name))
  )).filter(Boolean).sort();

  // Filter students based on search and filter criteria
  useEffect(() => {
    let filtered = students;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply school filter
    if (selectedSchool) {
      filtered = filtered.filter(student => student.primarySchool === selectedSchool);
    }

    // Apply CCA filter
    if (selectedCCA) {
      filtered = filtered.filter(student =>
        student.ccaActivities.some(cca => cca.name === selectedCCA)
      );
    }

    onFilteredStudentsChange(filtered);
  }, [searchTerm, selectedSchool, selectedCCA, students, onFilteredStudentsChange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSchool('');
    setSelectedCCA('');
  };

  const hasActiveFilters = searchTerm || selectedSchool || selectedCCA;

  return (
    <div className="flex items-center space-x-4">
      {/* Search Input */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64 font-body ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors duration-200 font-body ${
          showFilters || hasActiveFilters
            ? 'border-primary bg-primary/20 text-primary' 
            : isDarkMode
              ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 bg-white text-black hover:bg-gray-50'
        }`}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {hasActiveFilters && (
          <span className="ml-2 bg-primary text-black text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {[searchTerm, selectedSchool, selectedCCA].filter(Boolean).length}
          </span>
        )}
      </button>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className={`inline-flex items-center px-3 py-2 transition-colors duration-200 font-body ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </button>
      )}

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="flex items-center space-x-3">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-body ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="">All Schools</option>
            {uniqueSchools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>

          <select
            value={selectedCCA}
            onChange={(e) => setSelectedCCA(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-body ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="">All CCAs</option>
            {uniqueCCAs.map(cca => (
              <option key={cca} value={cca}>{cca}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}