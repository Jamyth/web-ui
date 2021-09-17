import type { WeekDay } from './type';

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

function disableWeekDay(targets: WeekDay[]) {
    const indices = targets.map((_) => weekDays.indexOf(_)).filter((_) => _ !== -1);
    return (date: Date) => {
        return indices.includes(date.getDay());
    };
}

export const Utils = Object.freeze({ disableWeekDay });
