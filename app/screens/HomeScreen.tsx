import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Button, Pressable, Image } from 'react-native';
import MyButton from '../components/MyButton';
import { styles } from '../Styles';
import { store } from '../data/SignalStorage';
import { StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, route }) {

    const [signals, setSignals] = useState(route.params.signals);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState(Array<number>);

    const updateSelection = (key: number) => {
        let updatedButtons: Array<number>;
        if (selectedButtons.indexOf(key) == -1) {
            updatedButtons = [...selectedButtons, key];
        } else {
            updatedButtons = selectedButtons.filter((element) => key !== element);
        }
        setSelectedButtons(updatedButtons);
    }

    const getSelection = (key: number) => {
        return selectedButtons.findIndex((item) => key == item) > -1;
    }

    const deleteSelections = () => {
        selectedButtons.forEach(key => {
            store.removeElement(key);
        })
        store.storeData().then(() => {
            setSelectMode(false);
            setSignals(store.getSignalsArray());
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelectMode(false);
            setSignals(store.getSignalsArray());
        });
        return unsubscribe;
    }, [navigation]);


    if (signals.length == 0) {
        return (
            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text>List is empty</Text>
            </View>
        );
    } else {
        return (
            <ScrollView>
                {
                    selectMode ?
                        <View style={{ flexDirection: 'row' }}>
                            <View style={homeStyles.actionView}>
                                <TouchableOpacity style={homeStyles.actionTouchableStyle} onPress={() => { setSelectMode(false) }}>
                                    <Text style={homeStyles.actionText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={homeStyles.actionView}>
                                <TouchableOpacity style={homeStyles.actionTouchableStyle} onPress={deleteSelections}>
                                    <Text style={homeStyles.actionText} >Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null
                }

                <View style={styles.scrollContainer}>
                    {
                        signals.map((signal) => {
                            return (
                                <View key={signal.key} style={selectMode ? styles.buttonContainerInSelectMode : styles.buttonContainer}>
                                    <MyButton
                                        key={signal.key}
                                        uri={signal.uri}
                                        title={signal.title}
                                        selectMode={selectMode}
                                        onLongPress={() => { setSelectedButtons([signal.key]); setSelectMode(true) }}
                                        onPress={() => { selectMode ? updateSelection(signal.key) : null }}
                                        selected={getSelection(signal.key)}
                                    />
                                    {selectMode ?
                                        <Pressable style={{ height: '50%', alignContent: 'center', justifyContent: 'center' }} onPress={() => {
                                            navigation.navigate('Details', {
                                                title: signal.title,
                                                uri: signal.uri,
                                                key: signal.key
                                            });
                                        }}>
                                            <Image source={require('../assets/edit.png')} style={{ width: 50, height: 50 }} />
                                        </Pressable>
                                        : null
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

const homeStyles = StyleSheet.create({
    actionView: {
        width: '50%',
        margin: 10
    },
    actionTouchableStyle: {
        backgroundColor: '#318ce7',
    },
    actionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
    }
})