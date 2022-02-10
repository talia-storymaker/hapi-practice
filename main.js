'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require('@hapi/hapi');
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });
    yield server.register(require('@hapi/inert'));
    yield server.register(require('@hapi/vision'));
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                console.log('----request----', request);
                console.log('----h----', h);
                return "Hello";
            }
        },
        {
            method: 'GET',
            path: '/dogs',
            handler: {
                view: {
                    template: 'standard',
                    context: {
                        name: 'Dogs are amazing'
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/me.jpg',
            handler: (request, h) => {
                return h.file('me.jpg');
            }
        }
    ]);
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: 'templates',
        helpersPath: 'lib/helpers',
        layout: true,
        layoutPath: 'templates/layout'
    });
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
