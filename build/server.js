"use strict";

// src/app.ts
var import_fastify = require("fastify");
var app = (0, import_fastify.fastify)();

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("development"),
  DATABSE_URL: import_zod.z.string().default(""),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid Enviorment Variables", _env.error.format());
  throw new Error("Invalid Enviorment Variables");
}
var env = _env.data;

// src/server.ts
app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => {
  console.log("Server is running ");
});
