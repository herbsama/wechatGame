import regeneratorRuntime from '../../../lib/runtime/runtime';

export default{
    // 移动距离
    touchStartClienX: 0,
    touchStartClientY: 0,
    touchEndClientX: 0,
    touchEndClientY: 0,
    isMultiple: false, // 多手指操作
    init(){
        var value = wx.getStorageSync('data')
        if(value){
            return JSON.parse(value)
        }
        return this.initData()
    },
    //初始化一个随机的二位数组
    initData(){
        let data = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]]
        let randomCount = Math.floor(Math.random() * 16) + 1
        var randomNum = [];
        for(let i = 0; i < randomCount; i++){
            randomNum[i] = Math.floor(Math.random()*16) + 1;  //范围是[1~16]
            for(let j = 0; j < i; j++){
                if(randomNum[i] == randomNum[j]){
                    i--
                }
            }
        }

        let curIndex =  0
        for(let i = 0; i < 3;i++)
        {
            for (let j = 0; j < 3;j++){
                curIndex++
                if(randomNum.indexOf(curIndex) != -1){
                    if(Math.floor(Math.random()*2) + 1 == 1){
                        data[i][j] = 2
                    } else {
                        data[i][j] = 4
                    }
                }
            }
        }
        return data;
    },
    // 随机添加一个值
    randomOnevalue(arr){
        let nullNum =  0
        for(let i = 0; i < 3;i++){
            for (let j = 0; j < 3;j++){
                if (arr[i][j] == null){
                    nullNum += 1
                }
            }
        }
        let newValue =  Math.floor(Math.random() * nullNum) + 1
        nullNum = 0
        for(let i = 0; i <= 3;i++){
            for (let j = 0; j <= 3;j++){
                if (arr[i][j] == null){
                    nullNum += 1
                    if(nullNum == newValue){
                        if(Math.floor(Math.random()*2) + 1 == 1){
                            arr[i][j] = 2
                        } else {
                            arr[i][j] = 4
                        }
                        break
                    }
                }
            }
        }
        return arr
    },
   // 手指触摸动作开始
    touchStart: function(events) {
        // 多指操作
        this.isMultiple = events.touches.length > 1;
        if (this.isMultiple) {
            return;
        }

        var touch = events.touches[0];
        // 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴
        this.touchStartClientX = touch.clientX;
        this.touchStartClientY = touch.clientY;
    },
     // 手指触摸后移动
     touchMove: function(events) {
        var touch = events.touches[0];
        this.touchEndClientX = touch.clientX;
        this.touchEndClientY = touch.clientY;
    },

    // 手指触摸动作结束
    touchEnd: function(olddata, event) {
        var touch = event.changedTouches[0];
        this.touchEndClientX = touch.clientX;
        this.touchEndClientY = touch.clientY;

        if (this.isMultiple) {
            return;
        }
        // 计算手指移动的距离
        var dx = this.touchEndClientX - this.touchStartClientX;
        var absDx = Math.abs(dx);
        var dy = this.touchEndClientY - this.touchStartClientY;
        var absDy = Math.abs(dy);
        if (Math.max(absDx, absDy) > 10) {
            // 计算手指滑动的方向
            // 右：1，左：3，上：0，下：2
            var direction = absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);
            let res = this.updateData(olddata, direction)
            res = this.randomOnevalue(res)
            wx.setStorage({
                "key": "data",
                "data": JSON.stringify(res)               
            })
            return res
        }
    },
    updateData(olddata, direction){
        var newData = [[,,,,],[,,,,],[,,,,],[,,,,]]
  
        // 上：0，右：1，下：2，左：3
        if(direction == 0){
            newData = this.moveUp(olddata)
        } else if (direction == 1){
            newData = this.moveRight(olddata)
        } else if (direction == 2){
            newData = this.moveDown(olddata)
        } else if (direction == 3){
            newData =  this.moveLeft(olddata)
        }
        return newData
    },
    moveUp(arr){
        for(let i = 0; i <= 3; i++){
            for(let j=0,k=1; j <= 3; j++){
                for(k = j+1;k<= 3;k++){
                    if(arr[k][i]){
                        if(arr[j][i] && arr[k][i] && arr[j][i] != arr[k][i]){
                            break
                        } 
                        if(arr[j][i] && arr[j][i] == arr[k][i]){
                            arr[j][i] *= 2
                            arr[k][i] = null
                            break
                        } else {
                            arr[j][i] = arr[k][i]
                            arr[k][i] = null
                        }
                    }
                }
            }
        }
        return arr
    },
    moveRight(arr){
        for(let i = 0; i <= 3; i++){
            for(let j=3,k=2; j >= 0; j--){
                for(k = j-1;k >= 0;k--){
                    if(arr[i][k]){
                        if(arr[i][j] && arr[i][k] && arr[i][j] != arr[i][k]){
                            break
                        }
                        if(arr[i][j] && arr[i][j] == arr[i][k]){
                            arr[i][j] *= 2
                            arr[i][k] = null
                            break
                        } else {
                            arr[i][j] = arr[i][k]
                            arr[i][k] = null
                        }
                    }
                }
            }
        }
        return arr
    },
    moveDown(arr){
        for(let i = 0; i <= 3; i++){
            for(let j=3,k=2; j >= 0; j--){
                for(k = j-1;k >= 0; k--){
                    if(arr[k][i]){ 
                        if(arr[j][i] && arr[k][i] && arr[j][i] != arr[k][i]){
                            break
                        } 
                        if(arr[j][i] && arr[j][i] == arr[k][i]){
                            arr[j][i] *= 2
                            arr[k][i] = null
                            break
                        } else {
                            arr[j][i] = arr[k][i]
                            arr[k][i] = null
                        }
                    }
                }
            }
        }
        return arr
    },
    moveLeft(arr){
        for(let i = 0; i <= 3; i++){
            for(let j=0,k=1; j <= 3; j++){
                for(k = j+1;k<= 3;k++){
                    if(arr[i][k]){
                        if(arr[i][j] && arr[i][k] && arr[i][j] != arr[i][k]){
                            break
                        } 
                        if(arr[i][j] && arr[i][j] == arr[i][k]){
                            arr[i][j] *= 2
                            arr[i][k] = null
                            break
                        } else {
                            arr[i][j] = arr[i][k]
                            arr[i][k] = null
                        }
                    }
                }
            }
        }
        return arr
    },
}