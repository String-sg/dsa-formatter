import { Student } from '../types/Student';

export function generateHTMLReport(student: Student): string {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  const getGradeColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Report - ${student.name}</title>
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
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            text-align: center;
            padding: 30px 0;
            border-bottom: 3px solid #3b82f6;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #1e40af;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2em;
            color: #6b7280;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 1.5em;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 0.9em;
            margin-bottom: 5px;
        }
        
        .info-value {
            color: #1f2937;
            font-size: 1.1em;
        }
        
        .talent-card {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
        }
        
        .talent-card h3 {
            font-size: 1.2em;
            margin-bottom: 5px;
        }
        
        .academic-section {
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            border: 1px solid #e2e8f0;
        }
        
        .academic-title {
            font-size: 1.3em;
            color: #1e40af;
            margin-bottom: 20px;
        }
        
        .overall-score {
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 1.2em;
            font-weight: bold;
            color: white;
        }
        
        .subjects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .subject-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .subject-label {
            font-size: 0.9em;
            color: #6b7280;
            margin-bottom: 5px;
        }
        
        .subject-score {
            font-size: 1.4em;
            font-weight: bold;
            color: #1f2937;
        }
        
        .activity-card {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
        }
        
        .activity-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
        }
        
        .award-card {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
        }
        
        .napfa-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
        }
        
        .napfa-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .contact-card {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            padding: 20px;
            border-radius: 12px;
        }
        
        .contact-title {
            font-size: 1.1em;
            color: #0c4a6e;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .recommendation {
            background: #fef7cd;
            border: 1px solid #f59e0b;
            padding: 20px;
            border-radius: 12px;
            font-style: italic;
        }
        
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${student.name}</h1>
            <p>Student Profile Report</p>
            <p style="font-size: 0.9em; color: #9ca3af;">Generated on ${new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div class="section">
            <h2 class="section-title">Basic Information</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">NRIC/ID</div>
                    <div class="info-value">${student.id}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Primary School</div>
                    <div class="info-value">${student.primarySchool}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Date of Birth</div>
                    <div class="info-value">${formatDate(student.dateOfBirth)}</div>
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
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">DSA Talents</h2>
            <div class="talent-card">
                <h3>Primary Talent</h3>
                <p>${student.talent1}</p>
            </div>
            ${student.talent2 ? `
            <div class="talent-card" style="background: linear-gradient(135deg, #10b981, #059669);">
                <h3>Secondary Talent</h3>
                <p>${student.talent2}</p>
            </div>
            ` : ''}
        </div>

        <div class="section">
            <h2 class="section-title">Academic Performance</h2>
            
            <div class="academic-section">
                <h3 class="academic-title">Primary 6 (2025)</h3>
                <div class="overall-score" style="background-color: ${getGradeColor(student.academics.p6.overallPercentage)};">
                    Overall Score: ${student.academics.p6.overallPercentage}%
                </div>
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
                <h3 class="academic-title">Primary 5 (2024)</h3>
                <div class="overall-score" style="background-color: ${getGradeColor(student.academics.p5.overallPercentage)};">
                    Overall Score: ${student.academics.p5.overallPercentage}%
                </div>
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
            <h2 class="section-title">Co-Curricular Activities (CCA)</h2>
            ${student.ccaActivities.map(cca => `
            <div class="activity-card">
                <div class="activity-grid">
                    <div><strong>Year:</strong> ${cca.year}</div>
                    <div><strong>Activity:</strong> ${cca.name}</div>
                    <div><strong>Event:</strong> ${cca.event}</div>
                    <div><strong>Involvement:</strong> ${cca.involvement}</div>
                </div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${student.viaActivities.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Values in Action (VIA)</h2>
            ${student.viaActivities.map(via => `
            <div class="activity-card" style="background: #fef3e2; border-color: #f97316;">
                <div class="activity-grid">
                    <div><strong>Year:</strong> ${via.year}</div>
                    <div><strong>Activity:</strong> ${via.name}</div>
                    <div><strong>Partner:</strong> ${via.partner}</div>
                </div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${student.awards.length > 0 ? `
        <div class="section">
            <h2 class="section-title">School-Based Awards</h2>
            ${student.awards.map(award => `
            <div class="award-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${award.name}</strong>
                    <span style="background: rgba(255,255,255,0.3); padding: 5px 10px; border-radius: 15px;">${award.year}</span>
                </div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${student.napfa.year ? `
        <div class="section">
            <h2 class="section-title">NAPFA Results (${student.napfa.year})</h2>
            <div class="info-grid" style="margin-bottom: 20px;">
                <div class="info-item">
                    <div class="info-label">Height</div>
                    <div class="info-value">${student.napfa.height} cm</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Weight</div>
                    <div class="info-value">${student.napfa.weight} kg</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Award</div>
                    <div class="info-value" style="color: #3b82f6; font-weight: bold;">${student.napfa.award}</div>
                </div>
            </div>
            <div class="napfa-grid">
                <div class="napfa-item">
                    <div class="subject-label">Sit-up</div>
                    <div class="subject-score">${student.napfa.sitUp.score}</div>
                    <div style="color: #3b82f6; font-size: 0.9em;">Band ${student.napfa.sitUp.band}</div>
                </div>
                <div class="napfa-item">
                    <div class="subject-label">Standing Broad Jump</div>
                    <div class="subject-score">${student.napfa.standingBroadJump.score}</div>
                    <div style="color: #3b82f6; font-size: 0.9em;">Band ${student.napfa.standingBroadJump.band}</div>
                </div>
                <div class="napfa-item">
                    <div class="subject-label">Sit & Reach</div>
                    <div class="subject-score">${student.napfa.sitAndReach.score}</div>
                    <div style="color: #3b82f6; font-size: 0.9em;">Band ${student.napfa.sitAndReach.band}</div>
                </div>
                <div class="napfa-item">
                    <div class="subject-label">Pull-up</div>
                    <div class="subject-score">${student.napfa.pullUp.score}</div>
                    <div style="color: #3b82f6; font-size: 0.9em;">Band ${student.napfa.pullUp.band}</div>
                </div>
                <div class="napfa-item">
                    <div class="subject-label">Shuttle Run</div>
                    <div class="subject-score">${student.napfa.shuttleRun.score}</div>
                    <div style="color: #3b82f6; font-size: 0.9em;">Band ${student.napfa.shuttleRun.band}</div>
                </div>
                <div class="napfa-item">
                    <div class="subject-label">1.6/2.4km Run</div>
                    <div class="subject-score">${student.napfa.run.score}</div>
                    <div style="color: #3b82f6; font-size: 0.9em;">Band ${student.napfa.run.band}</div>
                </div>
            </div>
        </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">Contact Information</h2>
            <div class="contact-grid">
                <div class="contact-card">
                    <h3 class="contact-title">Main Contact</h3>
                    <p><strong>Name:</strong> ${student.mainContact.name}</p>
                    <p><strong>Mobile:</strong> ${student.mainContact.mobile}</p>
                    <p><strong>Email:</strong> ${student.mainContact.email}</p>
                </div>
                <div class="contact-card">
                    <h3 class="contact-title">Alternate Contact</h3>
                    <p><strong>Name:</strong> ${student.alternateContact.name}</p>
                    <p><strong>Mobile:</strong> ${student.alternateContact.mobile}</p>
                    <p><strong>Email:</strong> ${student.alternateContact.email}</p>
                </div>
                <div class="contact-card">
                    <h3 class="contact-title">Father</h3>
                    <p><strong>Name:</strong> ${student.parents.father.name}</p>
                    <p><strong>Contact:</strong> ${student.parents.father.contact}</p>
                </div>
                <div class="contact-card">
                    <h3 class="contact-title">Mother</h3>
                    <p><strong>Name:</strong> ${student.parents.mother.name}</p>
                    <p><strong>Contact:</strong> ${student.parents.mother.contact}</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Languages</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">First Language</div>
                    <div class="info-value">${student.languages.first}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Second Language</div>
                    <div class="info-value">${student.languages.second}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Approved Mother Tongue</div>
                    <div class="info-value">${student.languages.approvedMT}</div>
                </div>
            </div>
        </div>

        ${student.recommendationReason ? `
        <div class="section">
            <h2 class="section-title">School's Recommendation</h2>
            <div class="recommendation">
                <p>${student.recommendationReason}</p>
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>
  `;
}

export function downloadHTML(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generatePDF(student: Student) {
  const htmlContent = generateHTMLReport(student);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  }
}