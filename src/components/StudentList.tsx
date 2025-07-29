import React from 'react';
import { Student } from '../types/Student';
import { User, School, Award } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student) => void;
  isDarkMode?: boolean;
}

export function StudentList({ students, selectedStudent, onSelectStudent, isDarkMode = false }: StudentListProps) {
  if (students.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'} rounded-lg shadow-lg`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center font-title`}>
          <User className="w-5 h-5 mr-2 text-primary" />
          Students ({students.length})
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 font-body`}>
          Select a student to generate their report
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {students.map((student) => (
          <button
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className={`w-full p-4 text-left border-b transition-colors duration-150 ${
              isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
            } ${
              selectedStudent?.id === student.id 
                ? 'bg-primary/20 border-primary' 
                : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate font-title`}>
                  {student.name}
                </h3>
                <div className={`flex items-center mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-body`}>
                  <School className="w-3 h-3 mr-1" />
                  <span className="truncate">{student.primarySchool}</span>
                </div>
                <div className={`flex items-center mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>
                  <Award className="w-3 h-3 mr-1" />
                  <span className="truncate">{student.talent1}</span>
                  {student.talent2 && (
                    <span className="ml-1 truncate">, {student.talent2}</span>
                  )}
                </div>
              </div>
              {selectedStudent?.id === student.id && (
                <div className="ml-2 w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}