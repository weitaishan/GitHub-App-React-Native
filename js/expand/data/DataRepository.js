import {

    AsyncStorage,

} from 'react-native'

export default class DataRepository {

    fetchRepository(url) {

        return new Promise((resolve, reject) => {

            //获取本地的数据
            this.fetchLoaclRepository(url)
                .then(result => {

                    if (result) {

                        resolve(result);
                    } else {

                        this.fetchNetRepository(url)
                            .then(result => {

                                resolve(result);
                            })
                            .catch(e => {

                                reject(e);
                            })
                    }

                })
                .catch(e => {

                    this.fetchNetRepository(url)
                        .then(result => {

                            resolve(result);
                        })
                        .catch(e => {

                            reject(e);
                        })

                })
        })
    }

    /**
     * 获取本地数据
     * */
    fetchLoaclRepository(url) {

        return new Promise((resolve, reject) => {

            AsyncStorage.getItem(url, (error, result) => {

                if (!error) {

                    try {

                        resolve(JSON.parse(result));

                    } catch (e) {
                        reject(e);
                    }
                } else {

                    reject(error);
                }
            })

        })
    }

    fetchNetRepository(url) {

        return new Promise((resolve, reject) => {

            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if (!result){

                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result.items);
                    this.saveRepository(url,result.items);

                })
                .catch(error => {

                    reject(error);
                })
        })
    }


    saveRepository(url, items, callBack) {

        if (!url || !item) return;
        let wrapData = {items:items, update_data: new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }

    /**
     * 判断数据是否过时
     * @param longTime 数据时间戳
     * */
    checkData(longTime) {

        return false;
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDate() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;

    }
}