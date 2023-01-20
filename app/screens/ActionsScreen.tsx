import React from 'react';
import { Platform, Button, View } from 'react-native';
import { store } from '../data/SignalSorage';
import { styles } from '../Styles';
import { AndroidScoped, Dirs, FileSystem } from 'react-native-file-access';
import DocumentPicker from 'react-native-document-picker';
import mergeOptions from 'merge-options';

export default function ActionsScreen({ navigation, route }) {

    return (
        <View style={styles.actionButtonContainer}>
            <View style={styles.actionButtonView}>
                <Button title='Add Item...' onPress={() => {
                    navigation.navigate('Details', {
                        title: '',
                        uri: '',
                        saveItem: false,
                    });
                }} />
            </View>
            <View style={styles.actionButtonView}>
                <Button title='Clean...' onPress={async () => {
                    await store.clear();
                    navigation.navigate('HomeScreen', {
                        signals: store.SignalsArray
                    });
                }} />
            </View>
            <View style={styles.actionButtonView}>
                <Button title='Import' onPress={async () => {
                    await DocumentPicker.pickSingle({ type: 'application/json' }).then((pickerResult) => {
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
                                            signals: store.SignalsArray
                                        });
                                    });
                                });
                            });
                        })
                    }).catch((e) => {
                        console.log('Rejected!');
                    });
                }} />
            </View>
            <View style={styles.actionButtonView}>
                <Button title='Export' onPress={async () => {
                    await DocumentPicker.pickDirectory().then((pickerResult) => {
                        if (pickerResult != null) {
                            const savedFileName = Dirs.DocumentDir + '/signals.json';
                            console.log(savedFileName);
                            FileSystem.writeFile(savedFileName, JSON.stringify(store.SignalsArray, undefined, 4)).then((e) => {
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
                }} />
            </View>
        </View>
    );
}