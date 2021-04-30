const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 heure
      max: 40,
      headers: true,
      handler: function (req, res, next) { // Permet de retourner un status 429 après 40 requêtes
         resetTime = req.rateLimit.resetTime.toLocaleString('fr-FR', {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
         })
         res.statusMessage = "Trop de tentative de connection ! Réessayez aprés : " + resetTime + ".";
         res.status(429).end();
      },
});

module.exports = rateLimitMiddleware;