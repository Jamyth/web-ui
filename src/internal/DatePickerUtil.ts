export interface WEEK_DAYS {
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
}

export interface CALENDAR_MONTHS {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;
    September: string;
    October: string;
    November: string;
    December: string;
}

export class DatePickerUtil {
    static THIS_YEAR: number = new Date().getFullYear();
    static THIS_MONTH: number = new Date().getMonth();

    // for translation
    static WEEK_DAYS: WEEK_DAYS = {
        Sunday: 'Sunday',
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
    };

    // for translation
    static CALENDAR_MONTHS: CALENDAR_MONTHS = {
        January: 'January',
        February: 'February',
        March: 'March',
        April: 'April',
        May: 'May',
        June: 'June',
        July: 'July',
        August: 'August',
        September: 'September',
        October: 'October',
        November: 'November',
        December: 'December',
    };

    // rows
    static CALENDAR_WEEKS = 6;

    static zeroPad(value: number, length: number): string {
        return `${value}`.padStart(length, '0');
    }

    static getMonthDays(month: number = this.THIS_MONTH, year: number = this.THIS_YEAR): number {
        // 4, 6, 9, 11
        // const months30 = [4, 6, 9, 11];
        const months30 = [3, 5, 8, 10];
        const leapYear = year % 4 === 0;

        return month === 1 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31;
    }

    static getMonthFirstDay(month: number = this.THIS_MONTH, year: number = this.THIS_YEAR): number {
        return new Date(`${year}-${this.zeroPad(month, 2)}-01`).getDay() + 1;
    }

    static isSameMonth(date: Date, baseDate: Date = new Date()): boolean {
        const baseDateMonth = baseDate.getMonth();
        const baseDateYear = baseDate.getFullYear();

        const dateMonth = date.getMonth();
        const dateYear = date.getFullYear();

        return baseDateMonth === dateMonth && baseDateYear === dateYear;
    }

    static isSameDay(date: Date, today: Date = new Date()): boolean {
        const isSameMonth = this.isSameMonth(date, today);

        const baseDateDay = today.getDate();
        const dateDay = date.getDate();

        return isSameMonth && baseDateDay === dateDay;
    }

    static isToday(date: Date | [string, string, string]): boolean {
        const _date = Array.isArray(date) ? new Date(date.join('-')) : date;
        return this.isSameDay(_date);
    }

    static getDateISO(date: Date = new Date()): string {
        return [
            date.getFullYear(),
            this.zeroPad(Number(date.getMonth()) + 1, 2),
            this.zeroPad(Number(date.getDate()), 2),
        ].join('-');
    }

    static getPreviousMonth(month: number, year: number) {
        const prevMonth = month > 1 ? month - 1 : 12;
        const prevMonthYear = month > 1 ? year : year - 1;

        return {
            month: prevMonth,
            year: prevMonthYear,
        };
    }

    static getNextMonth(month: number, year: number) {
        const nextMonth = month < 12 ? month + 1 : 1;
        const nextMonthYear = month < 12 ? year : year + 1;

        return {
            month: nextMonth,
            year: nextMonthYear,
        };
    }

    static init(month: number = this.THIS_MONTH, year: number = this.THIS_YEAR): [string, string, string][] {
        const monthDays = this.getMonthDays(month, year);
        const monthFirstDay = this.getMonthFirstDay(month + 1, year);
        console.info(monthFirstDay);

        const daysFromPrevMonth = monthFirstDay - 1;
        const daysFromNextMonth = this.CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

        const { month: prevMonth, year: prevMonthYear } = this.getPreviousMonth(month, year);
        const { month: nextMonth, year: nextMonthYear } = this.getNextMonth(month, year);

        const prevMonthDays = this.getMonthDays(prevMonth, prevMonthYear);

        const prevMonthDates: [string, string, string][] = [...new Array(daysFromPrevMonth)].map((_, index) => {
            const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
            return [`${prevMonthYear}`, this.zeroPad(prevMonth, 2), this.zeroPad(day, 2)];
        });

        const thisMonthDates: [string, string, string][] = [...new Array(monthDays)].map((_, index) => {
            const day = index + 1;
            return [`${year}`, this.zeroPad(month, 2), this.zeroPad(day, 2)];
        });

        const nextMonthDates: [string, string, string][] = [...new Array(daysFromNextMonth)].map((_, index) => {
            const day = index + 1;
            return [`${nextMonthYear}`, this.zeroPad(nextMonth, 2), this.zeroPad(day, 2)];
        });

        return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
    }

    static toDate(dateStrArr: [string, string, string], monthIncrement: boolean = false) {
        if (monthIncrement) {
            const values = dateStrArr.map((_) => Number(_));
            values[1]++;
            return new Date([values[0].toString(), this.zeroPad(values[1], 2), this.zeroPad(values[2], 2)].join('-'));
        }
        return new Date(dateStrArr.join('-'));
    }

    static getDateTimeString(date?: string | Date, withTime: boolean = true): string {
        const _date = date ? new Date(date) : new Date();
        if (Number.isNaN(_date.valueOf())) {
            return '';
        }
        const dateStr = [
            _date.getFullYear(),
            this.zeroPad(_date.getMonth() + 1, 2),
            this.zeroPad(_date.getDate(), 2),
        ].join('-');
        const timeStr = [
            this.zeroPad(_date.getHours(), 2),
            this.zeroPad(_date.getMinutes(), 2),
            this.zeroPad(_date.getSeconds(), 2),
        ].join(':');

        if (!withTime) {
            return dateStr;
        }
        return [dateStr, timeStr].join(' ');
    }

    static getYearRange(date: Date, multiplier: 10 | 100) {
        const min = Math.floor(date.getFullYear() / multiplier) * multiplier;
        const step = multiplier === 10 ? 1 : 10;
        return [min - step, ...[...new Array(10)].map((_, i) => min + i * step), min + step * 10];
    }
}
