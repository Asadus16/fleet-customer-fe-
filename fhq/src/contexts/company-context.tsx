'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useCompanySettings } from '@/hooks';

export interface CompanyData {
  name: string;
  address: string;
  email: string;
  phone: string;
  logo: string | null;
}

interface CompanyContextValue {
  company: CompanyData | null;
  isLoading: boolean;
}

// Default company data used as fallback
const DEFAULT_COMPANY: CompanyData = {
  name: 'Fleet HQ',
  address: 'United States',
  email: 'support@fleethq.com',
  phone: '+1 (555) 000-0000',
  logo: null,
};

const CompanyContext = createContext<CompanyContextValue | undefined>(undefined);

interface CompanyProviderProps {
  children: ReactNode;
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const { data: companyData, isLoading } = useCompanySettings();

  const value = useMemo(
    () => ({
      company: companyData || DEFAULT_COMPANY,
      isLoading,
    }),
    [companyData, isLoading]
  );

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
