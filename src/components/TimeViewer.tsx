import ReactTimeAgo from 'react-time-ago';

interface ITimeViewer {
  createdAt: number;
}

const TimeViewer = ({ createdAt }: ITimeViewer) => {
  const d = new Date();
  const oneHourAgo = d.valueOf() - 1000 * 60 * 60;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const OneDay = 86400000;
  const y = t.valueOf() - OneDay;
  const hoursMinsDate = new Date(createdAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
  });
  if (createdAt > oneHourAgo) {
    return <ReactTimeAgo date={createdAt} />;
  } else if (createdAt > t.valueOf() && createdAt < oneHourAgo) {
    return <span>today at {hoursMinsDate}</span>;
  } else if (createdAt > y && createdAt < t.valueOf()) {
    return <span>yesterday at {hoursMinsDate}</span>;
  } else if (createdAt < y) {
    return (
      <span>
        {new Date(createdAt).toLocaleString([], {
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
