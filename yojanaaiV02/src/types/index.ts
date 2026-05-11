export type Status = 'Submitted' | 'Eligibility Check' | 'Document Review' | 'Processing' | 'Approved' | 'Rejected';

export interface User {
  id: string;
  fullName: string;
  userName: string;
  phoneNumber: string;
  aadhaarNumber: string;
  category: string;
  state: string;
  district: string;
  gender?: string;
  occupation?: string;
  annualIncome?: string;
  age?: string;
}

export interface ApplicationRecord {
  id: string;
  referenceNumber: string;
  appliedDate: string;
  status: Status;
  completionPercentage: number;
  benefitDetails: string;
  schemeName: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'hi';
