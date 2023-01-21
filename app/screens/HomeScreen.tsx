import React from 'react';
import { View, ScrollView } from 'react-native';
import MyButton from '../components/MyButton';
import { styles } from '../Styles';
import { store } from '../data/SignalSorage';

export default function HomeScreen({ navigation, route }) {

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
