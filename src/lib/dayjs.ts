import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/th';
import 'dayjs/locale/en';

// Extend plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(localeData);

// Set global defaults
dayjs.locale('th');
dayjs.tz.setDefault('Asia/Bangkok');

export default dayjs;
export type { Dayjs } from 'dayjs';
