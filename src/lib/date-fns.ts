import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatTimeAgo = (date: Date | string | number) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ko,
  });
};
