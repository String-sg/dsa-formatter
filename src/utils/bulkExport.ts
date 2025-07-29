import { Student } from '../types/Student';
import { generateHTMLReport } from './reportGenerator';
import * as XLSX from 'xlsx';

export function generateBulkExcel(students: Student[]): void {
  const workbook = XLSX.utils.book_new();
  
  // Create summary sheet
  const summaryData = students.map(student => ({
    'NRIC/ID': student.id,
    'Name': student.name,
    'Primary School': student.primarySchool,
    'Primary Talent': student.talent1,
    'Secondary Talent': student.talent2 || '',
    'Citizenship': student.citizenship,
    'Date of Birth': student.dateOfBirth,
    'Gender': student.sex,
    'GEP Status': student.gepStatus || 'No',
    'P6 Overall %': student.academics.p6.overallPercentage,
    'P5 Overall %': student.academics.p5.overallPercentage,
    'Main Contact': student.mainContact.name,
    'Main Contact Mobile': student.mainContact.mobile,
    'Main Contact Email': student.mainContact.email,
    'Address': student.address,
    'Postal Code': student.postalCode,
    'NAPFA Award': student.napfa.award || '',
    'Recommendation': student.recommendationReason || ''
  }));
  
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Student Summary');
  
  // Create detailed academic sheet
  const academicData = students.map(student => ({
    'NRIC/ID': student.id,
    'Name': student.name,
    'P6 Overall %': student.academics.p6.overallPercentage,
    'P6 English': student.academics.p6.subjects.english.score,
    'P6 Mathematics': student.academics.p6.subjects.maths.score,
    'P6 Science': student.academics.p6.subjects.science.score,
    'P6 Mother Tongue': student.academics.p6.subjects.motherTongue.score,
    'P6 Conduct': student.academics.p6.conduct,
    'P6 Teacher Remarks': student.academics.p6.teacherRemarks,
    'P5 Overall %': student.academics.p5.overallPercentage,
    'P5 English': student.academics.p5.subjects.english.score,
    'P5 Mathematics': student.academics.p5.subjects.maths.score,
    'P5 Science': student.academics.p5.subjects.science.score,
    'P5 Mother Tongue': student.academics.p5.subjects.motherTongue.score,
    'P5 Conduct': student.academics.p5.conduct,
    'P5 Teacher Remarks': student.academics.p5.teacherRemarks
  }));
  
  const academicSheet = XLSX.utils.json_to_sheet(academicData);
  XLSX.utils.book_append_sheet(workbook, academicSheet, 'Academic Records');
  
  // Create CCA activities sheet
  const ccaData: any[] = [];
  students.forEach(student => {
    student.ccaActivities.forEach(cca => {
      ccaData.push({
        'NRIC/ID': student.id,
        'Name': student.name,
        'Year': cca.year,
        'CCA Name': cca.name,
        'Event': cca.event,
        'Involvement': cca.involvement
      });
    });
  });
  
  if (ccaData.length > 0) {
    const ccaSheet = XLSX.utils.json_to_sheet(ccaData);
    XLSX.utils.book_append_sheet(workbook, ccaSheet, 'CCA Activities');
  }
  
  // Create VIA activities sheet
  const viaData: any[] = [];
  students.forEach(student => {
    student.viaActivities.forEach(via => {
      viaData.push({
        'NRIC/ID': student.id,
        'Name': student.name,
        'Year': via.year,
        'VIA Activity': via.name,
        'Partner': via.partner
      });
    });
  });
  
  if (viaData.length > 0) {
    const viaSheet = XLSX.utils.json_to_sheet(viaData);
    XLSX.utils.book_append_sheet(workbook, viaSheet, 'VIA Activities');
  }
  
  // Create awards sheet
  const awardsData: any[] = [];
  students.forEach(student => {
    student.awards.forEach(award => {
      awardsData.push({
        'NRIC/ID': student.id,
        'Name': student.name,
        'Year': award.year,
        'Award': award.name
      });
    });
    
    student.nonSchoolAwards.forEach(award => {
      awardsData.push({
        'NRIC/ID': student.id,
        'Name': student.name,
        'Year': 'N/A',
        'Award': award
      });
    });
  });
  
  if (awardsData.length > 0) {
    const awardsSheet = XLSX.utils.json_to_sheet(awardsData);
    XLSX.utils.book_append_sheet(workbook, awardsSheet, 'Awards');
  }
  
  // Create NAPFA sheet
  const napfaData = students.map(student => ({
    'NRIC/ID': student.id,
    'Name': student.name,
    'Year': student.napfa.year,
    'Height (cm)': student.napfa.height,
    'Weight (kg)': student.napfa.weight,
    'Sit-up Score': student.napfa.sitUp.score,
    'Sit-up Band': student.napfa.sitUp.band,
    'Standing Broad Jump Score': student.napfa.standingBroadJump.score,
    'Standing Broad Jump Band': student.napfa.standingBroadJump.band,
    'Sit & Reach Score': student.napfa.sitAndReach.score,
    'Sit & Reach Band': student.napfa.sitAndReach.band,
    'Pull-up Score': student.napfa.pullUp.score,
    'Pull-up Band': student.napfa.pullUp.band,
    'Shuttle Run Score': student.napfa.shuttleRun.score,
    'Shuttle Run Band': student.napfa.shuttleRun.band,
    'Run Score': student.napfa.run.score,
    'Run Band': student.napfa.run.band,
    'Award': student.napfa.award
  }));
  
  const napfaSheet = XLSX.utils.json_to_sheet(napfaData);
  XLSX.utils.book_append_sheet(workbook, napfaSheet, 'NAPFA Results');
  
  // Download the file
  const fileName = `Student_Reports_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

export function generateBulkHTML(students: Student[]): void {
  const consolidatedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consolidated Student Reports</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            padding: 30px 0;
            border-bottom: 3px solid #3b82f6;
            margin-bottom: 40px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #1e40af;
            margin-bottom: 10px;
        }
        
        .student-report {
            background: white;
            margin-bottom: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            page-break-after: always;
        }
        
        .student-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 20px;
            border-radius: 12px 12px 0 0;
        }
        
        .student-header h2 {
            font-size: 1.8em;
            margin-bottom: 5px;
        }
        
        .student-content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 1.3em;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .info-item {
            background: #f9fafb;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 0.85em;
            margin-bottom: 3px;
        }
        
        .info-value {
            color: #1f2937;
        }
        
        .academic-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #e2e8f0;
        }
        
        .subjects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .subject-card {
            background: white;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .subject-label {
            font-size: 0.8em;
            color: #6b7280;
            margin-bottom: 3px;
        }
        
        .subject-score {
            font-size: 1.2em;
            font-weight: bold;
            color: #1f2937;
        }
        
        @media print {
            body { background: white; }
            .student-report { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Consolidated Student Reports</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-GB')}</p>
            <p style="font-size: 0.9em; color: #6b7280; margin-top: 10px;">${students.length} Students</p>
        </div>

        ${students.map(student => `
        <div class="student-report">
            <div class="student-header">
                <h2>${student.name}</h2>
                <p>${student.primarySchool} • ${student.talent1}${student.talent2 ? ` • ${student.talent2}` : ''}</p>
            </div>
            
            <div class="student-content">
                <div class="section">
                    <h3 class="section-title">Basic Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">NRIC/ID</div>
                            <div class="info-value">${student.id}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Date of Birth</div>
                            <div class="info-value">${student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 'N/A'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Gender</div>
                            <div class="info-value">${student.sex}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Citizenship</div>
                            <div class="info-value">${student.citizenship}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">GEP Status</div>
                            <div class="info-value">${student.gepStatus || 'No'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Main Contact</div>
                            <div class="info-value">${student.mainContact.name} (${student.mainContact.mobile})</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h3 class="section-title">Academic Performance</h3>
                    
                    <div class="academic-section">
                        <h4 style="color: #1e40af; margin-bottom: 15px;">Primary 6 (2025) - Overall: ${student.academics.p6.overallPercentage}%</h4>
                        <div class="subjects-grid">
                            <div class="subject-card">
                                <div class="subject-label">English</div>
                                <div class="subject-score">${student.academics.p6.subjects.english.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Mathematics</div>
                                <div class="subject-score">${student.academics.p6.subjects.maths.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Science</div>
                                <div class="subject-score">${student.academics.p6.subjects.science.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Mother Tongue</div>
                                <div class="subject-score">${student.academics.p6.subjects.motherTongue.score}</div>
                            </div>
                        </div>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Conduct</div>
                                <div class="info-value">${student.academics.p6.conduct}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Teacher's Remarks</div>
                                <div class="info-value">${student.academics.p6.teacherRemarks}</div>
                            </div>
                        </div>
                    </div>

                    <div class="academic-section">
                        <h4 style="color: #1e40af; margin-bottom: 15px;">Primary 5 (2024) - Overall: ${student.academics.p5.overallPercentage}%</h4>
                        <div class="subjects-grid">
                            <div class="subject-card">
                                <div class="subject-label">English</div>
                                <div class="subject-score">${student.academics.p5.subjects.english.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Mathematics</div>
                                <div class="subject-score">${student.academics.p5.subjects.maths.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Science</div>
                                <div class="subject-score">${student.academics.p5.subjects.science.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Mother Tongue</div>
                                <div class="subject-score">${student.academics.p5.subjects.motherTongue.score}</div>
                            </div>
                        </div>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Conduct</div>
                                <div class="info-value">${student.academics.p5.conduct}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Teacher's Remarks</div>
                                <div class="info-value">${student.academics.p5.teacherRemarks}</div>
                            </div>
                        </div>
                    </div>
                </div>

                ${student.ccaActivities.length > 0 ? `
                <div class="section">
                    <h3 class="section-title">Co-Curricular Activities</h3>
                    ${student.ccaActivities.map(cca => `
                    <div class="info-item" style="margin-bottom: 10px;">
                        <strong>${cca.name}</strong> (${cca.year}) - ${cca.event} - ${cca.involvement}
                    </div>
                    `).join('')}
                </div>
                ` : ''}

                ${student.awards.length > 0 ? `
                <div class="section">
                    <h3 class="section-title">Awards</h3>
                    ${student.awards.map(award => `
                    <div class="info-item" style="margin-bottom: 8px;">
                        <strong>${award.name}</strong> (${award.year})
                    </div>
                    `).join('')}
                </div>
                ` : ''}

                ${student.napfa.year ? `
                <div class="section">
                    <h3 class="section-title">NAPFA Results (${student.napfa.year})</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Award</div>
                            <div class="info-value" style="font-weight: bold; color: #3b82f6;">${student.napfa.award}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Height/Weight</div>
                            <div class="info-value">${student.napfa.height}cm / ${student.napfa.weight}kg</div>
                        </div>
                    </div>
                </div>
                ` : ''}

                ${student.recommendationReason ? `
                <div class="section">
                    <h3 class="section-title">School's Recommendation</h3>
                    <div style="background: #fef7cd; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; font-style: italic;">
                        ${student.recommendationReason}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        `).join('')}
    </div>
</body>
</html>
  `;
  
  const blob = new Blob([consolidatedHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Consolidated_Student_Reports_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateBulkPDF(students: Student[]): void {
  const consolidatedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consolidated Student Reports</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.4;
            color: #333;
            background: white;
            font-size: 12px;
        }
        
        .container {
            max-width: 100%;
            margin: 0;
            padding: 15px;
        }
        
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #3b82f6;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 1.8em;
            color: #1e40af;
            margin-bottom: 8px;
        }
        
        .student-report {
            margin-bottom: 30px;
            page-break-after: always;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .student-header {
            background: #3b82f6;
            color: white;
            padding: 15px;
        }
        
        .student-header h2 {
            font-size: 1.3em;
            margin-bottom: 3px;
        }
        
        .student-content {
            padding: 20px;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 1.1em;
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .info-item {
            background: #f9fafb;
            padding: 8px;
            border-radius: 4px;
            border-left: 2px solid #3b82f6;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 0.8em;
            margin-bottom: 2px;
        }
        
        .info-value {
            color: #1f2937;
            font-size: 0.9em;
        }
        
        .academic-section {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
        }
        
        .subjects-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 10px;
        }
        
        .subject-card {
            background: white;
            padding: 8px;
            border-radius: 4px;
            text-align: center;
            border: 1px solid #e5e7eb;
        }
        
        .subject-label {
            font-size: 0.7em;
            color: #6b7280;
            margin-bottom: 2px;
        }
        
        .subject-score {
            font-size: 1em;
            font-weight: bold;
            color: #1f2937;
        }
        
        @media print {
            .student-report {
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Consolidated Student Reports</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-GB')}</p>
            <p style="font-size: 0.9em; color: #6b7280; margin-top: 5px;">${students.length} Students</p>
        </div>

        ${students.map(student => `
        <div class="student-report">
            <div class="student-header">
                <h2>${student.name}</h2>
                <p>${student.primarySchool} • ${student.talent1}${student.talent2 ? ` • ${student.talent2}` : ''}</p>
            </div>
            
            <div class="student-content">
                <div class="section">
                    <h3 class="section-title">Basic Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">NRIC/ID</div>
                            <div class="info-value">${student.id}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Date of Birth</div>
                            <div class="info-value">${student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 'N/A'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Gender</div>
                            <div class="info-value">${student.sex}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">GEP Status</div>
                            <div class="info-value">${student.gepStatus || 'No'}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h3 class="section-title">Academic Performance</h3>
                    
                    <div class="academic-section">
                        <h4 style="color: #1e40af; margin-bottom: 10px; font-size: 0.95em;">P6 (2025) - Overall: ${student.academics.p6.overallPercentage}%</h4>
                        <div class="subjects-grid">
                            <div class="subject-card">
                                <div class="subject-label">English</div>
                                <div class="subject-score">${student.academics.p6.subjects.english.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Math</div>
                                <div class="subject-score">${student.academics.p6.subjects.maths.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Science</div>
                                <div class="subject-score">${student.academics.p6.subjects.science.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">MT</div>
                                <div class="subject-score">${student.academics.p6.subjects.motherTongue.score}</div>
                            </div>
                        </div>
                        <div style="font-size: 0.8em; color: #6b7280;">
                            <strong>Conduct:</strong> ${student.academics.p6.conduct} | 
                            <strong>Remarks:</strong> ${student.academics.p6.teacherRemarks}
                        </div>
                    </div>

                    <div class="academic-section">
                        <h4 style="color: #1e40af; margin-bottom: 10px; font-size: 0.95em;">P5 (2024) - Overall: ${student.academics.p5.overallPercentage}%</h4>
                        <div class="subjects-grid">
                            <div class="subject-card">
                                <div class="subject-label">English</div>
                                <div class="subject-score">${student.academics.p5.subjects.english.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Math</div>
                                <div class="subject-score">${student.academics.p5.subjects.maths.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">Science</div>
                                <div class="subject-score">${student.academics.p5.subjects.science.score}</div>
                            </div>
                            <div class="subject-card">
                                <div class="subject-label">MT</div>
                                <div class="subject-score">${student.academics.p5.subjects.motherTongue.score}</div>
                            </div>
                        </div>
                        <div style="font-size: 0.8em; color: #6b7280;">
                            <strong>Conduct:</strong> ${student.academics.p5.conduct} | 
                            <strong>Remarks:</strong> ${student.academics.p5.teacherRemarks}
                        </div>
                    </div>
                </div>

                ${student.ccaActivities.length > 0 ? `
                <div class="section">
                    <h3 class="section-title">CCA Activities</h3>
                    <div style="font-size: 0.85em;">
                        ${student.ccaActivities.map(cca => `
                        <div style="margin-bottom: 5px; padding: 5px; background: #f3f4f6; border-radius: 3px;">
                            <strong>${cca.name}</strong> (${cca.year}) - ${cca.event} - ${cca.involvement}
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${student.awards.length > 0 ? `
                <div class="section">
                    <h3 class="section-title">Awards</h3>
                    <div style="font-size: 0.85em;">
                        ${student.awards.map(award => `
                        <div style="margin-bottom: 3px; padding: 3px; background: #fef3c7; border-radius: 3px;">
                            <strong>${award.name}</strong> (${award.year})
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${student.napfa.year ? `
                <div class="section">
                    <h3 class="section-title">NAPFA (${student.napfa.year})</h3>
                    <div style="font-size: 0.85em;">
                        <strong>Award:</strong> ${student.napfa.award} | 
                        <strong>Height/Weight:</strong> ${student.napfa.height}cm / ${student.napfa.weight}kg
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        `).join('')}
    </div>
</body>
</html>
  `;
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(consolidatedHTML);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  }
}