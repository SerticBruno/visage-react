'use client';

import { Navigate } from 'react-big-calendar';
// @ts-expect-error TimeGrid is an internal react-big-calendar export without types
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

export const ROLLING_WEEK_VIEW = 'rollingWeek' as const;

type ViewProps = React.ComponentProps<typeof TimeGrid> & {
  date: Date;
  localizer: {
    startOf: (date: Date, unit: string) => Date;
    add: (date: Date, amount: number, unit: string) => Date;
    range: (start: Date, end: Date) => Date[];
    endOf: (date: Date, unit: string) => Date;
  };
};

/** 7-day view starting from the anchor date (today → +6 days). */
function RollingWeekView(props: ViewProps) {
  const {
    date,
    localizer,
    min = localizer.startOf(new Date(), 'day'),
    max = localizer.endOf(new Date(), 'day'),
    scrollToTime = localizer.startOf(new Date(), 'day'),
    enableAutoScroll = true,
    ...rest
  } = props;

  const range = RollingWeekView.range(date, props);

  return (
    <TimeGrid
      {...rest}
      date={date}
      localizer={localizer}
      range={range}
      min={min}
      max={max}
      scrollToTime={scrollToTime}
      enableAutoScroll={enableAutoScroll}
      eventOffset={15}
    />
  );
}

RollingWeekView.range = (date: Date, { localizer }: ViewProps) => {
  const start = localizer.startOf(date, 'day');
  const end = localizer.add(start, 6, 'day');
  return localizer.range(start, end);
};

RollingWeekView.navigate = (
  date: Date,
  action: string,
  { localizer }: Pick<ViewProps, 'localizer'>
) => {
  const anchor = localizer.startOf(date, 'day');
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(anchor, -7, 'day');
    case Navigate.NEXT:
      return localizer.add(anchor, 7, 'day');
    case Navigate.TODAY:
    default:
      return localizer.startOf(new Date(), 'day');
  }
};

RollingWeekView.title = (date: Date, { localizer }: Pick<ViewProps, 'localizer'>) => {
  const range = RollingWeekView.range(date, { localizer } as ViewProps);
  const start = range[0];
  const end = range[range.length - 1];
  const fmt = (d: Date) =>
    d.toLocaleDateString('hr-HR', { day: 'numeric', month: 'short' });
  return `${fmt(start)} – ${fmt(end)} ${end.getFullYear()}.`;
};

export default RollingWeekView;
