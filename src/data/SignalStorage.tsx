import AsyncStorage from '@react-native-async-storage/async-storage';

export class SignalStorage {

    private SignalsArray: Array<{ key: number; title: string; uri: string }> = [];

    constructor() {
        this.SignalsArray = new Array<{ key: number; title: string; uri: string }>();
    }

    public getSignalsArray(): Array<{ key: number; title: string; uri: string }> {
        return this.SignalsArray;
    }

    public init = async () => {
        let stored = await this.getData();
        if (stored != null) {
            this.merge(stored);
        }
    }

    public getElementById(key: number): { key: number; title: string; uri: string } | undefined {
        return this.SignalsArray.find((element) => element.key == key);;
    }

    public getElementIndexById(key: number): number {
        return this.SignalsArray.findIndex((element) => element.key == key);
    }

    public async updateOrAppendElement(element: { key: number; title: string; uri: string }) {
        let index = this.getElementIndexById(element.key);
        if (index > -1) {
            this.SignalsArray[index] = element;
        } else {
            this.SignalsArray = [...this.SignalsArray, element];
        }
        await this.storeData();
    }

    public removeElement(key: number) {
        let updatedArray = this.SignalsArray.filter((element) =>
            element.key !== key
        );
        this.SignalsArray = updatedArray;
    }

    private getData = async (): Promise<Array<{ key: number; title: string; uri: string }> | null> => {
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