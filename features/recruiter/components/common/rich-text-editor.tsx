'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Bold, Italic, List } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  initialContent?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  initialContent
}: RichTextEditorProps) {
  const [content, setContent] = useState(value || initialContent || '');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };
  console.log('content', content);
  console.log('value', value);

  useEffect(() => {
    setContent(value || '');
  }, [value]);

  const handleFormat = (format: string) => {
    // This is a simplified implementation
    // In a real app, you would implement proper formatting
    let newContent = content;

    switch (format) {
      case 'bold':
        newContent = `**${content}**`;
        break;
      case 'italic':
        newContent = `*${content}*`;
        break;
      case 'list':
        newContent = content
          .split('\n')
          .map((line) => `- ${line}`)
          .join('\n');
        break;
    }

    setContent(newContent);
    onChange(newContent);
  };

  return (
    <div className='rounded-md border'>
      <div className='flex items-center gap-1 border-b p-2'>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => handleFormat('bold')}
        >
          <Bold className='h-4 w-4' />
          <span className='sr-only'>Bold</span>
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => handleFormat('italic')}
        >
          <Italic className='h-4 w-4' />
          <span className='sr-only'>Italic</span>
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => handleFormat('list')}
        >
          <List className='h-4 w-4' />
          <span className='sr-only'>List</span>
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        className='min-h-[150px] rounded-t-none border-0 focus-visible:ring-0'
      />
    </div>
  );
}
