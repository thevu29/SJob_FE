'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Pencil, Plus, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useDelete } from '@/hooks/useQueries';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { DeleteConfirmationDialog } from '@/features/user/pages/profile/components/delete-confirmation-dialog';
import { Resume } from '@/interfaces/resume';

interface ResumeCardProps {
  resumes: Resume[];
  jobSeekerId: string;
  onAdd: () => void;
  onEdit: (resume: Resume) => void;
}

export function ResumeCard({
  resumes,
  jobSeekerId,
  onAdd,
  onEdit
}: ResumeCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);

  const deleteResumeMutation = useDelete(
    'resumes',
    {
      onSuccess: () => {
        toast.success('Xóa hồ sơ thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['resumes/job-seeker', jobSeekerId]
  );

  const handleDeleteClick = (resume: Resume) => {
    setResumeToDelete(resume);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (resumeToDelete) {
      await deleteResumeMutation.mutateAsync(resumeToDelete.id);
    }
    setDeleteDialogOpen(false);
    setResumeToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setResumeToDelete(null);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Hồ Sơ</CardTitle>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-1'
          onClick={onAdd}
        >
          <Plus className='h-4 w-4' />
          <span>Thêm Hồ Sơ</span>
        </Button>
      </CardHeader>

      <CardContent>
        {resumes.length > 0 ? (
          <div className='space-y-4'>
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className='group relative flex items-center gap-4 rounded-md border p-3'
              >
                <div
                  className='flex cursor-pointer items-center gap-4'
                  onClick={() => window.open(resume.url, '_blank')}
                >
                  <div className='bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded'>
                    <FileText className='text-primary h-5 w-5' />
                  </div>

                  <div className='flex-1'>
                    <h3 className='font-medium'>
                      {resume.name}
                      {resume.main && (
                        <Badge variant='default' className='ml-2'>
                          Chính
                        </Badge>
                      )}
                    </h3>
                    <p className='text-muted-foreground text-xs'>
                      Đã tải lên:{' '}
                      {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className='absolute right-3 opacity-0 transition-opacity group-hover:opacity-100'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onEdit(resume)}
                  >
                    <Pencil className='h-4 w-4' />
                    <span className='sr-only'>Chỉnh sửa</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDeleteClick(resume)}
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
            <p>Chưa có hồ sơ nào</p>
          </div>
        )}
      </CardContent>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Xóa hồ sơ'
        description={`Bạn có chắc chắn muốn xóa hồ sơ ${resumeToDelete?.name || ''} không? Hành động này không thể hoàn tác.`}
      />
    </Card>
  );
}
