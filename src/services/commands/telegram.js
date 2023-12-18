import { buttons } from "../../utils/buttons.js";
import { startMessage, phoneContactMessage, orderMessage } from "../../messages/allMessages.js";
import {initAI} from "../processors/initAI.js";
export default async function startBot(bot) {

    let isCommunicate = false;
    let isFirstResponse = true;
    const { firstButtons, buttonsFromMainMenu_1, buttonsFromPhone_1, backToMainMenu } = await buttons();

    bot.command("start", (ctx) => {
        ctx.reply(startMessage, firstButtons);
    });

    bot.command('getfileid', (ctx) => {
        if (ctx.message.reply_to_message && ctx.message.reply_to_message.sticker) {
            const sticker = ctx.message.reply_to_message.sticker;
            ctx.reply(`Sticker File ID: ${sticker.file_id}`);
        } else {
            ctx.reply('Reply to a sticker message with /getfileid to get its file ID.');
        }
    });

    bot.action("mainMenu", (ctx) => {
        isCommunicate = false;
        ctx.editMessageText("Головне меню🏠", buttonsFromMainMenu_1);
    });

    bot.action("phoneContact", (ctx) => {
        isCommunicate = false;
        ctx.reply(phoneContactMessage, buttonsFromPhone_1, backToMainMenu);
    });

    bot.action("Order1", (ctx) => {
        isCommunicate = false;
        ctx.reply(orderMessage, backToMainMenu);
    });

    bot.action("backToMainMenu", (ctx) => {
        isCommunicate = false;
        ctx.editMessageText("Головне меню:", firstButtons);
    });

    bot.action("botCommunicate", (ctx) => {
        isCommunicate = true;
        ctx.reply("Я вас слухаю☺️ \n"+ "Не забувайте, що я віртуальний співробітник і мені треба пару секунд щоб подумати😇 \n" + "Повідомлення обробляються кожні 20 сек.");
    });

    bot.on("contact", (ctx) => {
        const phoneNumber = ctx.message.contact.phone_number;
        ctx.reply(`Ваш номер телефону: ${phoneNumber}`);
    });

    bot.on("text", async (ctx) => {
        if(!isCommunicate) {
            ctx.reply("Щоб поспілкуватися з ботом натисніть кнопку \n" + "(Щось запитати) ❤️");
        } else {
            const userText = ctx.message.text;
            const targetChatId = ctx.message.chat.id;
            const stickerFileId = process.env.STICKERFILEID;

            await ctx.telegram.sendSticker(targetChatId, stickerFileId);
            ctx.reply("Я думаю...");

            try {
                async function processUserInput(userText) {
                    const result = await initAI(userText);
                    ctx.reply(result);
                }

                if (isFirstResponse) {
                    await processUserInput(userText);
                    isFirstResponse = false; // Позначаємо, що перша відповідь вже відбулася
                } else {
                    setTimeout(() => {
                        processUserInput(userText);
                    }, 20000);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data);
                } else {
                    // Якщо немає властивості response або data, виводьте загальну помилку
                    console.error("An error occurred:", error);
                }
            }
        }
    });


    await bot.launch();
}

