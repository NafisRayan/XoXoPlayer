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
import { tracks } from '../serviceTools/tracks';
import scaling from '../serviceTools/scaling';
import AppPlayer from '../serviceTools/AppPlayer';
import AudioPlayer from './AudioPlayer';

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

    const playNextPrev = async (prevOrNext: 'prev' | 'next') => {
        const currentTrackId = await TrackPlayer.getCurrentTrack();
        if (!currentTrackId) return;
        const trkIndex = tracks.findIndex(trk => trk.id === currentTrackId);

        if (prevOrNext === 'next' && trkIndex < tracks.length - 1) {
            onTrackItemPress(tracks[trkIndex + 1]);
        }
        if (prevOrNext === 'prev' && trkIndex > 0) {
            onTrackItemPress(tracks[trkIndex - 1]);
        }
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
                    <AudioPlayer track={selectedTrack} onNextPrevPress={playNextPrev} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default TracksList;
