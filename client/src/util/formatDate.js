import moment from 'moment';

export const formatNormalDate = (date) => moment(date).format('DD/MM/YYYY');

export const formatComicDate = (date) => moment(date).format('HH:mm DD/MM/YYYY');

export const formatChapterDate = (chapterUpdate) => {
    const now = moment();
    const date = moment(chapterUpdate);
    const daysInMonth = moment(chapterUpdate, 'YYYY-MM').daysInMonth();
    const seconds = now.diff(date, 'seconds');
    const minutes = now.diff(date, 'minutes');
    const hours = now.diff(date, 'hours');
    const days = now.diff(date, 'days');

    if (seconds < 60) {
        return `${seconds} giây trước`;
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else if (days < daysInMonth) {
        return `${days} ngày trước`;
    } else {
        return moment(chapterUpdate).format('DD/MM/YYYY');
    }
};
