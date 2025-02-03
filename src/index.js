export default {
	async fetch(request, env) {
		if (request.method !== "POST") {
			return new Response("Method Not Allowed", { status: 405 });
		}

		const body = await request.json();
		if (!body.message) {
			return new Response("No message found", { status: 400 });
		}

		const text = body.message.text || "";
		const chatId = body.message.chat.id;

		// Call Cloudflare AI
		const aiResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${env.CF_API_TOKEN}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ prompt: text })
		});

		const aiData = await aiResponse.json();
		const replyText = aiData.result.response || "Sorry, I couldn't understand.";

		// Send response to Telegram
		await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chat_id: chatId, text: replyText })
		});

		return new Response("OK", { status: 200 });
	}
};