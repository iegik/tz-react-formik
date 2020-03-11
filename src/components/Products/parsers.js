import moment from 'moment';

export const parseDateIn = timestamp => moment(timestamp ? new Date(timestamp) : null).format('YYYY-MM-DDTHH:mm:ssZ');
export const parseDateOut = timestamp => moment(timestamp ? new Date(timestamp) : null).format('YYYY-MM-DD');
