import Fastify from "fastify";
import {
  type ForecastParams,
  type SearchLocationParams,
  fetchForecastDays,
  fetchSearchLocations,
} from "./services/weather.service";
import cors from "@fastify/cors";
import dotenv from "dotenv";
dotenv.config();

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: "*",
  allowedHeaders: "*",
  methods: "*",
});

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
    reply.send({ data }).code(200).headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
  }
);

server.listen(
  { port: 4321, host: process.env.SEVER_HOST },
  function (error, address) {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
    console.log(`Server is running on port ${address}`);
  }
);
