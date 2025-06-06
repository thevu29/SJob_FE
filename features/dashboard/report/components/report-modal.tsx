import { useReportContext } from '@/context/admin/report/update-report-context';

import { ReportActionModal } from './report-action-modal';

export function ReportModal() {
  const { open, setOpen, currentReport, setCurrentReport } = useReportContext();

  return (
    <>
      {currentReport && (
        <>
          <ReportActionModal
            key={`update-report-${currentReport.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update');
              setTimeout(() => {
                setCurrentReport(null);
              }, 500);
            }}
            currentReport={currentReport}
          />
        </>
      )}
    </>
  );
}
