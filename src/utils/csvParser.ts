import { Student } from '../types/Student';

// Function to mask NRIC/ID
function maskNRIC(nric: string): string {
  if (!nric || nric.trim() === '') return 'N/A';

  // If it's already masked, return as is
  if (nric.includes('*')) return nric;

  // For NRIC format like T1234567X, mask to T****567X
  if (nric.length >= 9) {
    const prefix = nric.substring(0, 1);
    const suffix = nric.substring(nric.length - 4);
    return `${prefix}****${suffix}`;
  }

  // For other formats, mask all but first and last character
  if (nric.length > 2) {
    const first = nric.substring(0, 1);
    const last = nric.substring(nric.length - 1);
    const middle = '*'.repeat(nric.length - 2);
    return `${first}${middle}${last}`;
  }

  // For very short IDs, just return asterisks
  return '*'.repeat(nric.length);
}

export function parseCSV(csvContent: string): Student[] {
  const lines = csvContent.split('\n');

  // Skip header lines (first 3 lines are metadata, 4th is column headers)
  const dataLines = lines.slice(4).filter(line => line.trim() && !line.startsWith('#'));

  return dataLines.map((line, index) => {
    const columns = parseCSVLine(line);

    return {
      id: maskNRIC(columns[0] || `student-${index}`),
      name: columns[1] || 'Unknown',
      primarySchool: columns[2] || '',
      talent1: columns[3] || '',
      talent2: columns[5] || '',
      citizenship: columns[7] || '',
      dateOfBirth: columns[8] || '',
      sex: columns[9] || '',
      gepStatus: columns[10] || '',
      address: columns[11] || '',
      postalCode: columns[12] || '',
      mainContact: {
        name: columns[13] || '',
        mobile: columns[14] || '',
        email: columns[15] || ''
      },
      alternateContact: {
        name: columns[16] || '',
        mobile: columns[17] || '',
        email: columns[18] || ''
      },
      parents: {
        father: {
          name: columns[19] || '',
          contact: columns[20] || ''
        },
        mother: {
          name: columns[21] || '',
          contact: columns[22] || ''
        }
      },
      languages: {
        first: columns[23] || '',
        second: columns[24] || '',
        approvedMT: columns[25] || ''
      },
      academics: {
        p6: {
          year: columns[26] || '',
          level: columns[27] || '',
          overallPercentage: parseFloat(columns[28]) || 0,
          subjects: {
            english: { score: parseFloat(columns[29]) || 0, firstCombined: parseFloat(columns[32]) || 0 },
            maths: { score: parseFloat(columns[33]) || 0, firstCombined: parseFloat(columns[36]) || 0 },
            science: { score: parseFloat(columns[37]) || 0, firstCombined: parseFloat(columns[40]) || 0 },
            motherTongue: { score: parseFloat(columns[41]) || 0, firstCombined: parseFloat(columns[44]) || 0 },
            higherMotherTongue: columns[45] ? { score: parseFloat(columns[45]) || 0, firstCombined: parseFloat(columns[48]) || 0 } : undefined
          },
          conduct: columns[49] || '',
          teacherRemarks: columns[50] || ''
        },
        p5: {
          year: columns[51] || '',
          level: columns[52] || '',
          overallPercentage: parseFloat(columns[53]) || 0,
          subjects: {
            english: { score: parseFloat(columns[54]) || 0, firstCombined: parseFloat(columns[57]) || 0, overall: parseFloat(columns[58]) || 0 },
            maths: { score: parseFloat(columns[59]) || 0, firstCombined: parseFloat(columns[62]) || 0, overall: parseFloat(columns[63]) || 0 },
            science: { score: parseFloat(columns[64]) || 0, firstCombined: parseFloat(columns[67]) || 0, overall: parseFloat(columns[68]) || 0 },
            motherTongue: { score: parseFloat(columns[69]) || 0, firstCombined: parseFloat(columns[72]) || 0, overall: parseFloat(columns[73]) || 0 },
            higherMotherTongue: columns[74] ? { score: parseFloat(columns[74]) || 0, firstCombined: parseFloat(columns[77]) || 0, overall: parseFloat(columns[78]) || 0 } : undefined
          },
          conduct: columns[79] || '',
          teacherRemarks: columns[80] || ''
        }
      },
      ccaActivities: extractCCAActivities(columns.slice(81, 95)),
      viaActivities: extractVIAActivities(columns.slice(95, 110)),
      awards: extractAwards(columns.slice(110, 116)),
      nonSchoolAwards: extractNonSchoolAwards(columns.slice(116, 121)),
      napfa: {
        year: columns[121] || '',
        height: parseFloat(columns[123]) || 0,
        weight: parseFloat(columns[124]) || 0,
        sitUp: { score: parseFloat(columns[125]) || 0, band: columns[126] || '' },
        standingBroadJump: { score: parseFloat(columns[127]) || 0, band: columns[128] || '' },
        sitAndReach: { score: parseFloat(columns[129]) || 0, band: columns[130] || '' },
        pullUp: { score: parseFloat(columns[131]) || 0, band: columns[132] || '' },
        shuttleRun: { score: parseFloat(columns[133]) || 0, band: columns[134] || '' },
        run: { score: parseFloat(columns[135]) || 0, band: columns[136] || '' },
        award: columns[137] || ''
      },
      recommendationReason: columns[139] || ''
    };
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function extractCCAActivities(columns: string[]): any[] {
  const activities = [];
  for (let i = 0; i < columns.length; i += 4) {
    if (columns[i] && columns[i + 1]) {
      activities.push({
        year: columns[i],
        name: columns[i + 1],
        event: columns[i + 2] || '',
        involvement: columns[i + 3] || ''
      });
    }
  }
  return activities;
}

function extractVIAActivities(columns: string[]): any[] {
  const activities = [];
  for (let i = 0; i < columns.length; i += 3) {
    if (columns[i] && columns[i + 1]) {
      activities.push({
        year: columns[i],
        name: columns[i + 1],
        partner: columns[i + 2] || ''
      });
    }
  }
  return activities;
}

function extractAwards(columns: string[]): any[] {
  const awards = [];
  for (let i = 0; i < columns.length; i += 2) {
    if (columns[i] && columns[i + 1]) {
      awards.push({
        year: columns[i],
        name: columns[i + 1]
      });
    }
  }
  return awards;
}

function extractNonSchoolAwards(columns: string[]): string[] {
  return columns.filter(award => award && award.trim());
}