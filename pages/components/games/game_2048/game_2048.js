// pages/components/games/game_2048.js
const engin_2048 = require('../../games_engine/engine_2048.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
        curScore: 0,
        bestScore: 0,
        win: false,
        fail: false,
        getPrice: false,
    },
    // 初始化
    init(){
        this.setData({
            data: engin_2048.default.initData(),
            fail: false,
            curScore: 0
        })
    },
    //继续游戏
    continue(){
        this.setData({
            win: false,
        })
    },
     //继续游戏
     continuePrice(){
        this.setData({
            getPrice: false
        })
    },
    touchStart(event){
        engin_2048.default.touchStart(event)
    },
    touchMove(event){
        engin_2048.default.touchMove(event)
    },
    touchEnd(event){
        let res = engin_2048.default.touchEnd(this.data.data,event)
        if (res == null) return
        this.updataView(res)
        this.updataScore(res)
        // 判断是否能继续游戏
        this.judgeFalse(res)
    },
    updataView(res){
        this.setData({
            data: res
        })

    },
    // 判断当前分数和最高分数
    updataScore(arr){
        for(let i =0;i<=3;i++){
            for(let j=0;j<=3;j++){
                if(arr[i][j] && arr[i][j] > this.data.curScore){
                    this.data.curScore = arr[i][j]
                }
            }
        }
        if(this.data.curScore > this.data.bestScore){
            this.data.bestScore = this.data.curScore
        }
        if(this.data.curScore == 2048 && this.data.bestScore < 2048){
            this.setData({
               win: true
            })
        }
        if(this.data.curScore == 4096 && this.data.bestScore < 4096){
            this.setData({
               getPrice: true
            })
        }
        this.setData({
            curScore: this.data.curScore,
            bestScore:  this.data.bestScore
        })
        wx.setStorageSync('score', JSON.stringify({"curScore": this.data.curScore, "bestScore": this.data.bestScore}))
    },
    // 判断是否能继续游戏
    judgeFalse(arr){
        for(let i=0;i<=3;i++){
            for(let j=0;j<=3;j++){
                if(i <=2 && j <=2){
                    if(arr[i][j] == null || arr[i+1][j] == null || arr[i][j+1] == null){
                        return
                    }
                    if(arr[i][j] == arr[i+1][j]|| arr[i][j] == arr[i][j+1]){
                        return
                    }
                }else if (i == 3 && j !=3){
                    if(arr[i][j] == arr[i][j+1]){
                        return
                    }
                }else if (i != 3 && j ==3){
                    if(arr[i][j] == arr[i+1][j]){
                        return
                    }
                }
            }
        }
        

        this.setData({
            fail: true
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let score = wx.getStorageSync('score')
        if(score){
            score = JSON.parse(score)
            this.setData({
                curScore: score.curScore,
                bestScore:  score.bestScore
            })
        }
        this.setData({
            data: engin_2048.default.init()
        }) 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})