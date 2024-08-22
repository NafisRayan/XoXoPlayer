import React, { ReactNode, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import scaling from '../serviceTools/scaling';
import AppPlayer from '../serviceTools/AppPlayer';
import AudioPlayer from './AudioPlayer';

// Import the JSON data
import tracksData from '../assets/tracks.json';

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
        backgroundColor: '#0F2027',
    },
    itemStyle: {
        marginTop: verticalScale(10),
        paddingHorizontal: scale(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: verticalScale(80),
        borderWidth: 1,
        backgroundColor: '#1F1F1F',
        padding: verticalScale(8),
    },
    albumHeader: {
        marginTop: verticalScale(10),
        paddingHorizontal: scale(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        padding: verticalScale(8),
    },
    albumTitle: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#FFF',
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
        backgroundColor: '#1F1F1F',
        padding: verticalScale(8),
    },
    trackImg: {
        ...circleStyle(50),
        borderColor: '#007AFF',
        borderWidth: 2,
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
        color: '#00FFFF',
    },
    subTitle: {
        fontSize: scale(15),
        color: '#ADD8E6',
    },
    listBox: {
        height: '100%',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
    },
    playerBox: {
        position: 'absolute',
        zIndex: 10,
        height: '50%',
        width: '100%',
        bottom: 0,
        backgroundColor: '#007FFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

const groupTracksByAlbum = (tracks: TrackPlayer.Track[]) => {
    return tracks.reduce((albums: { [key: string]: TrackPlayer.Track[] }, track) => {
        const album = track.album || 'Unknown Album';
        if (!albums[album]) {
            albums[album] = [];
        }
        albums[album].push(track);
        return albums;
    }, {});
};

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
        albumHeader,
        albumTitle,
    } = styles;

    const [selectedTrack, setSelectedTrack] = useState<TrackPlayer.Track | null>(null);
    const [albumVisibility, setAlbumVisibility] = useState<{ [key: string]: boolean }>({});
    const [tracks, setTracks] = useState<TrackPlayer.Track[]>(tracksData);

    useEffect(() => {
        AppPlayer.initializePlayer();
    }, []);

    const onTrackItemPress = async (track: TrackPlayer.Track) => {
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        setSelectedTrack(track);
    };

    const toggleAlbumVisibility = (album: string) => {
        setAlbumVisibility(prev => ({
            ...prev,
            [album]: !prev[album],
        }));
    };

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

    const renderItem = (item: TrackPlayer.Track) => {
        const artImg = item.artwork || `https://picsum.photos/150/200/?random=${Math.random()}`;

        let highlightStyle = {};
        if (selectedTrack && selectedTrack.id === item.id) highlightStyle = { backgroundColor: 'black' };

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
                        <Text style={subTitle}>{item.artist || 'Unknown'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderAlbum = (album: string, tracks: TrackPlayer.Track[]) => {
        const isVisible = albumVisibility[album];
        return (
            <View key={album}>
                <TouchableOpacity onPress={() => toggleAlbumVisibility(album)} style={albumHeader}>
                    <Text style={albumTitle}>{album}</Text>
                    <Text style={albumTitle}>{isVisible ? '-' : '+'}</Text>
                </TouchableOpacity>
                {isVisible && tracks.map(track => renderItem(track))}
            </View>
        );
    };

    const groupedTracks = groupTracksByAlbum(tracks);

    let listBoxStyle = {};
    if (selectedTrack) listBoxStyle = { paddingBottom: verticalScale(320) };

    return (
        <SafeAreaView style={container}>
            <FlatList
                data={Object.keys(groupedTracks).map(album => ({ key: album, value: groupedTracks[album] }))}
                renderItem={({ item }) => renderAlbum(item.key, item.value)}
                keyExtractor={(item) => item.key}
                extraData={groupedTracks}
                contentContainerStyle={{ flexGrow: 1 }}
            />
            {selectedTrack && (
                <View style={playerBox}>
                    <AudioPlayer
                        track={selectedTrack}
                        onNextPrevPress={direction =>
                            direction === 'next' ? playNext() : playPrevious()
                        }
                        onGoBackPress={() => setSelectedTrack(null)}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default TracksList;
