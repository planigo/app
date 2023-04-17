import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import localeData from 'dayjs/plugin/localeData'

export const LOCALE = 'fr'

dayjs.locale(LOCALE)
dayjs.extend(localeData)

export const weekdays: string[] = dayjs.weekdays(true)

export const RESERVATION_DATE_FORMAT = "dddd D MMMM YYYY [à] HH:mm"
export const TEXTUAL_DATE_FORMAT = "dddd D MMMM"
export const HOUR_MINUTES_FORMAT = 'HH:mm'
export const FULL_HOUR_FORMAT = 'HH:mm:ss'

export const getWeekday = (dayNumber: number): string => {
    return weekdays[dayNumber - 1]
}