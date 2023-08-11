// import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import dotenv from 'dotenv';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const envPath = join(__dirname, 'config', '.env');
// dotenv.config({ path: envPath });
//
// const mongoURL = process.env.MONGO_URL;
//
// export async function startMongo(){
//
//     mongoose.connect(mongoURL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// }
// mongoose.connection.on('connected', () => {
//     console.log('Підключено до MongoDB');
// });
//
// mongoose.connection.on('error', (err) => {
//     console.error('Помилка підключення до MongoDB:', err);
// });
//
