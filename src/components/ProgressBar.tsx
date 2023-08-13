import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function ProgressBar() {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setProgress(0);
      setShowProgress(true);
    };
    const handleStop = () => {
      setProgress(100);
      setShowProgress(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  if (!showProgress) {
    return null;
  }
  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{ zIndex: 1101, position: 'fixed', top: 0, left: 0, right: 0 }}
    />
  );
}
