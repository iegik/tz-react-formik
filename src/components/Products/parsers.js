import moment from 'moment';

export const parseDateIn = timestamp => moment(timestamp ? new Date(timestamp) : null).format('YYYY-MM-DDTHH:mm:ssZ');
export const parseDateOut = timestamp => timestamp ? moment(new Date(timestamp)).format('YYYY-MM-DD') : '';
