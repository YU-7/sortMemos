import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
interface SettingItemProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingItem({ title, description, children }: SettingItemProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='text-lg'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 text-md text-card-foreground'>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex-1">{description}</div>
          {children}
        </div>
      </CardContent>
      </Card>
  );
}