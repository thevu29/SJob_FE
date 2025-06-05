import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import React from 'react';

export default function MyTooltip({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className='text-muted-foreground h-4 w-4 cursor-help' />
      </TooltipTrigger>
      <TooltipContent side='right' className='max-w-x'>
        {children}
      </TooltipContent>
    </Tooltip>
  );
}
