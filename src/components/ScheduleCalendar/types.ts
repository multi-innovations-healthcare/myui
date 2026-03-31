export type ScheduleViewMode = 'day' | 'week' | 'workWeek' | 'resource';

export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: string; // Hex or tailwind color class
  resourceId?: string;
  data?: Record<string, unknown>;
}

export interface ScheduleCalendarProps {
  events: ScheduleEvent[];
  view?: ScheduleViewMode;
  date?: Date;
  onChangeDate?: (date: Date) => void;
  onEventClick?: (event: ScheduleEvent) => void;
  onRangeSelect?: (start: Date, end: Date) => void;
  slotDuration?: number; // In minutes, default 30
  startHour?: number; // 0-23
  endHour?: number; // 0-23
  className?: string;
  locale?: string;
}
