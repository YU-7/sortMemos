import { ReactNode } from 'react';

interface SettingItemProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingItem({ title, description, children }: SettingItemProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm w-full">
      <div className="flex-1 min-w-0">
        <div className="space-y-1">
          <label className="text-sm font-medium">{title}</label>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="ml-4 shrink-0">
        {children}
      </div>
    </div>
  );
}