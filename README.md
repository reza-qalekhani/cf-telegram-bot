# Cloudflare Telegram Bot

A **serverless Telegram bot** powered by **Cloudflare Workers** and **Cloudflare AI**. This bot processes user messages using AI and replies accordingly.

## 🚀 Features
- Hosted on **Cloudflare Workers** (no need for a dedicated server).
- Uses **Cloudflare AI** to process and respond to messages.
- Supports **multi-language responses**.
- Can generate **AI-generated images** and send them to users.

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/reza-qalekhani/cf-telegram-bot.git
cd YOUR_REPO
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Cloudflare Wrangler
Make sure **Wrangler** is installed globally:
```sh
npm install -g wrangler
```
Then log in to Cloudflare:
```sh
wrangler login
```

### 4️⃣ Configure Environment Variables
Set the required environment variables:
```sh
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put CF_API_TOKEN
wrangler secret put CF_ACCOUNT_ID
```
Alternatively, add them in `wrangler.json`:
```json
"vars": {
    "TELEGRAM_BOT_TOKEN": "<YOUR_TELEGRAM_BOT_TOKEN>",
    "CF_API_TOKEN": "<YOUR_CF_API_TOKEN>",
    "CF_ACCOUNT_ID": "<YOUR_CF_ACCOUNT_ID>"
}
```

### 5️⃣ Deploy the Bot
To test locally:
```sh
wrangler dev
```
To deploy to Cloudflare:
```sh
wrangler publish
```
Copy the deployed URL. This is your bot's public URL from Cloudflare Workers

## 🔗 Setting Up Telegram Webhook
To enable Telegram to send updates to your bot, set up a webhook:

1. Use the following command to set the webhook:
   ```sh
   curl -X POST "https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/setWebhook" \
        -H "Content-Type: application/json" \
        -d '{"url": "https://YOUR_CLOUDFLARE_WORKER_URL"}'
   ```

2. Verify the webhook is set:
   ```sh
   curl "https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/getWebhookInfo"
   ```

If successful, Telegram will now send updates to your bot automatically.

## 🛠️ Configuration
### **wrangler.json** Example:
```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "cf-telegram-bot",
  "main": "src/index.js",
  "compatibility_date": "2025-01-29",
  "observability": {
    "enabled": true
  },
  "vars": {
    "TELEGRAM_BOT_TOKEN": "<YOUR_TELEGRAM_BOT_TOKEN>",
    "CF_API_TOKEN": "<YOUR_CF_API_TOKEN>",
    "CF_ACCOUNT_ID": "<YOUR_CF_ACCOUNT_ID>"
  }
}
```

## 🔥 How It Works
1. The bot receives a message via **Telegram Webhook**.
2. The message is sent to **Cloudflare AI** for processing.
3. The AI response is sent back to the user.


## 📜 License
This project is **open-source** and available under the **MIT License**.

## 💡 Contributions
Feel free to **fork this repo** and submit **pull requests**! 🚀

Developed with ❤️ by [Reza Qalekhani](https://byreza.net) using Cloudflare Workers & AI.