'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDelete } from '@/hooks/use-queries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { DeleteConfirmationDialog } from '@/features/user/pages/profile/components/delete-confirmation-dialog';
import { Education } from '@/interfaces/education';

interface EducationCardProps {
  educations?: Education[];
  jobSeekerId?: string;
  onAdd: () => void;
  onEdit: (education: Education) => void;
}

export function EducationCard({
  educations,
  jobSeekerId,
  onAdd,
  onEdit
}: EducationCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState<Education | null>(
    null
  );

  const deleteEducationMutation = useDelete(
    'educations',
    {
      onSuccess: () => {
        toast.success('Xóa học vấn thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['educations/job-seeker', jobSeekerId ?? '']
  );

  const handleDeleteClick = (education: Education) => {
    setEducationToDelete(education);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (educationToDelete) {
      await deleteEducationMutation.mutateAsync(educationToDelete.id);
    }
    setDeleteDialogOpen(false);
    setEducationToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setEducationToDelete(null);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Học Vấn</CardTitle>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-1'
          onClick={onAdd}
        >
          <Plus className='h-4 w-4' />
          <span>Thêm Học Vấn</span>
        </Button>
      </CardHeader>

      <CardContent>
        {educations && educations.length > 0 ? (
          <div className='space-y-6'>
            {educations.map((education) => (
              <div key={education.id} className='group relative flex gap-4'>
                <div className='bg-primary/10 flex h-16 w-16 shrink-0 items-center justify-center rounded'>
                  <div className='text-primary text-2xl font-bold'>4+</div>
                  <div className='text-primary text-xs'>Năm</div>
                </div>

                <div className='flex-1'>
                  <h3 className='text-lg font-semibold'>{education.major}</h3>
                  <p className='text-muted-foreground'>
                    {education.school} - {education.degree}
                  </p>
                  <p className='text-muted-foreground text-sm'>
                    {new Date(education.startDate).toLocaleDateString('en-US', {
                      month: 'numeric',
                      year: 'numeric'
                    })}{' '}
                    -{' '}
                    {education.endDate
                      ? new Date(education.endDate).toLocaleDateString(
                          'en-US',
                          { month: 'numeric', year: 'numeric' }
                        )
                      : 'Present'}
                  </p>
                </div>

                <div className='absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onEdit(education)}
                  >
                    <Pencil className='h-4 w-4' />
                    <span className='sr-only'>Chỉnh sửa</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDeleteClick(education)}
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
            <p>Chưa có thông tin học vấn nào</p>
          </div>
        )}
      </CardContent>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Xóa học vấn'
        description={`Bạn có chắc chắn muốn xóa thông tin học vấn tại ${educationToDelete?.school || ''} không? Hành động này không thể hoàn tác.`}
      />
    </Card>
  );
}
