;(function (name, definition) {
    var hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) {
        define(definition);
    } else if (hasExports) {
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('MeScroll', function () {
    function MeScroll(mescrollId, options) {
        this.scrollDom = document.getElementById(mescrollId);
        this.options = options || {};

        this.isDownScrolling = false;
        this.isUpScrolling = false;


        this.initDownScroll();
        this.initUpScroll();


        var me = this;
        setTimeout(function() {
            if(me.optDown.auto) {
                if(me.optDown.autoShowLoading) {
                    me.triggerDownScroll();
                } else {
                    me.optDown.callback && me.optDown.callback(me);
                }
            }

            me.optUp.auto && me.triggerUpScroll();
        }, 30);
    }
    MeScroll.prototype.extendDownScroll = function(optDown) {
        var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        MeScroll.extend(optDown, {
            use: true,
            auto: true,
            autoShowLoading: false,
            isLock: false,
            isBoth: false,
            offset: 80,
            outOffsetRate: 0.2,
            minAngle: 45,
            mustToTop: !isIOS,
            hardwareClass: "mescroll-hardware",
            warpClass: "mescroll-downwarp",
            resetClass: "mescroll-downwarp-reset",
            htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip"> </p>',
            inited: function(mescroll, downwarp) {
                mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
                mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
            },
            inOffset: function(mescroll) {
                if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "涓嬫媺鍒锋柊";
                if(mescroll.downProgressDom) mescroll.downProgressDom.classList.remove("mescroll-rotate");
            },
            outOffset: function(mescroll) {
                if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "閲婃斁鏇存柊";
            },
            onMoving: function(mescroll, rate, downHight) {
                if(mescroll.downProgressDom) {
                    var progress = 360 * rate;
                    mescroll.downProgressDom.style.webkitTransform = "rotate(" + progress + "deg)";
                    mescroll.downProgressDom.style.transform = "rotate(" + progress + "deg)";
                }
            },
            beforeLoading: function(mescroll, downwarp) {
                return false;
            },
            showLoading: function(mescroll) {
                if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "鍔犺浇涓� ...";
                if(mescroll.downProgressDom) mescroll.downProgressDom.classList.add("mescroll-rotate");
            },
            callback: function(mescroll) {
                mescroll.resetUpScroll();
            }
        })
    }

    /*閰嶇疆鍙傛暟:涓婃媺鍔犺浇*/
    MeScroll.prototype.extendUpScroll = function(optUp) {
        var isPC = typeof window.orientation == 'undefined' ;
        MeScroll.extend(optUp, {
            use: true,
            auto: false,
            isLock: false,
            isBoth: false,
            callback: null,
            page: {
                num: 0,
                size: 6,
                time: null
            },
            noMoreSize: 5,
            offset: 100,
            toTop: {

                src: null,
                offset: 1000,
                warpClass: "mescroll-totop",
                showClass: "mescroll-fade-in",
                hideClass: "mescroll-fade-out",
                duration: 300
            },
            loadFull: {
                use: false,
                delay: 500
            },
            empty: {

                warpId: null,
                icon: null,
                tip: "鏆傛棤鐩稿叧鏁版嵁~",
                btntext: "",
                btnClick: null
            },
            clearId: null,
            clearEmptyId: null,
            hardwareClass: "mescroll-hardware",
            warpClass: "mescroll-upwarp",
            inited: function(mescroll, upwarp) {

            },
            showLoading: function(mescroll, upwarp) {
                upwarp.innerHTML = mescroll.optUp.htmlLoading;
            },
            showNoMore: function(mescroll, upwarp) {
                upwarp.innerHTML = mescroll.optUp.htmlNodata;
            },
            onScroll: null,
            scrollbar: {
                use: isPC,
                barClass: "mescroll-bar"
            }
        })
    }

    /*閰嶇疆鍙傛暟*/
    MeScroll.extend = function(userOption, defaultOption) {
        if(!userOption) return defaultOption;
        for(key in defaultOption) {
            if(userOption[key] == null) {
                userOption[key] = defaultOption[key];
            } else if(typeof userOption[key] == "object") {
                MeScroll.extend(userOption[key], defaultOption[key]);
            }
        }
        return userOption;
    }

    /*-------鍒濆鍖栦笅鎷夊埛鏂�-------*/
    MeScroll.prototype.initDownScroll = function() {
        var me = this;


        me.optDown = me.options.down || {};

        if(me.optDown.use == false) return;

        me.extendDownScroll(me.optDown);

        me.downwarp = document.createElement("div");
        me.downwarp.className = me.optDown.warpClass;
        me.downwarp.innerHTML = '<div class="downwarp-content">' + me.optDown.htmlContent + '</div>';
        me.scrollDom.insertBefore(me.downwarp, me.scrollDom.firstChild);

        me.scrollDom.addEventListener("touchstart", touchstartEvent);
        me.scrollDom.addEventListener("mousedown", touchstartEvent);
        function touchstartEvent(e) {
            if(me.isScrollTo) e.preventDefault();
            me.startTop = me.scrollDom.scrollTop;
            if(me.optDown.mustToTop) {
                me.startY = e.touches ? e.touches[0].pageY : e.clientY;
            }
        }

        me.scrollDom.addEventListener("touchmove", touchmoveEvent);
        me.scrollDom.addEventListener("mousemove", touchmoveEvent);
        function touchmoveEvent(e) {
            if(me.startTop != null && me.scrollDom.scrollTop <= 0 && !me.isDownScrolling && (!me.isUpScrolling || (me.isUpScrolling && me.optUp.isBoth)) && !me.optDown.isLock) {

                if(me.optDown.mustToTop && me.startTop > 0) return;

                var curX = e.touches ? e.touches[0].pageX : e.clientX;
                var curY = e.touches ? e.touches[0].pageY : e.clientY;

                if(!me.preX) me.preX = curX;
                if(!me.preY) me.preY = curY;

                var x = Math.abs(me.preX - curX);
                var y = Math.abs(me.preY - curY);
                var z = Math.sqrt(x*x + y*y);

                var diff = curY - me.preY;
                me.preX = curX;
                me.preY = curY;

                if(z!=0){
                    var angle=Math.asin(y / z) / Math.PI*180;
                    if(angle < me.optDown.minAngle) return;
                }

                if(!me.startY && !me.optDown.mustToTop) me.startY = curY;
                var moveY = curY - me.startY;

                if(moveY > 0) {
                    e.preventDefault();
                    if(!me.downHight) me.downHight = 0;
                    if(me.downHight < me.optDown.offset) {
                        if(me.movetype != 1) {
                            me.movetype = 1;
                            me.optDown.inOffset(me);
                            me.downwarp.classList.remove(me.optDown.resetClass);
                            me.scrollDom.classList.add(me.optDown.hardwareClass);
                            me.scrollDom.style.webkitOverflowScrolling = "auto";
                            me.isMoveDown = true;
                        }
                        me.downHight += diff;

                    } else {
                        if(me.movetype != 2) {
                            me.movetype = 2;
                            me.optDown.outOffset(me);
                            me.downwarp.classList.remove(me.optDown.resetClass);
                            me.scrollDom.classList.add(me.optDown.hardwareClass);
                            me.scrollDom.style.webkitOverflowScrolling = "auto";
                            me.isMoveDown = true;
                        }
                        if(diff > 0) {
                            me.downHight += diff * me.optDown.outOffsetRate;
                        } else {
                            me.downHight += diff;
                        }
                    }

                    me.downwarp.style.height = me.downHight + "px";
                    var rate = me.downHight / me.optDown.offset;
                    me.optDown.onMoving(me, rate, me.downHight);
                }
            }
        }

        me.scrollDom.addEventListener("touchend", touchendEvent); //绉诲姩绔墜鎸囦簨浠�
        me.scrollDom.addEventListener("mouseup", touchendEvent); //PC绔紶鏍囨姮璧蜂簨浠�
        me.scrollDom.addEventListener("mouseleave", touchendEvent); //PC绔紶鏍囩寮€浜嬩欢
        function touchendEvent(e) {
            if(me.isMoveDown) {
                if(me.downHight >= me.optDown.offset) {
                    me.triggerDownScroll();
                } else {
                    me.downwarp.classList.add(me.optDown.resetClass); //鍔犲叆楂樺害閲嶇疆鐨勫姩鐢�,杩囨浮骞虫粦
                    me.downHight = 0;
                    me.downwarp.style.height = 0;
                }
                me.scrollDom.style.webkitOverflowScrolling = "touch";
                me.scrollDom.classList.remove(me.optDown.hardwareClass);
                me.movetype = 0;
                me.isMoveDown = false;
            }
            me.startY = 0;
            me.preX = 0;
            me.preY = 0;
            me.startTop = null;
        }

        setTimeout(function() { //寰呬富绾跨▼鎵ц瀹屾瘯鍐嶆墽琛�,閬垮厤new MeScroll鏈垵濮嬪寲,鍦ㄥ洖璋冭幏鍙栦笉鍒癿escroll鐨勫疄渚�
            me.optDown.inited(me, me.downwarp);
        }, 0)
    }

    MeScroll.prototype.triggerDownScroll = function() {
        if(!this.optDown.beforeLoading(this, this.downwarp)) { //鍑嗗瑙﹀彂涓嬫媺鐨勫洖璋�,return true鍒欏浜庡畬鍏ㄨ嚜瀹氫箟鐘舵€�;榛樿return false;
            this.showDownScroll(); //涓嬫媺鍒锋柊涓�...
            this.optDown.callback && this.optDown.callback(this); //鎵ц鍥炶皟,鑱旂綉鍔犺浇鏁版嵁
        }
    }
    MeScroll.prototype.showDownScroll = function() {
        this.isDownScrolling = true; //鏍囪涓嬫媺涓�
        this.optDown.showLoading(this); //涓嬫媺鍒锋柊涓�...
        this.downHight = this.optDown.offset; //鏇存柊涓嬫媺鍖哄煙楂樺害
        this.downwarp.classList.add(this.optDown.resetClass); //鍔犲叆楂樺害閲嶇疆鐨勫姩鐢�,杩囨浮骞虫粦
        this.downwarp.style.height = this.optDown.offset + "px"; //璋冩暣涓嬫媺鍖哄煙楂樺害
    }

    MeScroll.prototype.endDownScroll = function() {
        this.downHight = 0;
        this.downwarp.style.height = 0;
        this.isDownScrolling = false;
    }

    MeScroll.prototype.lockDownScroll = function(isLock) {
        if(isLock == null) isLock = true;
        this.optDown.isLock = isLock;
    }
    MeScroll.prototype.initUpScroll = function() {
        var me = this;

        me.optUp = me.options.up || {};
        if(me.optUp.use == false) return;
        me.extendUpScroll(me.optUp);

        if(me.optUp.scrollbar.use) me.scrollDom.classList.add(me.optUp.scrollbar.barClass);

        me.upwarp = document.createElement("div");
        me.upwarp.className = me.optUp.warpClass;
        me.scrollDom.appendChild(me.upwarp);

        me.scrollDom.addEventListener("scroll", function() {
            var scrollTop = me.scrollDom.scrollTop;

            if(!me.isUpScrolling && (!me.isDownScrolling || (me.isDownScrolling && me.optDown.isBoth))) {
                if(!me.optUp.isLock) {
                    var toBottom = me.scrollDom.scrollHeight - me.scrollDom.clientHeight - scrollTop;
                    if(toBottom <= me.optUp.offset) {
                        me.triggerUpScroll();
                    }
                }

                if(me.optUp.toTop.src) {
                    if(scrollTop >= me.optUp.toTop.offset) {
                        me.showTopBtn();
                    } else {
                        me.hideTopBtn();
                    }
                }
            }

            me.optUp.onScroll&&me.optUp.onScroll(me, scrollTop);
        });

        setTimeout(function() {
            me.optUp.inited(me, me.upwarp);
        }, 0)
    }

    MeScroll.prototype.triggerUpScroll = function() {
        this.showUpScroll();
        this.optUp.page.num++;
        this.optUp.callback && this.optUp.callback(this.optUp.page, this);
    }

    MeScroll.prototype.showUpScroll = function() {
        this.isUpScrolling = true;
        this.upwarp.classList.add(this.optUp.hardwareClass);
        this.upwarp.style.visibility = "visible";
        this.optUp.showLoading(this, this.upwarp);
    }

    MeScroll.prototype.showNoMore = function() {
        this.upwarp.style.visibility = "visible"; //鏄剧ず涓婃媺鍔犺浇鍖哄煙
        this.optUp.isLock = true; //閿佸畾涓嶅彲涓婃媺
        this.optUp.showNoMore(this, this.upwarp); //鏃犳洿澶氭暟鎹�
    }

    MeScroll.prototype.hideUpScroll = function() {
        this.upwarp.style.visibility = "hidden"; /*浠ｆ浛display: none,鍒楄〃蹇€熸粦鍔ㄥ埌搴曢儴鑳藉強鏃舵樉绀�*/
        this.upwarp.classList.remove(this.optUp.hardwareClass); //绉婚櫎纭欢鍔犻€熸牱寮�
    }
    MeScroll.prototype.endUpScroll = function(isShowNoMore) {
        if(isShowNoMore != null) { //isShowNoMore=null,涓嶅鐞嗕笅鎷夌姸鎬�
            if(isShowNoMore) {
                this.showNoMore(); //isShowNoMore=true,鏄剧ず鏃犳洿澶氭暟鎹�
            } else {
                this.hideUpScroll(); //isShowNoMore=false,闅愯棌涓婃媺鍔犺浇
            }
        }
        this.isUpScrolling = false; //鏍囪缁撴潫涓婃媺鍔犺浇
    }

    MeScroll.prototype.resetUpScroll = function(isShowLoading) {
        if(this.optUp && this.optUp.use) {
            var page = this.optUp.page;
            this.prePageNum = page.num; //缂撳瓨閲嶇疆鍓嶇殑椤电爜,鍔犺浇澶辫触鍙€€鍥�
            this.prePageTime = page.time; //缂撳瓨閲嶇疆鍓嶇殑鏃堕棿,鍔犺浇澶辫触鍙€€鍥�
            page.num = 1; //閲嶇疆涓虹涓€椤�
            page.time = null; //閲嶇疆鏃堕棿涓虹┖
            if(!this.isDownScrolling&&isShowLoading!=false) {//濡傛灉涓嶆槸涓嬫媺鍒锋柊瑙﹀彂鐨剅esetUpScroll骞朵笖涓嶉厤缃垪琛ㄩ潤榛樻洿鏂�,鍒欐樉绀鸿繘搴�;
                if(isShowLoading==null) {
                    this.removeEmpty(); //绉婚櫎绌哄竷灞€
                    this.clearDataList();//鍏堟竻绌哄垪琛ㄦ暟鎹�,鎵嶈兘鏄剧ず鍒颁笂鎷夊姞杞界殑甯冨眬
                    this.showUpScroll(); //涓嶄紶鍙�,榛樿鏄剧ず涓婃媺鍔犺浇鐨勮繘搴﹀竷灞€
                } else {
                    this.showDownScroll(); //浼爐rue,鏄剧ず涓嬫媺鍒锋柊鐨勮繘搴﹀竷灞€,涓嶆竻绌哄垪琛�
                }
            }
            this.optUp.callback && this.optUp.callback(page, this); //鎵ц涓婃媺鍥炶皟
        }
    }

    /*娓呯┖涓婃媺鍔犺浇鐨勬暟鎹垪琛�*/
    MeScroll.prototype.clearDataList = function() {
        var listId = this.optUp.clearId || this.optUp.clearEmptyId; //浼樺厛浣跨敤clearId
        if(listId) {
            var listDom = document.getElementById(listId);
            if(listDom) listDom.innerHTML = "";
        }
    }

    MeScroll.prototype.endSuccess = function(dataSize, systime) {
        //缁撴潫涓嬫媺鍒锋柊
        if(this.isDownScrolling) this.endDownScroll();

        //缁撴潫涓婃媺鍔犺浇
        if(this.optUp.use) {
            var pageNum = this.optUp.page.num; //褰撳墠椤电爜
            var pageSize = this.optUp.page.size; //姣忛〉闀垮害

            if(pageNum == 1) this.clearDataList(); //濡傛灉鏄涓€椤�,鑷姩娓呯┖绗竴椤靛垪琛ㄦ暟鎹�

            var isShowNoMore; //鏄惁宸叉棤鏇村鏁版嵁
            if(dataSize != null) {
                if(dataSize < pageSize) {
                    //杩斿洖鐨勬暟鎹笉婊′竴椤垫椂,鍒欒鏄庡凡鏃犳洿澶氭暟鎹�
                    this.optUp.isLock = true;
                    if(dataSize == 0 && pageNum == 1) {
                        //濡傛灉绗竴椤垫棤浠讳綍鏁版嵁涓旈厤缃簡绌哄竷灞€
                        isShowNoMore = false;
                        this.showEmpty();
                    } else {
                        //鎬诲垪琛ㄦ暟灏戜簬閰嶇疆鐨勬暟閲�,鍒欎笉鏄剧ず鏃犳洿澶氭暟鎹�
                        var allDataSize = (pageNum - 1) * pageSize + dataSize;
                        if(allDataSize < this.optUp.noMoreSize) {
                            isShowNoMore = false;
                        } else {
                            isShowNoMore = true;
                        }
                        this.removeEmpty(); //绉婚櫎绌哄竷灞€
                    }
                } else {
                    //杩樻湁涓嬩竴椤�
                    isShowNoMore = false;
                    this.optUp.isLock = false;
                    this.removeEmpty(); //绉婚櫎绌哄竷灞€
                }
            }

            //璁剧疆鍔犺浇鍒楄〃鏁版嵁绗竴椤电殑鏃堕棿
            if(pageNum == 1 && systime) this.optUp.page.time = systime;

            //闅愯棌涓婃媺
            this.endUpScroll(isShowNoMore);

            //妫€鏌ユ槸鍚︽弧灞忚嚜鍔ㄥ姞杞戒笅涓€椤�
            this.loadFull();
        }
    }

    /*鍥炶皟澶辫触,缁撴潫涓嬫媺鍒锋柊鍜屼笂鎷夊姞杞�*/
    MeScroll.prototype.endErr = function() {
        //缁撴潫涓嬫媺,鍥炶皟澶辫触閲嶇疆鍥炲師鏉ョ殑椤电爜鍜屾椂闂�
        if(this.isDownScrolling) {
            var page = this.optUp.page;
            if(page && this.prePageNum) {
                page.num = this.prePageNum;
                page.time = this.prePageTime;
            }
            this.endDownScroll();
        }
        //缁撴潫涓婃媺,鍥炶皟澶辫触閲嶇疆鍥炲師鏉ョ殑椤电爜
        if(this.isUpScrolling) {
            this.optUp.page.num--;
            this.endUpScroll(false);
        }
    }

    /*妫€鏌ュ鏋滃姞杞界殑鏁版嵁杩囧皯,鏃犳硶瑙﹀彂涓婃媺鍔犺浇鏃�,鍒欒嚜鍔ㄥ姞杞戒笅涓€椤�,鐩村埌婊″睆鎴栬€呮病鏈夋洿澶氭暟鎹�
     姝ゆ柟娉曟渶濂藉湪鍒楄〃鐨勬暟鎹姞杞藉畬鎴愪箣鍚庤皟鐢�,浠ヤ究璁＄畻鍒楄〃鍐呭楂樺害鐨勫噯纭€�*/
    MeScroll.prototype.loadFull = function() {
        var me = this;
        if(me.optUp.loadFull.use && !me.optUp.isLock && me.scrollDom.scrollHeight <= me.scrollDom.clientHeight) {
            setTimeout(function() {
                //寤舵椂涔嬪悗,杩橀渶鍐嶅垽鏂竴涓嬮珮搴�,鍥犱负鍙兘鏈変簺鍥剧墖鍦ㄥ欢鏃舵湡闂村姞杞藉畬姣曟拺寮€楂樺害
                if(me.scrollDom.scrollHeight <= me.scrollDom.clientHeight) me.triggerUpScroll();
            }, me.optUp.loadFull.delay)
        }
    }

    /*閿佸畾涓婃媺鍔犺浇:isLock=ture,null閿佸畾;isLock=false瑙ｉ攣*/
    MeScroll.prototype.lockUpScroll = function(isLock) {
        if(isLock == null) isLock = true;
        this.optUp.isLock = isLock;
    }

    /*--------鏃犱换浣曟暟鎹殑绌哄竷灞€--------*/
    MeScroll.prototype.showEmpty = function() {
        var me = this;
        var optEmpty = me.optUp.empty; //绌哄竷灞€鐨勯厤缃�
        var warpId = optEmpty.warpId || me.optUp.clearEmptyId; //浼樺厛浣跨敤warpId
        if(warpId == null) return;
        var emptyWarp = document.getElementById(warpId) //瑕佹樉绀虹┖甯冨眬鐨勪綅缃�
        if(emptyWarp) {
            me.removeEmpty(); //鍏堢Щ闄�,閬垮厤閲嶅鍔犲叆
            //鍒濆鍖栨棤浠讳綍鏁版嵁鐨勭┖甯冨眬
            var str = '';
            if(optEmpty.icon) str += '<img class="empty-icon" src="' + optEmpty.icon + '"/>'; //鍥炬爣
            if(optEmpty.tip) str += '<p class="empty-tip">' + optEmpty.tip + '</p>'; //鎻愮ず
            if(optEmpty.btntext) str += '<p class="empty-btn">' + optEmpty.btntext + '</p>'; //鎸夐挳
            me.emptyDom = document.createElement("div");
            me.emptyDom.className = 'mescroll-empty';
            me.emptyDom.innerHTML = str;
            emptyWarp.appendChild(me.emptyDom);
            if(optEmpty.btnClick) { //鐐瑰嚮鎸夐挳鐨勫洖璋�
                var emptyBtn = me.emptyDom.getElementsByClassName("empty-btn")[0];
                emptyBtn.onclick = function() {
                    optEmpty.btnClick();
                }
            }
        }
    }
    /*绉婚櫎绌哄竷灞€*/
    MeScroll.prototype.removeEmpty = function() {
        if(this.emptyDom) {
            var parentDom = this.emptyDom.parentNode;
            if(parentDom) parentDom.removeChild(this.emptyDom);
            this.emptyDom = null;
        }
    }

    /*--------鍥炲埌椤堕儴鐨勬寜閽�--------*/
    MeScroll.prototype.showTopBtn = function() {
        if(!this.topBtnShow) {
            this.topBtnShow = true; //鏍囪鏄剧ず
            var me = this;
            var optTop = me.optUp.toTop; //鍥炲埌椤堕儴鐨勯厤缃�
            if(me.toTopBtn == null) {
                //鏈姞鍏ユ寜閽�,鍒欏姞鍏�
                me.toTopBtn = document.createElement("img");
                me.toTopBtn.className = optTop.warpClass;
                me.toTopBtn.src = optTop.src;
                me.toTopBtn.onclick = function() {
                    me.scrollTo(0, me.optUp.toTop.duration); //缃《
                }
                document.body.appendChild(me.toTopBtn); //鍔犲湪body涓�,閬垮厤鍔犲湪me.scrollDom鍦ㄤ娇鐢ㄧ‖浠跺姞閫熸牱寮忔椂浼氫娇fixed澶辨晥
            }
            //鏄剧ず--娣″叆鍔ㄧ敾
            me.toTopBtn.classList.remove(optTop.hideClass);
            me.toTopBtn.classList.add(optTop.showClass);
        }
    }
    /*闅愯棌鍥炲埌椤堕儴鐨勬寜閽�*/
    MeScroll.prototype.hideTopBtn = function() {
        if(this.topBtnShow && this.toTopBtn) {
            this.topBtnShow = false;
            this.toTopBtn.classList.remove(this.optUp.toTop.showClass);
            this.toTopBtn.classList.add(this.optUp.toTop.hideClass);
        }
    }

    /*婊戝姩鍒楄〃鍒版寚瀹氫綅缃�--甯︾紦鍐叉晥鏋� (y=0鍥炲埌椤堕儴;濡傛灉瑕佹粴鍔ㄥ埌搴曢儴鍙互浼犱竴涓緝澶х殑鍊�,姣斿99999);t鏃堕暱,鍗曚綅ms,榛樿300*/
    MeScroll.prototype.scrollTo = function(y, t) {
        t = t || 300; //鏃堕暱 300ms
        var rate = 20; //鍛ㄦ湡 20ms
        var count = t / rate; //娆℃暟
        var me = this;
        var maxY = me.scrollDom.scrollHeight - me.scrollDom.clientHeight; //y鐨勬渶澶у€�
        if(y < 0) y = 0; //涓嶅彲灏忎簬0
        if(y > maxY) y = maxY; //涓嶅彲瓒呰繃鏈€澶у€�
        var diff = me.scrollDom.scrollTop - y; //宸€� (鍙兘涓鸿礋鍊�)
        if(diff == 0) return;
        var step = diff / count; //姝ラ暱
        me.isScrollTo = true; //鏍囪鍦ㄦ粦鍔ㄤ腑,闃绘鍒楄〃鐨勮Е鎽镐簨浠�
        var i = 0; //璁℃暟
        var scrollTimer = window.setInterval(function() {
            if(i < count) {
                if(i == count - 1) {
                    me.scrollDom.scrollTop = y; //鏈€鍚庝竴娆＄洿鎺ヨ缃畒,閬垮厤璁＄畻璇樊
                } else {
                    me.scrollDom.scrollTop -= step;
                }
                i++;
            } else {
                me.isScrollTo = false;
                window.clearInterval(scrollTimer);
            }
        }, rate);
    }

    return MeScroll
});