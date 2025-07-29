import React from 'react';
import { Student } from '../types/Student';
import { Download, FileText, Globe } from 'lucide-react';

interface StudentReportProps {
  student: Student;
  onGeneratePDF: () => void;
  onGenerateHTML: () => void;
  isDarkMode?: boolean;
}

export function StudentReport({ student, onGeneratePDF, onGenerateHTML, isDarkMode = false }: StudentReportProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  const getGradeColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'} rounded-lg shadow-lg`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-title`}>{student.name}</h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 font-body`}>Student Profile Report</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onGenerateHTML}
              className="inline-flex items-center px-4 py-2 bg-secondary text-black font-medium rounded-lg hover:bg-secondary/80 transition-colors duration-200 font-body"
            >
              <Globe className="w-4 h-4 mr-2" />
              HTML
            </button>
            <button
              onClick={onGeneratePDF}
              className="inline-flex items-center px-4 py-2 bg-primary text-black font-medium rounded-lg hover:bg-primary/80 transition-colors duration-200 font-body"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Basic Information */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>NRIC/ID</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.id}</p>
              </div>
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Primary School</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.primarySchool}</p>
              </div>
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Date of Birth</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{formatDate(student.dateOfBirth)}</p>
              </div>
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Gender</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.sex}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Citizenship</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.citizenship}</p>
              </div>
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>GEP Status</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.gepStatus || 'No'}</p>
              </div>
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Address</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.address}</p>
              </div>
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Postal Code</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.postalCode}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Talents */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
            DSA Talents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/20 rounded-lg">
              <label className="text-sm font-medium text-primary font-body">Primary Talent</label>
              <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold font-body`}>{student.talent1}</p>
            </div>
            {student.talent2 && (
              <div className="p-4 bg-secondary/20 rounded-lg">
                <label className="text-sm font-medium text-secondary font-body">Secondary Talent</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold font-body`}>{student.talent2}</p>
              </div>
            )}
          </div>
        </section>

        {/* Academic Performance */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
            Academic Performance
          </h2>
          
          {/* P6 Results */}
          <div className="mb-6">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 font-title`}>Primary 6 (2025)</h3>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(student.academics.p6.overallPercentage)}`}>
                    Overall: {student.academics.p6.overallPercentage}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>English</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p6.subjects.english.score}</p>
                </div>
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Mathematics</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p6.subjects.maths.score}</p>
                </div>
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Science</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p6.subjects.science.score}</p>
                </div>
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Mother Tongue</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p6.subjects.motherTongue.score}</p>
                </div>
              </div>
              <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Conduct</label>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p6.conduct}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Teacher's Remarks</label>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p6.teacherRemarks}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* P5 Results */}
          <div className="mb-6">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 font-title`}>Primary 5 (2024)</h3>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(student.academics.p5.overallPercentage)}`}>
                    Overall: {student.academics.p5.overallPercentage}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>English</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p5.subjects.english.score}</p>
                </div>
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Mathematics</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p5.subjects.maths.score}</p>
                </div>
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Science</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p5.subjects.science.score}</p>
                </div>
                <div className="text-center">
                  <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Mother Tongue</label>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p5.subjects.motherTongue.score}</p>
                </div>
              </div>
              <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Conduct</label>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p5.conduct}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-body`}>Teacher's Remarks</label>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-body`}>{student.academics.p5.teacherRemarks}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CCA Activities */}
        {student.ccaActivities.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
              Co-Curricular Activities (CCA)
            </h2>
            <div className="space-y-3">
              {student.ccaActivities.map((cca, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-purple-600 font-medium">Year</label>
                      <p className="text-purple-900">{cca.year}</p>
                    </div>
                    <div>
                      <label className="text-xs text-purple-600 font-medium">Activity</label>
                      <p className="text-purple-900 font-semibold">{cca.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-purple-600 font-medium">Event</label>
                      <p className="text-purple-900">{cca.event}</p>
                    </div>
                    <div>
                      <label className="text-xs text-purple-600 font-medium">Involvement</label>
                      <p className="text-purple-900">{cca.involvement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIA Activities */}
        {student.viaActivities.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
              Values in Action (VIA)
            </h2>
            <div className="space-y-3">
              {student.viaActivities.map((via, index) => (
                <div key={index} className="p-4 bg-orange-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-orange-600 font-medium">Year</label>
                      <p className="text-orange-900">{via.year}</p>
                    </div>
                    <div>
                      <label className="text-xs text-orange-600 font-medium">Activity</label>
                      <p className="text-orange-900 font-semibold">{via.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-orange-600 font-medium">Partner</label>
                      <p className="text-orange-900">{via.partner}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {student.awards.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
              School-Based Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {student.awards.map((award, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-center">
                    <p className="text-yellow-900 font-semibold">{award.name}</p>
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                      {award.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NAPFA Results */}
        {student.napfa.year && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
              NAPFA Results ({student.napfa.year})
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <label className="text-xs text-gray-500">Height</label>
                  <p className="font-semibold">{student.napfa.height} cm</p>
                </div>
                <div className="text-center">
                  <label className="text-xs text-gray-500">Weight</label>
                  <p className="font-semibold">{student.napfa.weight} kg</p>
                </div>
                <div className="text-center">
                  <label className="text-xs text-gray-500">Award</label>
                  <p className="font-semibold text-blue-600">{student.napfa.award}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-2 bg-white rounded">
                  <label className="text-xs text-gray-500">Sit-up</label>
                  <p className="font-semibold">{student.napfa.sitUp.score}</p>
                  <span className="text-xs text-blue-600">Band {student.napfa.sitUp.band}</span>
                </div>
                <div className="text-center p-2 bg-white rounded">
                  <label className="text-xs text-gray-500">Standing Broad Jump</label>
                  <p className="font-semibold">{student.napfa.standingBroadJump.score}</p>
                  <span className="text-xs text-blue-600">Band {student.napfa.standingBroadJump.band}</span>
                </div>
                <div className="text-center p-2 bg-white rounded">
                  <label className="text-xs text-gray-500">Sit & Reach</label>
                  <p className="font-semibold">{student.napfa.sitAndReach.score}</p>
                  <span className="text-xs text-blue-600">Band {student.napfa.sitAndReach.band}</span>
                </div>
                <div className="text-center p-2 bg-white rounded">
                  <label className="text-xs text-gray-500">Pull-up</label>
                  <p className="font-semibold">{student.napfa.pullUp.score}</p>
                  <span className="text-xs text-blue-600">Band {student.napfa.pullUp.band}</span>
                </div>
                <div className="text-center p-2 bg-white rounded">
                  <label className="text-xs text-gray-500">Shuttle Run</label>
                  <p className="font-semibold">{student.napfa.shuttleRun.score}</p>
                  <span className="text-xs text-blue-600">Band {student.napfa.shuttleRun.band}</span>
                </div>
                <div className="text-center p-2 bg-white rounded">
                  <label className="text-xs text-gray-500">1.6/2.4km Run</label>
                  <p className="font-semibold">{student.napfa.run.score}</p>
                  <span className="text-xs text-blue-600">Band {student.napfa.run.band}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Main Contact</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-blue-700">Name:</span> {student.mainContact.name}</p>
                  <p><span className="text-blue-700">Mobile:</span> {student.mainContact.mobile}</p>
                  <p><span className="text-blue-700">Email:</span> {student.mainContact.email}</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Father</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-green-700">Name:</span> {student.parents.father.name}</p>
                  <p><span className="text-green-700">Contact:</span> {student.parents.father.contact}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Alternate Contact</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-purple-700">Name:</span> {student.alternateContact.name}</p>
                  <p><span className="text-purple-700">Mobile:</span> {student.alternateContact.mobile}</p>
                  <p><span className="text-purple-700">Email:</span> {student.alternateContact.email}</p>
                </div>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-medium text-pink-900 mb-2">Mother</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-pink-700">Name:</span> {student.parents.mother.name}</p>
                  <p><span className="text-pink-700">Contact:</span> {student.parents.mother.contact}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
            Languages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <label className="text-sm font-medium text-indigo-700">First Language</label>
              <p className="text-indigo-900 font-semibold">{student.languages.first}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <label className="text-sm font-medium text-indigo-700">Second Language</label>
              <p className="text-indigo-900 font-semibold">{student.languages.second}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <label className="text-sm font-medium text-indigo-700">Approved Mother Tongue</label>
              <p className="text-indigo-900 font-semibold">{student.languages.approvedMT}</p>
            </div>
          </div>
        </section>

        {/* Recommendation */}
        {student.recommendationReason && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} font-title`}>
              School's Recommendation
            </h2>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-amber-900">{student.recommendationReason}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}