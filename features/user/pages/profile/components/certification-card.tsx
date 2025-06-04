'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmationDialog } from '@/features/user/pages/profile/components/delete-confirmation-dialog';
import { Certification } from '@/interfaces/certification';
import { useDelete } from '@/hooks/use-queries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface CertificationCardProps {
  certifications?: Certification[];
  jobSeekerId?: string;
  onAdd: () => void;
  onEdit: (certification: Certification) => void;
}

export function CertificationCard({
  certifications,
  jobSeekerId,
  onAdd,
  onEdit
}: CertificationCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certificationToDelete, setCertificationToDelete] =
    useState<Certification | null>(null);

  const deleteCertificationMutation = useDelete(
    'certifications',
    {
      onSuccess: () => {
        toast.success('Xóa chứng chỉ thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['certifications/job-seeker', jobSeekerId ?? '']
  );

  const handleDeleteClick = (certification: Certification) => {
    setCertificationToDelete(certification);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (certificationToDelete) {
      await deleteCertificationMutation.mutateAsync(certificationToDelete.id);
    }
    setDeleteDialogOpen(false);
    setCertificationToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCertificationToDelete(null);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Chứng chỉ</CardTitle>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-1'
          onClick={onAdd}
        >
          <Plus className='h-4 w-4' />
          <span>Thêm Chứng Chỉ</span>
        </Button>
      </CardHeader>

      <CardContent>
        {certifications && certifications.length > 0 ? (
          <div className='space-y-6'>
            {certifications.map((certification) => (
              <div key={certification.id} className='group relative flex gap-4'>
                <div className='bg-primary/10 flex h-16 w-16 shrink-0 items-center justify-center rounded'>
                  <img
                    src={
                      certification.imageOrFile ||
                      '/placeholder.svg?height=64&width=64'
                    }
                    alt={certification.name}
                    className='h-12 w-12 object-contain'
                  />
                </div>

                <div className='flex-1'>
                  <h3 className='text-lg font-semibold'>
                    {certification.name}
                  </h3>
                  <p className='text-muted-foreground text-sm'>
                    {new Date(certification.issueDate).toLocaleDateString(
                      'en-US',
                      {
                        month: 'numeric',
                        year: 'numeric'
                      }
                    )}{' '}
                    -{' '}
                    {certification.expireDate
                      ? new Date(certification.expireDate).toLocaleDateString(
                          'en-US',
                          {
                            month: 'numeric',
                            year: 'numeric'
                          }
                        )
                      : 'Không hết hạn'}
                  </p>
                </div>

                <div className='absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onEdit(certification)}
                  >
                    <Pencil className='h-4 w-4' />
                    <span className='sr-only'>Chỉnh sửa</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDeleteClick(certification)}
                  >
                    <Trash2 className='h-4 w-4' />
                    <span className='sr-only'>Xóa</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-muted-foreground py-8 text-center'>
            <p>Chưa có chứng chỉ nào</p>
          </div>
        )}
      </CardContent>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Xóa chứng chỉ'
        description={`Bạn có chắc chắn muốn xóa chứng chỉ ${certificationToDelete?.name || ''} không? Hành động này không thể hoàn tác.`}
      />
    </Card>
  );
}
