import { useEffect, useState } from 'react';
import TrackPlayer, { useProgress } from 'react-native-track-player';

const useTrackPlayerProgress = () => {
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const { position: currentPosition, duration: trackDuration } = useProgress();

    useEffect(() => {
        const getProgress = async () => {
            const newPosition = currentPosition || (await TrackPlayer.getPosition());
            const newDuration = trackDuration || (await TrackPlayer.getDuration());
            setPosition(newPosition);
            setDuration(newDuration);
        };

        getProgress();
    }, [currentPosition, trackDuration]);

    return { position, duration };
};

export default useTrackPlayerProgress;
