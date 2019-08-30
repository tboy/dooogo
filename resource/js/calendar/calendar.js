var Calendar = function (element, options) {

    this.el = $(element);
    this.options = $.extend(true, {}, this.options, options);
    this.init();
}
Calendar.prototype = {

    options: {
        mode: "month",
        weekMode: ["MON一", "TUE二", "WED三", "THU四", "FRI五", "SAT六", "SUN日"],
        newDate: new Date(),
        width: null,
        height: null,
        shwoLunar: false,
        showModeBtn: true,
        showEvent: true,
        maxEvent: null
    },

    init: function () {
        var me = this,
            el = me.el,
            opts = me.options;

        el.addClass("calendar");
        opts.width = el.width();
        opts.height = el.height();

        typeof (opts.newDate) == "string" ? opts.newDate = me._getDateByString(opts.newDate) : "";

        me._createCalendar();

        //绑定事件
        //changeMode

        //calendar-cell日期点击事件
        el.on("click", ".calendar-cell", function (e) {
            e.stopPropagation();
            $(".dropdown-month").removeClass("open");
            $(".dropdown-year").removeClass("open");

            var cellDate = $(this).attr("title");

            var viewData = me.viewData;
            var year = parseInt(cellDate.split("年")[0]);
            var month = parseInt(cellDate.split("年")[1].split("月")[0]) - 1;
            var date = parseInt(cellDate.split("年")[1].split("月")[1].split("日")[0]);

            if (opts.mode == "year") {
                if (opts.cellClick) opts.cellClick.call(me, viewData[month])
            }
            else if (opts.mode == "month" && month == opts.newDate.getMonth()) {

                if (opts.cellClick) opts.cellClick.call(me, viewData[date])
            }
        })


        //年份改变
        el.on("click", "#ly", function (e) {

            var yearNum = me.options.newDate.getFullYear() - 1;
            if (yearNum == opts.newDate.getFullYear()) return;
            opts.newDate.setFullYear(yearNum);
            opts.mode == "month" ? me._refreshCalendar(opts.newDate) : me._refreshYearCalendar(opts.newDate);
            var year = me.options.newDate.getFullYear();
            var month = me.options.newDate.getMonth() + 1;
            var yearText = year + "年" + month + "月";
            $(".gocenter").text(yearText);

        })

        el.on("click", "#ry", function (e) {
            var yearNum = me.options.newDate.getFullYear() + 1;
            if (yearNum == opts.newDate.getFullYear()) return;
            opts.newDate.setFullYear(yearNum);
            opts.mode == "month" ? me._refreshCalendar(opts.newDate) : me._refreshYearCalendar(opts.newDate);
            var year = me.options.newDate.getFullYear();
            var month = me.options.newDate.getMonth() + 1;
            var yearText = year + "年" + month + "月";
            $(".gocenter").text(yearText);

        })

        //月份改变
        el.on("click", "#lm", function (e) {

            var yearNum = me.options.newDate.getMonth() - 1;
            if (yearNum == opts.newDate.getMonth()) return;
            opts.newDate.setMonth(yearNum);
            opts.mode == "month" ? me._refreshCalendar(opts.newDate) : me._refreshYearCalendar(opts.newDate);
            var year = me.options.newDate.getFullYear();
            var month = me.options.newDate.getMonth() + 1;
            var yearText = year + "年" + month + "月";
            $(".gocenter").text(yearText);

        })

        el.on("click", "#rm", function (e) {

            var yearNum = me.options.newDate.getMonth() + 1;
            if (yearNum == opts.newDate.getMonth()) return;
            opts.newDate.setMonth(yearNum);
            opts.mode == "month" ? me._refreshCalendar(opts.newDate) : me._refreshYearCalendar(opts.newDate);
            var year = me.options.newDate.getFullYear();
            var month = me.options.newDate.getMonth() + 1;
            var yearText = year + "年" + month + "月";
            $(".gocenter").text(yearText);

        })


    },
    //公开方法
    changeMode: function (mode) {
        var me = this;
        if (mode == me.options.mode) return;
        me.options.mode = mode;
        me._createCalendar();
    },


    getViewDate: function (viewDate) {
        var me = this,
            opts = me.options,
            mode = opts.mode,
            data = opts.data;
        if (!data || data.length == 0) return [];
        var viewData = {},
            modeYear = viewDate.getFullYear(),
            modeMonth = null;
        if (mode == "month") {
            modeMonth = viewDate.getMonth()
        }
        ;


        //筛选视图数据并转化未对象 要不要转化为属性
        for (var i = 0; i < data.length; i++) {
            var item = data[i];


            var start = me._getDateByString(item.startDate);

            var year = start.getFullYear();
            var month = start.getMonth();
            var date = start.getDate();
            if (modeMonth && year == modeYear && modeMonth == month) {
                if (!viewData[date]) viewData[date] = [];
                viewData[date].push(item);
            }
            else if (!modeMonth && year == modeYear) {
                if (!viewData[month]) viewData[month] = [];
                viewData[month].push(item);

            }

        }

        return viewData;

    },
    _getDateByString: function (stringDate) {
        var me = this;
        var year = stringDate.split("-")[0];
        var month = parseInt(stringDate.split("-")[1]) - 1;
        var date = stringDate.split("-")[2];

        return new Date(year, month, date);
    },
    //私有方法
    _createCalendar: function () {
        var me = this;
        var dateMode = me.options.mode;


        me._createView()
        //dateMode == "year" ? me._createYearView() : me._createMonthView();

    },
    _createView: function () {
        var me = this,
            el = me.el,
            opts = me.options,
            mode = opts.mode,
            newDate = opts.newDate,
            html = '';
        html += me._createToolbar();
        html += '<div class="calendar-body">';
        html += '<table class="calendar-table" cellspacing="0">'
        if (mode == "month") {
            html += me._createHeader();
        }
        html += me._createBody();
        html += '</table>'
        html += '</div>'
        el.html(html);


        if (mode == "month") {
            me._refreshCalendar(newDate);
        }
        else {
            me._refreshYearCalendar(newDate);
        }

    },
    _createToolbar: function () {
        var me = this,
            newDare = me.options.newDate,
            mode = me.options.mode,
            showModeBtn = me.options.showModeBtn,
            s = '';

        var year = newDare.getFullYear();
        var month = newDare.getMonth() + 1;

        s += '<div class="calendar-header">'
        // s+="<div class='goleft' id='ly'> « </div>"
        s += "<div class='goleft' id='lm'> ‹ </div>"

        s += "<div class='gocenter'>" + year + "年" + month + "月</div>"
        // s+="<div class='goright' id='ry'> » </div>"
        s += "<div class='goright' id='rm'> › </div>"

        s += '</div >'
        return s;
    },
    _createHeader: function () {
        var me = this,
            opts = me.options,
            weekMode = opts.weekMode;
        var s = '<thead><tr style="background:#f1f1f1;height:30px;line-height:30px;">'
        weekMode.forEach(function (item) {
            s += ' <th class="calendar-column-header" title="周' + item + '"><span class="calendar-column-header-inner">' + item + '</span></th>'
        })
        s += '</thead></tr>'
        return s;
    },
    _createBody: function () {
        var me = this;
        var s = ' <tbody class="calendar-tbody">'
        s += '</tbody>'
        return s;
    },
    _refreshYearCalendar: function (newDate) {
        var me = this,
            showEvent = me.options.showEvent,
            maxEvent = me.options.maxEvent,
            s = '';

        //每次都重新获取会不会影响性能
        me.viewData = viewData = me.getViewDate(newDate);

        var year = newDate.getFullYear(), month = newDate.getMonth();
        //四行三列
        for (var i = 0; i < 4; i++) {
            s += '<tr>'
            for (var l = 0; l < 3; l++) {
                renderMonth = i * 3 + l;
                if (month == renderMonth) {
                    s += '<td title="' + year + '年' + (renderMonth + 1) + '月" class="calendar-cell calendar-thisMonth">';
                }
                else {
                    s += '<td title="' + year + '年' + (renderMonth + 1) + '月" class="calendar-cell">';
                }
                s += '<div class="calendar-date">';
                s += '<div class="calendar-value">' + (renderMonth + 1) + '月</div>';
                s += '<div class="calendar-content"><ul class="events">'

                if (showEvent && viewData[renderMonth]) {
                    if (maxEvent && viewData[renderMonth].length > maxEvent) {
                        s += viewData[renderMonth].length + "个事件";
                    }
                    else {
                        viewData[renderMonth].forEach(function (item) {
                            s += '<li><span style="font-size:12px;text-align:right;">' + item.Ename + '</span></li>'
                        })
                    }
                }
                s += '</ul ></div > ';
                s += '</div></td>';
            }
            s += '</tr>'
        }

        me.el.find(".calendar-tbody").html(s);
    },
    _refreshCalendar: function (newDate) {
        var me = this,
            showEvent = me.options.showEvent,
            maxEvent = me.options.maxEvent,
            s = '';

        me.viewData = viewData = me.getViewDate(newDate);

        var _newDate = me._cloneDate(newDate);
        //当前date
        var nowNum = _newDate.getDate();

        //第一天周几
        _newDate.setDate(1);
        var weekDay = _newDate.getDay() == 0 ? 7 : _newDate.getDay();


        //视图第一天
        var viewDate = me._cloneDate(_newDate);
        viewDate.setDate(viewDate.getDate() - weekDay + 1);

        //当前第几周/行 (暂不处理)
        var spileDate = (newDate.getTime() - viewDate.getTime()) / (1000 * 60 * 60 * 24);

        renderDate = me._cloneDate(viewDate);


        //固定六行
        for (var i = 0; i < 6; i++) {
            s += '<tr>'
            for (var l = 0; l < 7; l++) {

                var year = renderDate.getFullYear();
                var month = renderDate.getMonth() + 1;
                var date = renderDate.getDate();

                if (renderDate.getMonth() < newDate.getMonth()) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-last-month-cell">';
                }
                else if (renderDate.getMonth() > newDate.getMonth()) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-next-month-cell">';
                }
                else if (date == nowNum) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-today">';
                }
                else {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell">';
                }
                s += '<div class="calendar-date calendar-today">';
                s += '<div class="calendar-value">' + date + '</div>';
                s += '<div class="calendar-content"><ul class="events">'
                if (showEvent && viewData[date] && renderDate.getMonth() == newDate.getMonth()) {

                    viewData[date].forEach(function (item) {
                        s += '<li><span>' + item.Ename + '</span></li>'
                    })

                }
                s += '</ul ></div > ';
                s += '</div></td>';

                renderDate.setDate(renderDate.getDate() + 1);

            }
            s += '</tr>'
        }
        me.el.find(".calendar-tbody").html(s);
    },
    _cloneDate: function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },

}
$.fn.calendar = function (options) {

    var isSTR = typeof options == "string",
        args, ret;

    if (isSTR) {
        args = $.makeArray(arguments)
        args.splice(0, 1);
    }

    var name = "calendar",
        type = Calendar;

    var jq = this.each(function () {
        var ui = $.data(this, name);

        if (!ui) {
            ui = new type(this, options);
            $.data(this, name, ui);
        }
        if (isSTR) {
            ret = ui[options].apply(ui, args);
        }
    });

    return isSTR ? ret : jq;
};