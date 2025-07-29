import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { SearchFilters } from './components/SearchFilters';
import { StudentList } from './components/StudentList';
import { StudentReport } from './components/StudentReport';
import { parseCSV } from './utils/csvParser';
import { generateHTMLReport, downloadHTML, generatePDF } from './utils/reportGenerator';
import { generateBulkExcel, generateBulkHTML, generateBulkPDF } from './utils/bulkExport';
import { Student } from './types/Student';
import { FileSpreadsheet, Users, Download, FileText, Globe, Sun, Moon } from 'lucide-react';

function App() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFileUpload = (content: string, filename: string) => {
    try {
      const parsedStudents = parseCSV(content);
      setAllStudents(parsedStudents);
      setFilteredStudents(parsedStudents);
      setFileName(filename);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the file format.');
    }
  };

  const handleGeneratePDF = () => {
    if (selectedStudent) {
      generatePDF(selectedStudent);
    }
  };

  const handleGenerateHTML = () => {
    if (selectedStudent) {
      const htmlContent = generateHTMLReport(selectedStudent);
      const filename = `${selectedStudent.name.replace(/\s+/g, '_')}_Report.html`;
      downloadHTML(htmlContent, filename);
    }
  };

  const handleBulkExcel = () => {
    if (allStudents.length > 0) {
      generateBulkExcel(allStudents);
    }
  };

  const handleBulkHTML = () => {
    if (allStudents.length > 0) {
      generateBulkHTML(allStudents);
    }
  };

  const handleBulkPDF = () => {
    if (allStudents.length > 0) {
      generateBulkPDF(allStudents);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-background' : 'bg-white'}`}>
      <div className={`${isDarkMode ? 'bg-background border-gray-600' : 'bg-white border-gray-200'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileSpreadsheet className="w-8 h-8 text-primary mr-3" />
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-title`}>DSA Formatter</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-body`}>Transform csv into reports</p>
              </div>
            </div>
            {allStudents.length > 0 && (
              <div className="flex items-center space-x-6">
                <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-body`}>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{allStudents.length} students loaded</span>
                  </div>
                  {fileName && (
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      <span className="truncate max-w-xs">{fileName}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>
                    {filteredStudents.length < allStudents.length
                      ? `Download Filtered (${filteredStudents.length}):`
                      : 'Download All:'
                    }
                  </span>
                  <button
                    onClick={() => generateBulkExcel(filteredStudents)}
                    className="inline-flex items-center px-3 py-1.5 bg-primary text-black text-sm font-medium rounded-md hover:bg-primary/80 transition-colors duration-200 font-body"
                    title={`Download ${filteredStudents.length < allStudents.length ? 'filtered' : 'all'} profiles as Excel`}
                  >
                    <FileSpreadsheet className="w-3 h-3 mr-1" />
                    XLSX
                  </button>
                  <button
                    onClick={() => generateBulkPDF(filteredStudents)}
                    className="inline-flex items-center px-3 py-1.5 bg-primary text-black text-sm font-medium rounded-md hover:bg-primary/80 transition-colors duration-200 font-body"
                    title={`Download ${filteredStudents.length < allStudents.length ? 'filtered' : 'all'} profiles as PDF`}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    PDF
                  </button>
                  <button
                    onClick={() => generateBulkHTML(filteredStudents)}
                    className="inline-flex items-center px-3 py-1.5 bg-primary text-black text-sm font-medium rounded-md hover:bg-primary/80 transition-colors duration-200 font-body"
                    title={`Download ${filteredStudents.length < allStudents.length ? 'filtered' : 'all'} profiles as HTML`}
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    HTML
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {allStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 font-title`}>
                Welcome to DSA Formatter
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto font-body`}>
                Upload your CSV file to generate comprehensive,
                professional reports that are easy to read and share
              </p>
              {/* Font test section */}
              <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Font Test:</p>
                <p className="font-title text-lg mb-1">Space Grotesk (Title Font)</p>
                <p className="font-body text-sm">Montserrat (Body Font)</p>
              </div>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
            <div className="mt-8 text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4 font-body`}>
                Supports DSA (Direct School Admission) student data format
              </p>
              <div className={`flex items-center justify-center space-x-6 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} font-body`}>
                <span>✓ Academic Records</span>
                <span>✓ CCA Activities</span>
                <span>✓ NAPFA Results</span>
                <span>✓ Contact Information</span>
                <span>✓ Awards & Achievements</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <SearchFilters
              students={allStudents}
              filteredStudents={filteredStudents}
              onFilteredStudentsChange={setFilteredStudents}
              isDarkMode={isDarkMode}
            />
            <div className="flex gap-6">
              <StudentList
                students={filteredStudents}
                selectedStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                isDarkMode={isDarkMode}
              />
              {selectedStudent ? (
                <StudentReport
                  student={selectedStudent}
                  onGeneratePDF={handleGeneratePDF}
                  onGenerateHTML={handleGenerateHTML}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'} rounded-lg shadow-lg flex items-center justify-center`}>
                  <div className="text-center">
                    <Users className={`w-16 h-16 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mx-auto mb-4`} />
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 font-title`}>
                      Select a Student
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-body`}>
                      Choose a student from the list to view their detailed report
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
