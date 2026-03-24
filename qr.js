const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Mbuvi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function MBUVI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Mbuvi_Tech = Mbuvi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Mbuvi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Mbuvi_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Mbuvi_Tech.sendMessage(Qr_Code_By_Mbuvi_Tech.user.id, { text: 'JESUS-CRASH-V2~' + b64data });
	
				   let MBUVI_MD_TEXT = `
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
	 await Qr_Code_By_Mbuvi_Tech.sendMessage(Qr_Code_By_Mbuvi_Tech.user.id,{text:MBUVI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Mbuvi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					MBUVI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await MBUVI_MD_QR_CODE()
});
module.exports = router
