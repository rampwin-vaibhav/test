import { SetStateAction, useEffect, useState } from 'react';

type OTPTimerProps = {
  timeInSecond: any;
  setTimeExpire: (value: SetStateAction<any>) => void;
  setOtpError: (value: SetStateAction<string | undefined>) => void;
};

const OTPTimer = (props: OTPTimerProps) => {
  const [timeInSecond, setTimeInSecond] = useState(props.timeInSecond);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setTimeInSecond(props.timeInSecond);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = timeInSecond - 1;
      setTimeInSecond(t);
      getTime(t);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeInSecond]);

  const getTime = (t: number) => {
    setMinutes(Math.floor(t / 60));
    setSeconds(Math.floor(t % 60));

    if (t <= 0) {
      props.setTimeExpire(0);
      props.setOtpError('');
    }
  };
  if (minutes >= 0 || seconds >= 0) {
    return (
      <label>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}`}</label>
    );
  }
  return <></>;
};
export default OTPTimer;
