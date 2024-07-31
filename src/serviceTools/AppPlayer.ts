// Importing the TrackPlayer library from react-native-track-player
import TrackPlayer, { Track, Capability } from 'react-native-track-player';

/**
 * AppPlayer class encapsulates functionalities related to audio player operations.
 */
class AppPlayer {
    /**
     * Static property to hold the currently selected track.
     * This can be null if no track is selected.
     */
    static selectedTrack: Track | null;

    /**
     * Initializes the audio player with specific options.
     * This method sets up the player with capabilities for play, pause, stop, and seeking.
     */
    static initializePlayer = async () => {
        try {
            // Updating the player options to customize its behavior
            TrackPlayer.updateOptions({
                // stopWithApp: false, // Music continues in the background even when the app is closed
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                    Capability.SeekTo,
                ],
                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                    Capability.SeekTo,
                ],
            });

            // Setting up the player
            await TrackPlayer.setupPlayer();
        } catch (e) {
            console.log(e);
            // Placeholder for error handling
        }
    };

    /**
     * Converts seconds into a formatted HH:MM:SS string.
     * @param {number|string} seconds - The time in seconds to convert.
     * @returns {string} Formatted time string.
     */
    static secondsToHHMMSS = (seconds: number | string) => {
        // Ensuring seconds is a number
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        // Formatting hours, minutes, and seconds
        const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
        const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
        const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
        return `${hrs}${mins}${scnds}`;
    };
}

export default AppPlayer;