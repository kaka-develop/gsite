beforeEach(module('gsiteApp'));

function withMockedAngular(mockAngular, fn) {
    return function() {
        var _angular = window.angular;
        window.angular = mockAngular;
        var v = fn.apply(this, arguments);
        window.angular = _angular;
        return v;
    }
}
