import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { todo } from '@/SQLiteClient/TodoRepository';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SignalHigh, SignalMedium, SignalLow,Siren } from 'lucide-react';
const priorityArr = [
    {
        value: '1',
        label: 'emergency'
    },
    {
        value: '2',
        label: 'normal'
    }
];

const importantArr = [
    {
        value: 'true',
        label: 'important'
    },
    {
        value: 'false',
        label: 'unimportant'
    }
];
interface PriorityBoxProps {
    todo: todo;
}
export function PriorityBox({ todo }: PriorityBoxProps) {
    const [pOpen, setpOpen] = React.useState(false);
    const [iOpen, setiOpen] = React.useState(false);
    const [pValue, setpValue] = React.useState(todo.priority?.toString() || '');
    const [iValue, setiValue] = React.useState(todo.priority?.toString() || '');

    return (
        <div className="flex gap-2">
            {/* 优先级 */}
            <Popover open={pOpen} onOpenChange={setpOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={pOpen} className="w-[70px] justify-between">
                        <ChevronsUpDown className="opacity-50" />
                        {pValue == '1' && <Siren className="h-5 w-5 text-red-500" />}
                        {pValue == '2' && <SignalMedium className="h-5 w-5 text-yellow-500" />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {priorityArr.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setpValue(currentValue === pValue ? '' : currentValue);
                                            setpOpen(false);
                                        }}
                                    >
                                        {framework.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                iValue === framework.value ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                        {framework.value == '1' && <Siren className="h-5 w-5 text-red-500" />}
                                        {framework.value == '2' && <SignalMedium className="h-5 w-5 text-yellow-500" />}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {/* 紧急程度 */}
            <Popover open={iOpen} onOpenChange={setiOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={pOpen} className="w-[70px] justify-between">
                        <ChevronsUpDown className="opacity-50" />
                        {iValue == 'true' && <SignalHigh className="h-5 w-5 text-red-500" />}
                        {iValue == 'false' && <SignalMedium className="h-5 w-5 text-yellow-500" />}
                        
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {importantArr.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setiValue(currentValue === iValue ? '' : currentValue);
                                            setiOpen(false);
                                        }}
                                    >
                                        {framework.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                iValue === framework.value ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                        {framework.value == 'true' && <SignalHigh className="h-5 w-5 text-red-500" />}
                                        {framework.value == 'false' && <SignalMedium className="h-5 w-5 text-yellow-500" />}
                            
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
