const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Mbuvi_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function Mbuvi_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Mbuvi_Tech = Mbuvi_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_Mbuvi_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Mbuvi_Tech.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Mbuvi_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Mbuvi_Tech.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Mbuvi_Tech.sendMessage(Pair_Code_By_Mbuvi_Tech.user.id, { text: 'JESUS-CRASH-V2~' + b64data });

                    let Mbuvi_MD_TEXT = `
        
*╭━━━❰ 💎 *𝐉𝐄𝐒𝐔𝐒-𝐂𝐑𝐀𝐒𝐇-𝐕𝟐* 💎 ❱━━━╮
┃
┃ 🎉 *Welcome, ${userName}!* 
┃ Your diamond session is now *ACTIVE*
┃
┣━━━❰ 🔐 *𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐃𝐄𝐓𝐀𝐈𝐋𝐒* ❱━━━
┃
┃ 📅 *Date:* ${currentDate}
┃ ⏰ *Time:* ${currentTime}
┃ 🆔 *Status:* ✅ CONNECTED
┃ 🔒 *Security:* MILITARY-GRADE
┃
┣━━━❰ ⚠️ *𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 𝐖𝐀𝐑𝐍𝐈𝐍𝐆* ❱━━━
┃
┃ 🔴 *DO NOT* share your Session ID
┃ 🔴 *DO NOT* send it to anyone
┃ 🔴 *DO NOT* post it publicly
┃ 🟢 Store it in a *SAFE LOCATION*
┃
┣━━━❰ 🔗 *𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐋𝐈𝐍𝐊𝐒* ❱━━━
┃
┃ 📢 *WhatsApp Channel:*
┃ https://whatsapp.com/channel/0029Vb7J1Po4tRrqa88ZfQ3X
┃
┃ 🐙 *GitHub Repository:*
┃ https://github.com/dave-store/JESUS-CRASH-V2
┃
┃ 💬 *Support Group:*
┃ https://chat.whatsapp.com/...
┃
┣━━━❰ ⚡ *𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒* ❱━━━
┃
┃ 🤖 Advanced AI Commands
┃ 🛡️ Anti-Spam & Security
┃ 📥 Media Downloader
┃ 🎵 Audio/Video Tools
┃ 🔄 Auto-Update System
┃ 💎 Premium Support
┃
╰━━━❰ 👑 *𝐃𝐀𝐖𝐄𝐍𝐒 𝐁𝐎𝐘 𝐓𝐄𝐂𝐇* ❱━━━╯

> *"Stay cool and hack smart"* ✌🏻🔥
> *© 2024 All Rights Reserved*`;

                    await Pair_Code_By_Mbuvi_Tech.sendMessage(Pair_Code_By_Mbuvi_Tech.user.id, { text: Toxic_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Mbuvi_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Mbuvi_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await Mbuvi_MD_PAIR_CODE();
});

module.exports = router;
