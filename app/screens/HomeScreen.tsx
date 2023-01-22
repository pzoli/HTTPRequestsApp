import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import MyButton from '../components/MyButton';
import { styles } from '../Styles';
import { store } from '../data/SignalStorage';

export default function HomeScreen({ navigation, route }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await store.init();
        });
        return unsubscribe;
    }, [navigation]);

    if (store.getSignalsArray().length == 0) {
        return (
            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text>List is empty</Text>
            </View>
        );
    } else {
        return (
            <ScrollView>
                <View style={styles.scrollContainer}>
                    {
                        store.getSignalsArray().map((signal) => {
                            return (
                                <View key={signal.key} style={styles.buttonContainer}>
                                    <MyButton
                                        key={signal.key}
                                        uri={signal.uri}
                                        title={signal.title}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}
