"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 3000);
app.use((0, cors_1.default)());
const http = (0, http_1.createServer)(app);
// set up socket.io and bind it to our
// http server.
const io = new socket_io_1.Server(http, { cors: { origin: '*' } });
// const io = new Server(http);
const app_1 = require("./app/app");
const server_1 = require("./app/server");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
(0, typeorm_1.createConnection)({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "admin",
    "password": "password",
    "database": "postgres",
    "synchronize": true,
    "logging": false,
    "entities": [
        __dirname + "/entities/**/*.ts"
    ],
    "migrations": [
        "./migration/**/*.ts"
    ],
    "subscribers": [
        "./subscriber/**/*.ts"
    ]
}).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepo = connection.manager.getRepository(User_1.User);
    let U = yield userRepo.find({ Username: 'TestUser' });
    if (U.length == 0) {
        let user = new User_1.User();
        user.ID = (0, uuid_1.v4)();
        user.Username = 'TestUser';
        user.Password = 'TestPassword';
        user.Email = 'Test';
        yield userRepo.save(user).catch((err) => console.log(err));
    }
    (0, app_1.routes)(app);
    (0, server_1.server)(io, connection);
})).catch(error => console.log(error));
const web_server = http.listen(3000, function () {
    console.log("listening on *:3000");
});