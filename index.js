import { Telegraf } from "telegraf";
import startBot from "./src/services/commands/telegram.js";
import * as dotenv from "dotenv";
dotenv.config();


const tgToken = process.env.TG_TOKEN;
const bot = new Telegraf(tgToken);

(async () => {

    startBot(bot);

    // await startMongo();

})().catch((error) => {
    console.error("Error starting the bot.:", error);
});
