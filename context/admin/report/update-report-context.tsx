'use client';

import React, { useContext, useState } from 'react';

import { Report } from '@/interfaces';
import { useDialogState } from '@/hooks';

type ReportModaltype = 'add' | 'update' | 'delete';

interface ReportContextType {
  open: ReportModaltype | null;
  setOpen: (open: ReportModaltype | null) => void;
  currentReport: Report | null;
  setCurrentReport: React.Dispatch<React.SetStateAction<Report | null>>;
}

const ReportContext = React.createContext<ReportContextType | null>(null);

interface ReportProviderProps {
  children: React.ReactNode;
}

export function ReportProvider({ children }: ReportProviderProps) {
  const [open, setOpen] = useDialogState<ReportModaltype>(null);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  return (
    <ReportContext value={{ open, setOpen, currentReport, setCurrentReport }}>
      {children}
    </ReportContext>
  );
}

export const useReportContext = () => {
  const reportContext = useContext(ReportContext);

  if (!reportContext) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }

  return reportContext;
};
