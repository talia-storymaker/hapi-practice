import { ResponseToolkit } from "@hapi/hapi";

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));

    interface ResponseToolkitInert extends ResponseToolkit {
        file: Function;
    }

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request: Request, h: ResponseToolkit) => {
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
                        name: 'Dogs are amazing',
                        image: 'ylanite-dog.jpg',
                        imageDesc: 'Dog laying on grass',
                        textContent: 'I absolutely love dogs! They are such wonderful companions.'
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/about-me',
            handler: {
                view: {
                    template: 'standard',
                    context: {
                        name: 'My name is Talia DeGisi',
                        image: 'me.jpg',
                        imageDesc: 'Portrait of Talia DeGisi, a young white woman with brown hair, smiling',
                        textContent: 'I am a web developer.'
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/img/me.jpg',
            handler: (request: Request, h: ResponseToolkitInert) => {
                return h.file('img/me.jpg');
            }
        },
        {
            method: 'GET',
            path: '/img/ylanite-dog.jpg',
            handler: (request: Request, h: ResponseToolkitInert) => {
                return h.file('img/ylanite-dog.jpg');
            }
        },
        {
            method: 'GET',
            path: '/css/main.css',
            handler: (request: Request, h: ResponseToolkitInert) => {
                return h.file('lib/css/main.css');
            }
        }
    ])

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: 'templates',
        helpersPath: 'lib/helpers',
        layout: true,
        layoutPath: 'templates/layout'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();