import React from 'react';
import { Platform, Button, View, TouchableOpacity, Text } from 'react-native';
import { store } from '../data/SignalStorage';
import { styles } from '../Styles';
import { AndroidScoped, Dirs, FileSystem } from 'react-native-file-access';
import DocumentPicker from 'react-native-document-picker';
import mergeOptions from 'merge-options';

export default function ActionsScreen({ navigation, route }) {

    return (
        <View style={styles.actionButtonContainer}>
            <View style={styles.actionButtonView}>
                <TouchableOpacity style={[{ backgroundColor: '#318ce7' }, styles.pressableStyle]} onPress={() => {
                    navigation.navigate('Details', {
                        title: '',
                        uri: '',
                        saveItem: false,
                    });
                }} >
                    <Text style={styles.titleStyle}>Add Item...</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actionButtonView}>
                <TouchableOpacity style={[{ backgroundColor: '#318ce7' }, styles.pressableStyle]} onPress={async () => {
                    await store.clear();
                    navigation.navigate('HomeScreen', {
                        signals: store.getSignalsArray()
                    });
                }}>
                    <Text style={styles.titleStyle}>Clean</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actionButtonView}>
                <TouchableOpacity style={[{ backgroundColor: '#318ce7' }, styles.pressableStyle]} onPress={async () => {
                    await DocumentPicker.pickSingle(/*{ type: 'application/json' }*/).then((pickerResult) => {
                        console.log(pickerResult);
                        const importFileName = Dirs.DocumentDir + '/signals.json';
                        FileSystem.cp(pickerResult.uri, importFileName).then(() => {
                            console.log('File copy ready.');
                            FileSystem.readFile(importFileName).then((text) => {
                                console.log(`${importFileName} file content: ${text}`);
                                const importedSignals = JSON.parse(text);
                                store.merge(importedSignals);
                                store.storeData().then(() => {
                                    store.init().then(() => {
                                        navigation.navigate('HomeScreen', {
                                            signals: store.getSignalsArray()
                                        });
                                    });
                                });
                            });
                        })
                    }).catch((e) => {
                        console.log('Rejected!');
                    });
                }}>
                    <Text style={styles.titleStyle}>Import</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actionButtonView}>
                <TouchableOpacity style={[{ backgroundColor: '#318ce7' }, styles.pressableStyle]} onPress={async () => {
                    await DocumentPicker.pickDirectory().then((pickerResult) => {
                        if (pickerResult != null) {
                            const savedFileName = Dirs.DocumentDir + '/signals.json';
                            console.log(savedFileName);
                            FileSystem.writeFile(savedFileName, JSON.stringify(store.getSignalsArray(), undefined, 4)).then((e) => {
                                // Check target OS
                                let path: string;
                                if (Platform.OS == 'android') {
                                    path = AndroidScoped.appendPath(pickerResult.uri, 'signals.json');
                                } else {
                                    path = pickerResult.uri + '/signals.json';
                                }
                                FileSystem.cp(savedFileName, path).then(() => {
                                    FileSystem.unlink(savedFileName);
                                });
                            });
                        }
                    }).catch((e) => {
                        console.log('Rejected!');
                    });
                }}>
                    <Text style={styles.titleStyle}>Export</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}