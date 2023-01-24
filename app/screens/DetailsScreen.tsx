import React, { useState, useEffect } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../Styles';
import { store } from '../data/SignalStorage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DetailsScreen({ navigation, route }) {
    //console.log(`Route title:${route.params.title}`);
    //console.log(`Route uri:${route.params.uri}`);

    const [title, setTitle] = useState(route.params.title);
    const [uri, setUri] = useState(route.params.uri);
    const [key, setKey] = useState(route.params.key);

    useEffect(() => {
        //console.log(`DetailsScreen params - key:${route.params.key},title:${route.params.title}, uri:${route.params.uri}`);
        const unsubscribe = navigation.addListener('focus', () => {
            setTitle(route.params.title);
            setUri(route.params.uri);
            setKey(route.params.key);
        });
        return unsubscribe;
    }, [navigation, route.params.title, route.params.uri, route.params.key]);

    //console.log(`DetailsScreen state - key:${key},title:${title}, uri:${uri}`);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ margin: 15 }}>
                    <Text style={styles.input_title}>Title:</Text>
                    <TextInput placeholderTextColor="#888" style={styles.input} placeholder="enter title here..." onChangeText={(value) => { setTitle(value); }} value={title} />
                </View>
                <View style={{ margin: 15 }}>
                    <Text style={styles.input_title}>Uri:</Text>
                    <TextInput placeholderTextColor="#888" style={styles.input} placeholder="enter signal here..." onChangeText={(value) => { setUri(value); }} value={uri} />
                </View>
                <View style={{ margin: 15 }}>
                    <TouchableOpacity style={[{ backgroundColor: '#318ce7' }, styles.pressableStyle]} onPress={() => {
                        console.log(`key:${key}`)
                        store.updateOrAppendElement({ key: key, title: title, uri: uri }).then(() => {
                            //console.log(`title=${title}, uri=${uri}`);
                            navigation.navigate({
                                name: 'HomeScreen',
                                signals: store.getSignalsArray()
                            });
                        })
                    }}><Text style={styles.titleStyle}>Save element</Text></TouchableOpacity>
                </View>
                <View style={{ margin: 15 }}>
                    <TouchableOpacity style={[{ backgroundColor: '#318ce7' }, styles.pressableStyle]} onPress={() => {
                        navigation.goBack();
                    }}><Text style={styles.titleStyle}>Cancel</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
