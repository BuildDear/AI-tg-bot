export async function buttons() {

    const backToMainMenu = {
        text: "Назад🏎", callback_data: "backToMainMenu",
    };

    const botCommunication = {
        text: "Щось запитати👨‍💻", callback_data: "botCommunicate",
    };

    const firstButtons = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Головне меню🏠", callback_data: "mainMenu" }],
                [{ text: "Зв`язатися з нами☎️", callback_data: "phoneContact" }],
            ],
        },
    };

    const buttonsFromMainMenu_1 = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Зробити замовлення🛒", callback_data: "Order1" }],
                [botCommunication],
                [backToMainMenu],
            ],
        },
    };

    const buttonsFromPhone_1 = {
        reply_markup: {
            keyboard: [
                [{ text: "⬆️Надіслати номер телефону⬆️", request_contact: true }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };

    return {
        firstButtons,
        buttonsFromMainMenu_1,
        buttonsFromPhone_1,
        backToMainMenu };
}

