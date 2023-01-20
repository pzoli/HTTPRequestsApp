import AsyncStorage from '@react-native-async-storage/async-storage';

export class SignalStorage {

    public SignalsArray: Array<any> = [];

    constructor() {
        this.SignalsArray = [];
    }

    public init = async () => {
        let stored = await this.getData();
        if (stored != null) {
            this.merge(stored);
        }
    }

    private getData = async (): Promise<Array<any> | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem('@signals');
            if (jsonValue != null) {
                let result = JSON.parse(jsonValue);
                return result;
            }
            return null;
        } catch (e) {
            console.log('Exception occurred:');
            console.log(e);
            return null;
        }
    }

    public storeData = async () => {
        try {
            const jsonValue = JSON.stringify(this.SignalsArray)
            await AsyncStorage.setItem('@signals', jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    public save(signal: { key: number; title: any; uri: any; }) {
        this.SignalsArray.push(signal);
        this.storeData();
    }

    public merge(array: Array<any>): void {
        array.forEach(element => {
            var found = false;
            this.SignalsArray.forEach(signal => {
                if (signal.key == element.key) {
                    found = true;
                }
            });
            if (!found) {
                this.SignalsArray.push(element);
            }
        });
    }

    public getLastKey(): number {
        let result: number = 0;
        this.SignalsArray.forEach(signal => {
            if (signal.key > result) {
                result = signal.key;
            }
        })
        return result;
    }

    public async clear() {
        this.SignalsArray = [];
        await AsyncStorage.removeItem('@signals');
        await this.init();
    }
}

export const store: SignalStorage = new SignalStorage();