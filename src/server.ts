import Fastify from "fastify";
import {
  type ForecastParams,
  type SearchLocationParams,
  fetchForecastDays,
  fetchSearchLocations,
} from "./services/weather.service";
const server = Fastify({});

server.get<{ Params: SearchLocationParams }>(
  "/search/:location",
  async function (request, reply) {
    const data = await fetchSearchLocations(request.params);

    reply.send({ data }).code(200);
  }
);

server.get<{ Params: ForecastParams }>(
  "/forecast/:location",
  async function (request, reply) {
    const data = await fetchForecastDays(request.params);

    reply.send({ data }).code(200);
  }
);

server.listen({ port: 4321 }, function (error, address) {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }
  console.log(`Server is running on port ${address}`);
});
