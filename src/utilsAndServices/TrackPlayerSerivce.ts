// Correct the filename to match the import statement in index.js
// Assuming the filename is TrackPlayerService.ts based on your import statement
import TrackPlayer from 'react-native-track-player';

// Define the service as a function that initializes the TrackPlayer
const initializeTrackPlayerService = () => {
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};

export default initializeTrackPlayerService;