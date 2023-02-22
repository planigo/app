import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import localeData from 'dayjs/plugin/localeData'

const LOCALE = 'fr'

dayjs.locale(LOCALE)
dayjs.extend(localeData)

export const RESERVATION_DATE_FORMAT = "dddd D MMMM YYYY [à] HH:mm"