import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJobParams } from '@/features/user/hooks/useJobParams';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages
}: PaginationProps) {
  const { setCurrentPage } = useJobParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        'ellipsis',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages
    ];
  };

  const pages = generatePagination();

  return (
    <div className='flex items-center justify-center space-x-2'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      {pages.map((pageNumber, i) =>
        pageNumber === 'ellipsis' ? (
          <Button
            key={`ellipsis-${i}`}
            variant='ghost'
            disabled
            className='cursor-default'
          >
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        ) : (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? 'default' : 'outline'}
            onClick={() => handlePageChange(Number(pageNumber))}
            className={currentPage === pageNumber ? 'pointer-events-none' : ''}
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        variant='outline'
        size='icon'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Next page'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}
