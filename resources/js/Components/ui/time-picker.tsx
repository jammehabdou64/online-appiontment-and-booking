import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  disabled = false,
}: TimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? value : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="time"
              value={value || ""}
              onChange={(e) => onChange?.(e.target.value)}
              className="flex-1"
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {[
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
            ].map((time) => (
              <Button
                key={time}
                variant={value === time ? "default" : "outline"}
                size="sm"
                onClick={() => onChange?.(time)}
                className="text-xs"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
