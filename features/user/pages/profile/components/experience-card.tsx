'use client';

import { useState } from 'react';
import {
  Building2,
  Calendar,
  MapPin,
  Pencil,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmationDialog } from '@/features/user/pages/profile/components/delete-confirmation-dialog';
import {
  EmployeeType,
  Experience,
  LocationType
} from '@/interfaces/experience';
import { useDelete } from '@/hooks/use-queries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Badge } from '@/components/ui/badge';
import { getValueOfKeyFromEnum } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ExperienceCardProps {
  experiences: Experience[];
  jobSeekerId: string;
  onAdd: () => void;
  onEdit: (experience: Experience) => void;
}

export function ExperienceCard({
  experiences,
  jobSeekerId,
  onAdd,
  onEdit
}: ExperienceCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] =
    useState<Experience | null>(null);

  const deleteExperienceMutation = useDelete(
    'experiences',
    {
      onSuccess: () => {
        toast.success('Xóa kinh nghiệm làm việc thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['experiences/job-seeker', jobSeekerId]
  );

  const handleDeleteClick = (experience: Experience) => {
    setExperienceToDelete(experience);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (experienceToDelete) {
      await deleteExperienceMutation.mutateAsync(experienceToDelete.id);
    }
    setDeleteDialogOpen(false);
    setExperienceToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setExperienceToDelete(null);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Kinh Nghiệm Làm Việc</CardTitle>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-1'
          onClick={onAdd}
        >
          <Plus className='h-4 w-4' />
          <span>Thêm Kinh Nghiệm Làm Việc</span>
        </Button>
      </CardHeader>

      <CardContent>
        {experiences.length > 0 ? (
          <div className='space-y-6'>
            {experiences.map((experience) => (
              <div key={experience.id} className='group relative flex gap-4'>
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='flex-shrink-0'>
                    <div className='bg-muted w-fit rounded-full p-3'>
                      <Building2 className='h-5 w-5' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                      <div>
                        <h3 className='text-lg font-medium'>
                          {experience.position}
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                          <Badge variant='default'>
                            {getValueOfKeyFromEnum(
                              EmployeeType,
                              experience.employeeType
                            )}
                          </Badge>
                          <Badge variant='default'>
                            {getValueOfKeyFromEnum(
                              LocationType,
                              experience.locationType
                            )}
                          </Badge>
                        </div>
                      </div>
                      <div className='absolute top-0 right-0 flex flex-wrap gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => onEdit(experience)}
                        >
                          <Pencil className='h-4 w-4' />
                          <span className='sr-only'>Chỉnh sửa</span>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleDeleteClick(experience)}
                        >
                          <Trash2 className='h-4 w-4' />
                          <span className='sr-only'>Xóa</span>
                        </Button>
                      </div>
                    </div>

                    <div className='text-muted-foreground mt-1 flex flex-col gap-2 md:flex-row md:items-center'>
                      <div className='flex items-center gap-1'>
                        <Building2 className='h-4 w-4' />
                        <span>{experience.company}</span>
                      </div>
                      <span className='hidden md:inline'>•</span>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    <div className='text-muted-foreground mt-1 flex items-center gap-1'>
                      <Calendar className='h-4 w-4' />
                      <p className='text-muted-foreground text-md'>
                        {new Date(experience.startDate).toLocaleDateString(
                          'en-US',
                          { month: 'numeric', year: 'numeric' }
                        )}{' '}
                        -{' '}
                        {experience.endDate
                          ? new Date(experience.endDate).toLocaleDateString(
                              'en-US',
                              { month: 'numeric', year: 'numeric' }
                            )
                          : 'Present'}
                      </p>
                    </div>

                    <div className='mt-3'>
                      <p className='text-sm whitespace-pre-line'>
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-muted-foreground py-8 text-center'>
            <p>Chưa có kinh nghiệm làm việc nào</p>
          </div>
        )}
      </CardContent>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Xóa kinh nghiệm làm việc'
        description={`Bạn có chắc chắn muốn xóa kinh nghiệm làm việc tại ${experienceToDelete?.company || ''} không? Hành động này không thể hoàn tác.`}
      />
    </Card>
  );
}
