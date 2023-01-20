import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from '../Styles';
import { store } from '../data/SignalSorage';


export default function DetailsScreen({ navigation, route }) {
    console.log(`Route title:${route.params.title}`);
    console.log(`Route uri:${route.params.uri}`);

    const [title, setTitle] = useState(route.params.title);
    const [uri, setUri] = useState(route.params.uri);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTitle(route.params.title);
            setUri(route.params.uri);
        });
        return unsubscribe;
    }, [navigation]);

    console.log(`DetailsScreen title:${title}, uri:${uri}`);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.input_title}>Title:</Text>
                <TextInput placeholderTextColor="#888" style={styles.input} placeholder="enter title here..." onChangeText={(value) => { setTitle(value); }} value={title} />
            </View>
            <View>
                <Text style={styles.input_title}>Uri:</Text>
                <TextInput placeholderTextColor="#888" style={styles.input} placeholder="enter signal here..." onChangeText={(value) => { setUri(value); }} value={uri} />
            </View>
            <View>
                <Button title='Save element' onPress={() => {
                    store.save({ key: store.getLastKey() + 1, title: title, uri: uri });
                    console.log(`title=${title}, uri=${uri}`);
                    navigation.navigate({
                        name: 'HomeScreen',
                    });
                }} />
            </View>
        </View>
    );
}
