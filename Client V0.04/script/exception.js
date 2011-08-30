var Exception = function(code, obj) {
    this.code = code;
    this.message = global.Exception[code];
    this.errorScope = obj;
};
