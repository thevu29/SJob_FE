'use client';

import type React from 'react';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmationDialog } from '@/features/user/pages/profile/components/delete-confirmation-dialog';
import { Skill } from '@/interfaces/skill';
import { useDelete } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface SkillCardProps {
  skills: Skill[];
  jobSeekerId: string;
  onAdd: () => void;
  onEdit: (skill: Skill) => void;
}

export function SkillCard({
  skills,
  jobSeekerId,
  onAdd,
  onEdit
}: SkillCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const deleteSkillMutation = useDelete(
    'skills',
    {
      onSuccess: () => {
        toast.success('Xóa kỹ năng thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['skills/job-seeker', jobSeekerId]
  );

  const handleDeleteClick = (skill: Skill, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering edit when clicking delete
    setSkillToDelete(skill);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (skillToDelete) {
      await deleteSkillMutation.mutateAsync(skillToDelete.id);
    }
    setDeleteDialogOpen(false);
    setSkillToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSkillToDelete(null);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Kỹ Năng</CardTitle>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-1'
          onClick={onAdd}
        >
          <Plus className='h-4 w-4' />
          <span>Thêm Kỹ Năng</span>
        </Button>
      </CardHeader>

      <CardContent>
        {skills.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant='outline'
                className='hover:bg-accent group relative cursor-pointer px-4 py-2 text-base'
                onClick={() => onEdit(skill)}
              >
                <span className='flex items-center'>
                  {skill.name}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='ml-2 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100'
                    onClick={(e) => handleDeleteClick(skill, e)}
                  >
                    <Trash2 className='h-3 w-3' />
                    <span className='sr-only'>Xóa</span>
                  </Button>
                </span>
              </Badge>
            ))}
          </div>
        ) : (
          <div className='text-muted-foreground py-8 text-center'>
            <p>Chưa có kỹ năng nào</p>
          </div>
        )}
      </CardContent>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Xóa kỹ năng'
        description={`Bạn có chắc chắn muốn xóa kỹ năng ${skillToDelete?.name || ''} không? Hành động này không thể hoàn tác.`}
      />
    </Card>
  );
}
