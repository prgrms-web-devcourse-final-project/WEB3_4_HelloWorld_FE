import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ko';

dayjs.extend(isSameOrBefore);
dayjs.locale('ko');

export default dayjs;
