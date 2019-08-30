var selectMapTemplate =
    `<div class="select-tree-module">
        <div class="select-tree-content">
            <div class="tree-unit" v-for="(item,idx) in selectMapData" :key="idx">
                {{item.name}}
                <span style="margin-left:10px;">{{item.radius}}M</span>
                <a href="javascript:;" @click="delSelectTree(idx)">删除</a>
            </div>
        </div>
        <div class="search-module">
            <el-input placeholder="输入想找的地点" v-model="mapKeWordy" @keyup.enter.native="searchMapkey"></el-input>
            <el-button size="small" @click="searchMapkey">搜索</el-button>
        </div>
        <div class="concat-mapsearch-info">
            <div class="infomap-search" v-if="mapListShow">
                <p v-for="(poi,i) in poiList" @click="mapClickNewCover(poi.latLng.lat,poi.latLng.lng)">{{poi.name}}</p>
            </div>
            <div id="container"></div>
        </div>
	</div>`


Vue.component('select-map', {
    data() {
        return {
            map: null,
            position: null,
            marker: [],
            circle: null,
            infoWin: null,
            searchService: null,
            poiList: null,
            maplng: null,
            maplat: null,
            mapradius: 2000,
            setMapData: [],
            geocoder: null,
            selectMapData: this.data || [],
            mapListShow: false,
            mapKeWordy: '',
            mapkey: 'LX2BZ-XEXC4-R4GUF-XF6QZ-PGDKO-OIBOD',
            geocoderResult: [],
            cityName: ''
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    template: selectMapTemplate,
    mounted() {
        self = this;
        this.initMap();
        // console.log(self)
    },
    watch: {
        selectMapData(val) {
            this.$emit('change', 'zone', val);
        }
    },
    methods: {
        searchMapkey() {
            self.searchService.search(self.mapKeWordy);
        },
        //清除覆盖物的函数
        clearOverlays() {
            if (self.circle) {
                self.circle.setMap(null);
            }
            // if (self.marker) {
            //     self.marker.setMap(null);
            // }
            if (self.infoWin) {
                self.infoWin.setMap(null);
            }
            self.clearOverMarketlays(self.marker)
        },
        //清除覆盖层
        clearOverMarketlays(markersArray) {
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setMap(null);
                }
            }
        },
        mapClickNewCover(lat, lng) {
            self.maplat = lat;
            self.maplng = lng;
            self.clearOverlays();
            self.position = new qq.maps.LatLng(lat, lng);
            //创建marker
            let marker = new qq.maps.Marker({
                position: self.position,
                map: self.map
            });
            self.marker.push(marker)
            self.mapradius = 2000;
            self.mapGeocoderFun();
            self.mapCircleFun(self.mapradius);
            self.mapListShow = false;
        },
        mapGeocoderFun() {
            self.geocoder = new qq.maps.Geocoder({
                location: self.maplat + ',' + self.maplng,
                key: self.mapkey,
                get_poi: 1
            });
            self.geocoder.setComplete(function (result) {
                var geocoderResult = result.detail;
                self.geocoderResult = geocoderResult;

                // console.log(geocoderResult)
                self.infoWin = new qq.maps.InfoWindow({
                    map: self.map
                });
                self.infoWin.open();
                //tips  自定义内容
                self.infoWin.setContent('<div id="mapinfo" style="width:200px;">' +
                    '<p>' + geocoderResult.nearPois[0].name + '</p>' +
                    '<p>' + geocoderResult.nearPois[0].address + '</p>' +
                    '<div class="inputNumber"><span onclick="self.reduceRadius()" class="infowin-btn">-</span>' +
                    '<input type="text" class="mapRadiusInput" id="mapRadiusInput" value="2000">' +
                    '<span onclick="self.addRadius()" class="infowin-btn">+</span>' +
                    '</div><span class="btn-radius" onclick="self.getChangeRadius()">确定</span>' +
                    '</div>');
                self.infoWin.setPosition(self.position);


            });
            self.geocoder.getAddress(self.position);
        },
        addRadius() {
            // let value = self.mapradius + 0.5;
            self.mapradius += 500;
            // document.getElementById('mapRadiusInput').value = value;
            document.getElementById('mapRadiusInput').value = self.mapradius;
            // self.circle.setRadius(value * 1000);
            self.circle.setRadius(self.mapradius);
        },
        reduceRadius() {
            if (self.mapradius >= 0.5) {
                // let value = self.mapradius - 0.5;
                self.mapradius -= 500;
                // document.getElementById('mapRadiusInput').value = value;
                document.getElementById('mapRadiusInput').value = self.mapradius;
                // self.circle.setRadius(value * 1000);
                self.circle.setRadius(self.mapradius);
            } else {
                swal({
                    title: "温馨提示",
                    text: '不能少于500米!'
                });
                return false;
            }
        },
        mapCircleFun(radius) {
            self.circle = new qq.maps.Circle({
                //圆形的中心点坐标。
                center: self.position,
                //圆形是否可点击。
                clickable: true,
                //鼠标在圆形内的光标样式。
                cursor: 'pointer',
                //圆形的填充色，可通过Color对象的alpha属性设置透明度。
                // fillColor: "#00f",
                fillColor: new qq.maps.Color(40, 173, 39, 0.2),
                //要显示圆形的地图。
                map: self.map,
                //圆形的半径。
                radius: radius,
                //圆形的边框颜色，可通过Color对象的alpha属性设置透明度。
                strokeColor: "#38c82d",
                //圆形的边框样式。实线是solid，虚线是dash。
                strokeDashStyle: "solid",
                //圆形的边框线宽。
                strokeWeight: 3,
                editable: true,
                //圆形是否可见。
                visible: true,
                //圆形的zIndex值。
                zIndex: 1000
            });
        },

        getChangeRadius() {
            let mapradius = Number(document.getElementById('mapRadiusInput').value);

            if (mapradius && mapradius >= 0.5) {
                self.circle.setRadius(mapradius);
                self.mapradius = mapradius;
                let nearPois = self.geocoderResult.nearPois;

                const temp = self.selectMapData.find(item => item.name === nearPois[0].name);

                if (temp) {
                    swal({
                        title: "温馨提示",
                        text: '不可重复添加!'
                    });
                    return false;
                }

                self.selectMapData.push({
                    name: nearPois[0].name,
                    lat: nearPois[0].latLng.lat,
                    lng: nearPois[0].latLng.lng,
                    radius: mapradius
                });
                self.infoWin.close();
                self.circle.setVisible(false);
                self.clearOverMarketlays(self.marker);
            } else {
                swal({
                    title: "温馨提示",
                    text: '不能少于500米!'
                });
            }


        },
        delSelectTree(idx) {
            this.selectMapData.splice(idx, 1);
        },
        initMap() {

            self.map = new qq.maps.Map(document.getElementById('container'), {
                zoom: 13
            });
            //获取城市列表接口设置中心点
            citylocation = new qq.maps.CityService({
                complete: function (result) {
                    self.cityName = result.detail.name.substr(0, 2);
                    self.searchService.setLocation(self.cityName);

                    self.map.setCenter(result.detail.latLng);
                }
            });
            //调用searchLocalCity();方法    根据用户IP查询城市信息。
            citylocation.searchLocalCity();

            //调用Poi检索类
            self.searchService = new qq.maps.SearchService({
                complete: function (result) {
                    self.poiList = result.detail.pois;
                    if (result.detail.pois.length) {
                        self.mapListShow = true;
                    }
                },
                error: function () {
                    swal({
                        title: "温馨提示",
                        text: '请输入搜索地区!'
                    });
                }
            });


            function qqMapAddListener() {
                var listener = qq.maps.event.addListener(
                    self.map,
                    'click',
                    function (event) {
                        self.maplat = event.latLng.getLat();
                        self.maplng = event.latLng.getLng();
                        self.mapClickNewCover(event.latLng.getLat(), event.latLng.getLng())
                    }
                );
            }

            qqMapAddListener();

        }
    }
})