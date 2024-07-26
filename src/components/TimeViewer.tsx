import ReactTimeAgo from 'react-time-ago';

interface ITimeViewer {
  date: number;
}

const TimeViewer = ({ date }: ITimeViewer) => {
  const longDate = date * 1000;
  const d = new Date();
  const oneHourAgo = d.valueOf() - 1000 * 60 * 60;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const OneDay = 86400000;
  const y = t.valueOf() - OneDay;
  const hoursMinsDate = new Date(longDate).toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
  });
  if (longDate > oneHourAgo) {
    return <ReactTimeAgo date={longDate} />;
  } else if (longDate > t.valueOf() && longDate < oneHourAgo) {
    return <span>today at {hoursMinsDate}</span>;
  } else if (longDate > y && longDate < t.valueOf()) {
    return <span>yesterday at {hoursMinsDate}</span>;
  } else if (longDate < y) {
    return (
      <span>
        {new Date(longDate).toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    );
  }
  return null;
};

export default TimeViewer;
