option = {
    title: {
        text: '关键指标趋势图',
        textStyle: {
            color: '#666',
            fontSize: 14,
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            str = params[0].seriesName + " : " + params[0].value + "<br>";
            str += params[1].seriesName + " : " + params[1].value + "<br>";
            str += params[1].axisValue
            return str;

        }
    },

    grid: {
        top: 60,
        right: 40,
        bottom: 40,
        left: 40
    },
    legend: {
        top: 32,
        left: 'center',
        show: false,
        data: ['曝光率', '点击率']
    },
    calculable: true,
    xAxis: [{
        show: true,
        type: 'category',
        data: ['2019-01-21', '2019-01-22', '2019-01-23', '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27',
            '2019-01-28', '2019-01-29', '2019-01-30', '2019-01-31', '12月'
        ]
    }],
    yAxis: [{
        type: 'value',
        name: "",
        nameLocation: "center",
        nameGap: 35,
        nameRotate: 0,
        nameTextStyle: {
            fontSize: 16,
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        //默认以千分位显示，不想用的可以在这加一段
        axisLabel: { //调整左侧Y轴刻度， 直接按对应数据显示
            show: true,
            showMinLabel: true,
            showMaxLabel: true,
            formatter: '{value}'
        }
    },
        {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            type: 'value',
            name: "",
            nameLocation: "center",
            nameGap: 35,
            nameRotate: 0,
            nameTextStyle: {
                fontSize: 16,
            },
            //默认以千分位显示，不想用的可以在这加一段
            axisLabel: { //调整左侧Y轴刻度， 直接按对应数据显示
                show: true,
                showMinLabel: true,
                showMaxLabel: true,
                formatter: '{value}'
            }
        }
    ],
    series: [{
        name: '曝光率',
        type: 'line',
        smooth: true,
        tooltip: {
            trigger: 'axis'
        },
        symbol: 'none',
        yAxisIndex: 0,
        data: [35, 15, 8, 12, 11, 6, 3, 0, 0, 0, 0, 0],
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#009944'
                },
                label: {
                    show: false
                }
            }
        },
    },
        {
            name: '点击率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            yAxisIndex: 1,
            tooltip: {
                trigger: 'axis'
            },
            data: [16, 16, 6, 5, 4, 4, 3, 0, 0, 0, 0, 0],
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#086a8b'
                    },
                    label: {
                        show: false
                    }
                }
            },
        }
    ]
};
