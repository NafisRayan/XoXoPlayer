import React, { ReactNode, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import scaling from '../serviceTools/scaling';
import AppPlayer from '../serviceTools/AppPlayer';
import AudioPlayer from './AudioPlayer';


const tracks: TrackPlayer.Track[] = [
    {
        id: '1',
        url: 'https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3',
        title: 'Keys of moon',
        artist: 'The Epic Hero',
        artwork: 'https://picsum.photos/id/1003/200/300',
        album: '',
        duration: 149,
    },
    {
        id: '2',
        url: 'https://www.chosic.com/wp-content/uploads/2021/07/Raindrops-on-window-sill.mp3',
        title: 'Raindrops on window sill',
        artist: '',
        artwork: 'https://picsum.photos/id/10/200/300',
        album: 'Chosic',
        duration: 119,
    },
    {
        id: '3',
        url: 'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3',
        title: 'Equinox',
        artist: 'Purple Cat',
        artwork: 'https://picsum.photos/id/1016/200/300',
        album: '',
        duration: 140,
    },
    {
        id: '4',
        url: 'https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3',
        title: 'And So It Begins',
        artist: '',
        artwork: 'https://picsum.photos/id/1019/200/300',
        album: 'Artificial Music',
        duration: 208,
    },
    {
        id: '5',
        url: 'https://www.chosic.com/wp-content/uploads/2021/05/inossi-got-you.mp3',
        title: 'Got You',
        artist: '',
        artwork: 'https://picsum.photos/id/103/200/300',
        album: 'INOSSI',
        duration: 178,
    },
    {
        id: '6',
        url: 'https://www.chosic.com/wp-content/uploads/2021/04/kvgarlic__largestreamoverloginforestmarch.mp3',
        title: 'Peaceful water stream',
        artist: '',
        artwork: 'https://picsum.photos/id/1038/200/300',
        album: 'Chosic',
        duration: 66,
    },
];









const { scale, verticalScale } = scaling;

const circleStyle: any = (heightWidth: number) => ({
    borderRadius: heightWidth / 2,
    width: heightWidth,
    height: heightWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        marginTop: verticalScale(10),
        paddingHorizontal: scale(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: verticalScale(80),
        borderBottomColor: '#333',
        borderWidth: 0,
    },
    trackImgBox: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    trackDescBox: {
        flex: 5,
        paddingLeft: scale(10),
        marginLeft: scale(5),
        borderRadius: 5,
        display: 'flex',
    },
    trackImg: {
        ...circleStyle(50),
    },
    titleBox: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginTop: verticalScale(2),
    },
    subTitleBox: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: scale(15),
    },
    listBox: {
        height: '100%',
    },
    playerBox: {
        position: 'absolute',
        zIndex: 10,
        height: '50%',
        width: '100%',
        bottom: 0,
    },
});

const TracksList: () => ReactNode = () => {
    const {
        container,
        itemStyle,
        listBox,
        playerBox,
        subTitle,
        subTitleBox,
        title,
        titleBox,
        trackImg,
        trackImgBox,
        trackDescBox,
    } = styles;

    const [selectedTrack, setSelectedTrack] = useState<TrackPlayer.Track | null>(null);

    useEffect(() => {
        AppPlayer.initializePlayer();
    }, []);

    const onTrackItemPress = async (track: TrackPlayer.Track) => {
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        setSelectedTrack(track);
    };

    // New function to play the next track
    const playNext = async () => {
        const currentIndex = tracks.findIndex(track => track.id === selectedTrack?.id);
        if (currentIndex >= tracks.length - 1) return; // If we're at the end of the list, don't change anything

        const nextTrack = tracks[currentIndex + 1];
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        setSelectedTrack(nextTrack); // Update the selected track
        await TrackPlayer.add(nextTrack); // Add the next track to the queue
        await TrackPlayer.play(); // Play the next track
    };

    // New function to play the previous track
    const playPrevious = async () => {
        const currentIndex = tracks.findIndex(track => track.id === selectedTrack?.id);
        if (currentIndex <= 0) return; // If we're at the beginning of the list, don't change anything

        const prevTrack = tracks[currentIndex - 1];
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        setSelectedTrack(prevTrack); // Update the selected track
        await TrackPlayer.add(prevTrack); // Add the previous track to the queue
        await TrackPlayer.play(); // Play the previous track
    };

    const renderItem: ListRenderItem<TrackPlayer.Track> = ({ item }) => {
        const artImg = item.artwork || `https://picsum.photos/150/200/?random=${Math.random()}`;

        let highlightStyle = {};
        if (selectedTrack && selectedTrack.id === item.id)
            highlightStyle = { backgroundColor: 'black' };

        return (
            <TouchableOpacity
                onPress={() => onTrackItemPress(item)}
                style={[itemStyle, highlightStyle]}>
                <View style={trackImgBox}>
                    <Image style={trackImg} source={{ uri: artImg }} />
                </View>
                <View style={trackDescBox}>
                    <View style={titleBox}>
                        <Text style={title}>{item.title}</Text>
                    </View>
                    <View style={subTitleBox}>
                        <Text style={subTitle}>{item.artist || item.album || 'Unknown'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    let listBoxStyle = {};
    if (selectedTrack) listBoxStyle = { paddingBottom: verticalScale(320) };
    return (
        <SafeAreaView style={container}>
            <View style={[listBox, listBoxStyle]}>
                <FlatList data={tracks} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>
            {selectedTrack && (
                <View style={playerBox}>
                    <AudioPlayer track={selectedTrack} onNextPrevPress={(direction) => direction === 'next' ? playNext() : playPrevious()} onGoBackPress={() => setSelectedTrack(null)} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default TracksList;