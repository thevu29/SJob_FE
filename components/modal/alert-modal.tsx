'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Bạn có chắc chắn?'
      description='Hành động này không thể hoàn tác.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button
          disabled={loading}
          variant='outline'
          onClick={onClose}
          className='cursor-pointer'
        >
          Hủy
        </Button>
        <Button
          disabled={loading}
          variant='destructive'
          onClick={onConfirm}
          className='cursor-pointer bg-[#dc2626] text-white'
        >
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};
