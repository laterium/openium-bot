/// @App : app.ts

import { Erine, GatewayIntentBits } from 'erine';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const _prefix: string = process.env.APP_PREFIX || '!';

const app = new Erine({
    intents: Object.values(GatewayIntentBits).filter(i => typeof i === "number") as number[],
    prefix: _prefix
});

app.once('ready', () => {
  console.log(`(ts) Logged in as ${app.user?.tag}`.blue);
});

const token = process.env.APP_TOKEN;
if (!token) {
    console.error('TOKEN is not defined in the environment variables.');
    process.exit(1);
}

app.login(token);
