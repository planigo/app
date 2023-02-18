import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import localeData from 'dayjs/plugin/localeData'

const LOCALE = 'fr'

dayjs.locale(LOCALE)
dayjs.extend(localeData)

