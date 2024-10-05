"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var tweets_1 = __importDefault(require("./router/tweets"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use("/tweets", tweets_1.default);
app.use(function (req, res, next) {
    res.sendStatus(404);
});
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message,
    });
});
app.listen(8080, function () {
    console.log("Server is running...");
});
//# sourceMappingURL=app.js.map