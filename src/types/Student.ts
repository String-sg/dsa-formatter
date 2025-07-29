export interface Student {
  id: string;
  name: string;
  primarySchool: string;
  talent1: string;
  talent2?: string;
  citizenship: string;
  dateOfBirth: string;
  sex: string;
  gepStatus: string;
  address: string;
  postalCode: string;
  mainContact: {
    name: string;
    mobile: string;
    email: string;
  };
  alternateContact: {
    name: string;
    mobile: string;
    email: string;
  };
  parents: {
    father: {
      name: string;
      contact: string;
    };
    mother: {
      name: string;
      contact: string;
    };
  };
  languages: {
    first: string;
    second: string;
    approvedMT: string;
  };
  academics: {
    p6: AcademicRecord;
    p5: AcademicRecord;
  };
  ccaActivities: CCAActivity[];
  viaActivities: VIAActivity[];
  awards: Award[];
  nonSchoolAwards: string[];
  napfa: NAPFARecord;
  recommendationReason: string;
}

export interface AcademicRecord {
  year: string;
  level: string;
  overallPercentage: number;
  subjects: {
    english: SubjectGrade;
    maths: SubjectGrade;
    science: SubjectGrade;
    motherTongue: SubjectGrade;
    higherMotherTongue?: SubjectGrade;
  };
  conduct: string;
  teacherRemarks: string;
}

export interface SubjectGrade {
  score: number;
  firstCombined?: number;
  overall?: number;
}

export interface CCAActivity {
  year: string;
  name: string;
  event: string;
  involvement: string;
}

export interface VIAActivity {
  year: string;
  name: string;
  partner: string;
}

export interface Award {
  year: string;
  name: string;
}

export interface NAPFARecord {
  year: string;
  height: number;
  weight: number;
  sitUp: { score: number; band: string };
  standingBroadJump: { score: number; band: string };
  sitAndReach: { score: number; band: string };
  pullUp: { score: number; band: string };
  shuttleRun: { score: number; band: string };
  run: { score: number; band: string };
  award: string;
}