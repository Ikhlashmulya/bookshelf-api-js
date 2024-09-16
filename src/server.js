import Hapi from '@hapi/hapi';
import routes from './routes/routes.js';

async function main() {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route(routes);

  server.ext('onPreResponse', (request, h) => {
    if (request.response.isBoom) {
      return h
        .response({
          status: 'fail',
          message: request.response.output.payload.message,
        })
        .code(request.response.output.statusCode);
    }

    return h.continue;
  });

  await server.start();
  console.log(`server running on ${server.info.uri}`);
}
main();
