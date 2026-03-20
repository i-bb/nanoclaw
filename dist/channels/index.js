// Channel self-registration barrel file.
// Each import triggers the channel module's registerChannel() call.
console.log('[channels/index] loading, TELEGRAM_BOT_TOKEN set:', !!process.env.TELEGRAM_BOT_TOKEN);
// discord
// gmail
// slack
// telegram
import './telegram.js';
// whatsapp
console.log('[channels/index] done');
//# sourceMappingURL=index.js.map