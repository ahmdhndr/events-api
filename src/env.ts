import { config } from "dotenv";
import { expand } from "dotenv-expand";
import OmniConfig from "omniconfig.js";
import * as yup from "yup";

expand(config());

const YupEnvSchema = yup.object({
  NODE_ENV: yup.string().required(),
  PORT: yup.number().default(5000),
  MONGO_URI: yup.string().required(),
  SECRET: yup.string().required(),
  EMAIL_SMTP_HOST: yup.string().required(),
  EMAIL_SMTP_PORT: yup.number().required(),
  EMAIL_SMTP_USER: yup.string().required(),
  EMAIL_SMTP_PASS: yup.string().required(),
  EMAIL_SMTP_SECURE: yup.boolean().required(),
  CLIENT_HOST: yup.string().required(),
});

export type env = yup.InferType<typeof YupEnvSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env;

env = OmniConfig
  .withYup(YupEnvSchema)
  .useEnvironmentVariables({
    dotEnv: ".env",
  })
  .resolveSync({ exitCode: 1 });

export default env;
