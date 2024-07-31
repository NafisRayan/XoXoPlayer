import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        display: 'flex',
        backgroundColor: 'black',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27274b',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d1d1e0',
    },
    content: {
        flex: 8,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#091d3b',
    },
});

export default styles;