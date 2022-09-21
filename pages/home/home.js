// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图数据列表
        swiperList: []
    },
    // 保留当前页面，跳转到2048页面
    goto2048(){
        wx.navigateTo({
          url: '../components/games/game_2048/game_2048',
        })
    },
    getSwiperList(){
        // wx.request({
        //   url: 'hhtps://www.escook.cn/slides',
        //   method: 'GET',
        //   success: (res)=>{
        //       console.log(res);
        //   }
        // })
        setTimeout(() => {
            this.setData({
                swiperList: [{
                    id:1,img:'图片1'
                },{
                    id:2,img:'图片2'
                },{
                    id:3,img:'图片3'
                },{
                    id:4,img:'图片4'
                }]
            })
        }, 3000);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSwiperList()
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