import React, { ReactNode, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import useTrackPlayerProgress from '../serviceTools/useTrackPlayerProgress';
import Slider from '@react-native-community/slider';
import AppPlayer from '../serviceTools/AppPlayer';
import scaling from '../serviceTools/scaling';
import { Track, State } from 'react-native-track-player';

type compProps = {
    track: Track;
    onNextPrevPress: (p: 'prev' | 'next') => void;
    onGoBackPress: () => void; // New prop for the Go Back button
};

const AudioPlayer: (props: compProps) => ReactNode = ({ track, onNextPrevPress, onGoBackPress }) => {
    const {
        playerMaxView,
        topSection,
        buttonsSection,
        progrsBarSection,
        buttonsCol,
        playPauseButton,
        playPauseIcon,
        trackArtBox,
        trackArt,
        trackDesc,
        trackTitle,
        trackSubtitle,
        goBackButton, // New style for the Go Back button
    } = styles;

    const progress = useTrackPlayerProgress();
    const [isPlaying, setPlaying] = useState(true);

    useEffect(() => {
        setPlaying(true);
        TrackPlayer.add(track);
        TrackPlayer.play();
    }, [track]);

    const onPlayPausePress = async () => {
        const state = await TrackPlayer.getState();

        if (state === State.Playing) {
            TrackPlayer.pause();
            setPlaying(false);
        }

        if (state === State.Paused) {
            TrackPlayer.play();
            setPlaying(true);
        }
    };

    const artImg = track.artwork || `https://picsum.photos/150/200/?random=${Math.random()}`;

    const playOrPauseIcon = isPlaying ? require('../assets/icons/play.png') : require('../assets/icons/pause.png');
    const prevIcon = require('../assets/icons/previous.png');
    const nextIcon = require('../assets/icons/next.png');
    const goBackIcon = require('../assets/icons/back.png'); // Icon for the Go Back button

    return (
        <View style={playerMaxView}>
            <View style={topSection}>
                <TouchableOpacity onPress={onGoBackPress} style={goBackButton}>
                    <Image source={goBackIcon} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
                <View style={trackArtBox}>
                    <Image style={trackArt} source={{ uri: artImg }} />
                </View>
                <View style={trackDesc}>
                    <View>
                        <Text style={trackTitle}>{track.title}</Text>
                    </View>
                    <View>
                        <Text style={trackSubtitle}>
                            {track.artist || track.album || 'unknown'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={progrsBarSection}>
                <Text>{AppPlayer.secondsToHHMMSS(Math.floor(progress.position || 0))}</Text>
                <Slider
                    style={{ width: '70%', height: 40 }}
                    minimumValue={0}
                    maximumValue={track.duration}
                    minimumTrackTintColor="#52527a"
                    maximumTrackTintColor="#52527a"
                    thumbTintColor="#52527a"
                    value={progress.position}
                />
                <Text>{AppPlayer.secondsToHHMMSS(track.duration || 0)}</Text>
            </View>
            <View style={buttonsSection}>
                <View style={[buttonsCol, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity onPress={() => onNextPrevPress('prev')} style={playPauseButton}>
                        <View style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}>
                            <Image source={prevIcon} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={buttonsCol}>
                    <TouchableOpacity onPress={onPlayPausePress} style={playPauseButton}>
                        <View style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}>
                            <Image source={playOrPauseIcon} style={{ width: 28, height: 28 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[buttonsCol, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity onPress={() => onNextPrevPress('next')} style={playPauseButton}>
                        <View style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}>
                            <Image source={nextIcon} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const { scale, moderateScale, verticalScale } = scaling;

const flexStyles: any = {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
};

const circleStyle: any = (heightWidth: number) => ({
    borderRadius: heightWidth / 2,
    width: moderateScale(heightWidth),
    height: moderateScale(heightWidth),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const styles = StyleSheet.create({
    playerMaxView: {
        ...flexStyles,
        backgroundColor: '#5a6ac7',
        paddingHorizontal: 5,
        // height: verticalScale(300),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
    },
    topSection: {
        ...flexStyles,
        flex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        flexDirection: 'row', // Added flexDirection
    },
    progrsBarSection: {
        ...flexStyles,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonsSection: {
        ...flexStyles,
        flex: 2,
        flexDirection: 'row',
    },
    buttonsCol: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: scale(10),
    },
    playPauseButton: {
        ...circleStyle(60),
        backgroundColor: '#52527a5e',
    },
    playPauseIcon: {
        color: '#fff',
    },
    trackArtBox: {
        ...flexStyles,
        flex: 2,
        display: 'flex',
    },
    trackArt: {
        ...circleStyle(90),
        borderWidth: 2,
        left: 15
    },
    trackDesc: {
        ...flexStyles,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#222233',
        // left: 50,
        right: 80,
        bottom: 8
    },
    trackSubtitle: {
        fontSize: scale(12),
        fontWeight: 'bold',
        color: '#222233',
        right: 80,
        bottom: 8
    },
    goBackButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        padding: 10,
        backgroundColor: '#ffffff4c',
        borderRadius: 50,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
});

export default AudioPlayer;