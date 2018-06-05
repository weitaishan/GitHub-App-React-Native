
export default class ArrayUtils{

    /*
    * 更新数组，若item已存在则从数组中移除将它移除，否则添加进数组
    * */
    static updateArray(array,item){

        for(var i = 0, len = array.length; i < len; i ++){

            var temp=array[i];
            if (temp === item){

                array.splice(i,1);
                return;
            }

        }

        array.push(item);
    }

    /*
    * 克隆一个数组
    * */
    static clone(from){
        if (!from) return [];
        let newArray = [];
        for(let i = 0, len = from.length; i < len; i ++){

            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组元素是否一一对应
     * 数组长度相等且元素对应相等
     * */
    static isEqual(arr1,arr2){

        if (!(arr1 && arr2)) return false;

        if (arr1.length !== arr2.length) return false;

        for (let i = 0; i < arr2.length; i ++){

            if  (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }
}