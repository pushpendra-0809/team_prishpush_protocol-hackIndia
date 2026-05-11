import React from 'react';
import { User, ApplicationRecord } from '../types';

// Mock data generator for application records
export const getMockApplications = (): ApplicationRecord[] => [
  {
    id: 'APP001',
    schemeName: 'Pradhan Mantri Awas Yojana',
    referenceNumber: 'PMAY-2024-8821',
    appliedDate: '2024-03-15',
    status: 'Approved',
    completionPercentage: 100,
    benefitDetails: 'Construction subsidy of ₹2.5 Lakhs credited to bank account.',
  },
  {
    id: 'APP002',
    schemeName: 'Ayushman Bharat Digital Mission',
    referenceNumber: 'ABDM-9921-002',
    appliedDate: '2024-04-10',
    status: 'Processing',
    completionPercentage: 75,
    benefitDetails: 'Health ID generated. Insurance verification in progress.',
  },
  {
    id: 'APP003',
    schemeName: 'PM-Kisan Samman Nidhi',
    referenceNumber: 'PMK-7712-441',
    appliedDate: '2024-05-01',
    status: 'Eligibility Check',
    completionPercentage: 40,
    benefitDetails: 'Land records verification pending at Block level.',
  },
  {
    id: 'APP004',
    schemeName: 'Ujjwala Yojana 2.0',
    referenceNumber: 'UJJ-5561-210',
    appliedDate: '2024-05-08',
    status: 'Submitted',
    completionPercentage: 20,
    benefitDetails: 'Application received. Document review scheduled.',
  }
];

export const getMockBenefits = () => [
  { name: 'LPG Subsidy', amount: '₹900', status: 'Active' },
  { name: 'Scholarship', amount: '₹12,000', status: 'Disbursed' },
  { name: 'Housing Grant', amount: '₹2,50,000', status: 'Completed' },
  { name: 'Health Cover', amount: '₹5,00,000', status: 'Active' },
];

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
