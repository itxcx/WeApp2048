// var startX = 0,
// var startY = 0;
// var endX = 0;
// var endY = 0;
// // 开始的位置
//     startPos : {};
//     // 结束的位置
//     endPos : {};

// 最小点击事件
var slidetime = 50;
var direction = 0;
//var motto = "无";
var toast1Hidden = true;
// 标示当前游戏是否已经结束
var isGameOver = false;

// 界面布局格子的数据对象
var chessBoard = [ [ "0", "0", "0", "0" ], [ "0", "0", "0", "0" ], [ "0", "0", "0", "0" ], [ "0", "0", "0", "0" ] ];

/**
 * 修改制定坐标的各自数值
 * 
 */
var changeData = function( x, y, num ) {

    if( isNaN( num ) ) {
        num = 0;
    }

    chessBoard[ x ][ y ] = Number( num );
};




/**
 * 获取二倍的随机数的函数实现
 */
var twoRondowm = function() {
    // 上限是3
    var posX = parseInt( Math.random() * 3 + 1 );
    var posY = parseInt( Math.random() * 3 + 1 );
    var num = Math.random() > 0.7 ? 4 : 2;

    changeData( posY, posY, num );
};

/**
 * 随机添加数据
 */
var randomAdd = function() {

    var arr = new Array();

    // 遍历棋盘，讲所有当前为 0 的棋子筛选到一个新的集合，并对其进行随机算法，获取到位置。
    for( var i = 0;i < chessBoard.length;i++ ) {
        for( var j = 0;j < chessBoard[ i ].length;j++ ) {
            if( chessBoard[ i ][ j ] == 0 ) {
                // 如果为空，则添加至指定队列
                var pos = new Object();
                pos.x = i;
                pos.y = j;
                arr.push( pos );
            }
        }
    }

    console.log( "arr  === " + arr.length );
    if( arr.length <= 0 ) {
        // 所有的格子都被填满了。
        return false;
    } else if( arr.length == 1 ) {
        var pos = arr[ 0 ];
        var num = Math.random() > 0.7 ? 4 : 2;
        changeData( pos.x, pos.y, num );

        return true;
    }
    else {
        var posNum = parseInt( Math.random() * ( arr.length - 1 ) + 1 );

        var pos = arr[ posNum ];
        var num = Math.random() > 0.7 ? 4 : 2;

        changeData( pos.x, pos.y, num );
        //chessBoard[ pos.x ][ pos.y ] = num;

        return true;
    }

};


var animation = wx.createAnimation( {
    transformOrigin: "50% 50%",
    duration: 2000,

    timingFunction: "ease",
    delay: 0
})



/**
 * 根据方向进行运算
 */
