'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  CreateSkillSchema,
  TCreateSkill
} from '@/features/user/schemas/skill.schema';
import { usePost } from '@/hooks/useQueries';
import { Skill } from '@/interfaces/skill';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface AddSkillFormProps {
  jobSeekerId: string;
  onClose: () => void;
}

export function AddSkillForm({ onClose, jobSeekerId }: AddSkillFormProps) {
  const createSkillMutation = usePost<Skill>(
    'skills',
    {
      onSuccess: () => {
        toast.success('Thêm mới kỹ năng thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['skills/job-seeker', jobSeekerId]
  );
  const form = useForm<TCreateSkill>({
    resolver: zodResolver(CreateSkillSchema),
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit(values: TCreateSkill) {
    const payload = {
      ...values,
      jobSeekerId: jobSeekerId
    };
    await createSkillMutation.mutateAsync(payload);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Thêm kỹ năng</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên kỹ năng</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập tên kỹ năng' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button type='submit'>Lưu</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
