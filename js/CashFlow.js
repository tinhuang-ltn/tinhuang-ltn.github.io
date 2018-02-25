function CashFlow () {
    'use strict';
    // 現金流入
    this.inFlow = [];
    // 現金流出
    this.outFlow = [];

    // 列出所有現金流
    this.list = function () {
        return this.inFlow.concat(this.outFlow);
    };

    // 新增現金流
    this.add = function (amount, rate, period) {
        if (amount == 0) {
            return;
        }

        var newCashFlow = {
            A: parseFloat(amount),
            i: parseFloat(rate),
            n: parseInt(period),
        };

        if (amount > 0) {
            this.inFlow.push(newCashFlow);
            return;
        }
        this.outFlow.push(newCashFlow);
    };

    // 移除現金流
    this.remove = function (cf) {
        console.log(this);
        var i = this.search(cf);
        if (cf.A > 0) {
            this.inFlow.splice(i, 1);
            return;
        }
        this.outFlow.splice(i, 1);
    };

    // 尋找現金流的索引值
    this.search = function (cf) {
        if (cf.A > 0) {
            return this.inFlow.indexOf(cf);
        }
        return this.outFlow.indexOf(cf);
    };

    // 計算淨現值
    this.pv = function (cfs) {
        if (typeof cfs == 'undefined') {
            var allcf = this.list();
            return this.pv(allcf);
        }

        var npv = 0;
        for (var i in cfs) {
            var cf = cfs[i];
            npv += cf.A * Math.pow(1 + 0.01 * cf.i, -1 * cf.n);
        }

        return npv;
    };
}