var calcChangeData = function( direction ) {

    console.log( "direction + " + direction );


    if( direction == "l" ) {
        // left 向左滑动，则从最左侧开始清算
        for( var i = 0;i < chessBoard.length;i++ ) {
            for( var j = 0;j < chessBoard[ i ].length;j++ ) {

                // // 进行继续清算
                if( j == 0 ) {
                    // 最左侧的一排不清算
                }
                else {
                    var nowValue = chessBoard[ i ][ j ];


                    if( nowValue == 0 ) {
                        continue;
                    }
                    var leftValue = chessBoard[ i ][ j - 1 ];

                    if( leftValue == 0 ) {
                        // 如果数据为0，则直接进滚动
                        // 进入滚动模式，需要进行连续判断

                        for( var k = j - 1;k >= 0;k-- ) {

                            var leftTmpValue = chessBoard[ i ][ k ];

                            // 向左平移一个单位
                            if( leftTmpValue == 0 ) {
                                changeData( i, k, nowValue );
                                changeData( i, k + 1, 0 );
                            } else if( leftTmpValue == nowValue ) {
                                changeData( i, k, nowValue * 2 );
                                changeData( i, k + 1, 0 );
                            }

                        }


                    } else if( nowValue == leftValue ) {
                        // 那么直接合并
                        var rightValue = nowValue * 2;
                        changeData( i, j, 0 );
                        changeData( i, j - 1, rightValue );
                    } else {
                        // 即不相等也不为0 ， 则不作处理
                    }
                }
            }
        }

    } else if( direction == "r" ) {
        // right

        // 对二维数组进行遍历
        for( var i = chessBoard.length - 1;i >= 0;i-- ) {
            for( var j = chessBoard[ i ].length - 1;j >= 0;j-- ) {

                // // 进行继续清算
                if( j == chessBoard[ i ].length - 1 ) {
                    // 最右侧的一排不清算
                }
                else {
                    // 当前数据
                    var nowValue = chessBoard[ i ][ j ];
                    if( nowValue == 0 ) {
                        continue;
                    }
                    // 下一个将进行结算的格子数据
                    var leftValue = chessBoard[ i ][ j + 1 ];

                    if( leftValue == 0 ) {
                        // 如果数据为0，则直接进滚动
                        // 进入滚动模式，需要进行连续判断
                        for( var k = j + 1;k < chessBoard[ i ].length;k++ ) {

                            var leftTmpValue = chessBoard[ i ][ k ];
                            if( leftTmpValue == 0 ) {
                                changeData( i, k, nowValue );
                                changeData( i, k - 1, 0 );
                            } else if( leftTmpValue == nowValue ) {
                                changeData( i, k, nowValue * 2 );
                                changeData( i, k - 1, 0 );

                                //break;
                            }
                        }

                        //var rightValue = chessBoard[ i ][ j ];
                        //changeData( i, j + 1, rightValue );
                    } else if( nowValue == leftValue ) {
                        // 那么直接合并
                        var rightValue = nowValue * 2;
                        changeData( i, j, 0 );
                        changeData( i, j + 1, rightValue );
                    } else {
                        // 即不相等也不为0 ， 则不作处理
                    }
                }
            }
        }


    } else if( direction == "u" ) {


        // up
        for( var i = 0;i < chessBoard.length;i++ ) {
            for( var j = 0;j < chessBoard[ i ].length;j++ ) {


                // // 进行继续清算
                if( i == 0 ) {
                    // 最上侧的一排不清算
                }
                else {
                    var nowValue = chessBoard[ i ][ j ];
                    if( nowValue == 0 ) {
                        continue;
                    }

                    var leftValue = chessBoard[ i - 1 ][ j ];
                    if( leftValue == 0 ) {
                        // 如果数据为0，则直接进滚动
                        for( var k = i - 1;k >= 0;k-- ) {

                            if( chessBoard[ k ][ j ] == 0 ) {
                                changeData( k, j, nowValue );
                                changeData( k + 1, j, 0 );
                            } else if( chessBoard[ k ][ j ] == nowValue ) {
                                changeData( k, j, nowValue * 2 );
                                changeData( k + 1, j, 0 );
                            }
                        }

                    } else if( nowValue == leftValue ) {
                        // 那么直接合并
                        var rightValue = nowValue * 2;
                        changeData( i, j, 0 );
                        changeData( i - 1, j, rightValue );
                    } else {
                        // 即不相等也不为0 ， 则不作处理
                    }
                }
            }
        }


    } else if( direction == "d" ) {
        // down
        for( var i = chessBoard.length - 1;i >= 0;i-- ) {
            for( var j = chessBoard[ i ].length - 1;j >= 0;j-- ) {

                // // 进行继续清算
                if( i == chessBoard.length - 1 ) {
                    // 最上侧的一排不清算
                } else {
                    var nowValue = chessBoard[ i ][ j ];

                    if( nowValue == 0 ) {
                        continue;
                    }

                    var leftValue = chessBoard[ i + 1 ][ j ];

                    if( leftValue == 0 ) {


                        // 如果数据为0，则直接进滚动
                        for( var k = i + 1;k < chessBoard.length;k++ ) {

                            if( chessBoard[ k ][ j ] == 0 ) {
                                changeData( k, j, nowValue );
                                changeData( k - 1, j, 0 );
                            } else if( chessBoard[ k ][ j ] == nowValue ) {
                                changeData( k, j, nowValue * 2 );
                                changeData( k - 1, j, 0 );
                            }

                        }


                        // changeData( i - 1, j, nowValue );
                        // changeData( i , j, 0 );
                    } else if( nowValue == leftValue ) {
                        // 那么直接合并
                        var rightValue = nowValue * 2;
                        changeData( i, j, 0 );
                        changeData( i - 1, j, rightValue );
                    } else {
                        // 即不相等也不为0 ， 则不作处理
                    }
                }
            }
        }

    }


    // var result = randomAdd();
    // if(result){
    // }
    // console.log("result  === " + result);

    if( randomAdd() ) {
        // 增加新的随机数块成功
        toast1Hidden = true;
    } else {
        // 增加新的随机数块失败，说明当前棋盘已经被填满，则进行给出提示
        isGameOver = true;
        //motto = "游戏失败~";
        toast1Hidden = false;
    }



}

