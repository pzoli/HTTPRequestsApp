import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
    },
    input: {
        fontSize: 25,
        borderColor: "#888",
        borderWidth: 1,
        borderRadius: 10,
        color: "black",

    },
    input_title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "black",
    },
    scrollContainer: {
        height: '100%',
        color: "black",
    },
    actionButtonContainer: {
        height: '100%',
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    actionButtonView: {
        margin: 20,
    },
    pressableStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 100,
        borderRadius: 10
    },
    titleStyle: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    },
});