/**
 * 用来设置页面对话的函数实现
 */
var pageObject = {


    modalChange: function( event ) {

        // 游戏状态打开为激活
        isGameOver = false;
        // 隐藏当前model
        toast1Hidden = true;
        // 充值棋盘数据，并且更新界面
        for( var i = 0;i < chessBoard.length;i++ ) {
            chessBoard[ i ].fill( 0 );
        }
        // 生成随机的开局
        twoRondowm();
        // 更新页面

        var changedData = {};
        changedData[ 'chessBoard' ] = chessBoard;
        changedData[ 'toast1Hidden' ] = toast1Hidden;
        this.setData( changedData );

    },





    start: function( event ) {

        // 游戏已经失败，除非正常开始，则不接受任何移动事件
        if( isGameOver ) {
            return;
        }

        // 开始点击
        var touch = event.touches[ 0 ];
        startPos = { x: touch.pageX, y: touch.pageY, time: new Date() }; //取第一个touch的坐标值
        direction = 0;
        //console.log( "aaa" + startPos.x );
    },

    move: function( event ) {
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作


        // 游戏已经失败，除非正常开始，则不接受任何移动事件
        if( isGameOver ) {
            return;
        }

        if( event.touches.length > 1 || event.scale && event.scale !== 1 ) {
            return;
        }

        // 如果等于1
        if( event.touches.length == 1 ) {
            var time = new Date() - startPos.time;
            //console.log("time"  + time);
            if( time >= slidetime && direction == 0 ) {
                // 对比两次x
                var touch = event.touches[ 0 ];

                var x = touch.pageX - startPos.x;
                var y = touch.pageY - startPos.y;

                if( Math.abs( x ) > Math.abs( y ) ) { //左右
                    if( x > 0 ) { //右
                        direction = 'r';
                    } else { //左
                        direction = 'l';
                    }
                } else { //上下
                    if( y > 0 ) {
                        direction = 'd';
                    } else {
                        direction = 'u';
                    }
                }
                //console.log( "direction" + direction );
            }
        }
    },

    end: function( event ) {

        // 游戏已经失败，除非正常开始，则不接受任何移动事件
        if( isGameOver ) {
            return;
        }


        //var touch = event.touches[0];
        //endPos = { x:touch.pageX, y:touch.pageY, time:new Date() }; //取第一个touch的坐标值
        // touch事件结束
        //console.log("bbb"  + event.touches.length);
        if( direction == 'l' ) {
            // left

        } else if( direction == 'r' ) {
            // right

        } else if( direction == 'u' ) {
            // up

        } else if( direction == 'd' ) {
            // down

        }

        calcChangeData( direction );


        //twoRondowm();
        var changedData = {};
        //changedData[ 'motto' ] = motto;
        changedData[ 'chessBoard' ] = chessBoard;
        changedData[ 'toast1Hidden' ] = toast1Hidden;


        console.log( "chessBoard  === " + chessBoard );

        this.setData( changedData );
    },


    onReady: function() {
        console.log( 'onReady' )
        twoRondowm();

    },

    onLoad: function() {
        console.log( 'onLoad' )

        var changedData = {};
        changedData[ 'toast1Hidden' ] = toast1Hidden;
        this.setData( changedData );
    },




}





// 装载页面数据对象
Page( pageObject )



