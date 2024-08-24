
const COOKIE_NAMES = {
    ACCESS_TOKEN: "access.token",
    REFRESH_TOKEN: "refresh.token",
    REDIRECT_BACK: "redirect.back",
    SESSION_ID: "session.id"
}


const REDIS_KEYS = {
    ACCESS_TOKEN: "access.token.{sessionId}",
}



const LS_NAMES = {
    CART_STATE: "cart.state",
}



const COOKIE_TIME = {
    ACCESS_TOKEN: 8 * 60 * 60,
    REFRESH_TOKEN: 5 * 24 * 60 * 60,
    REDIRECT_BACK: 2 * 60 * 60,
    SESSION_ID: 10 * 24 * 60 * 60
}



const BACKEND_HOST = process.env.BACKEND_HOST ?? 'http://127.0.0.1:8000'

const CURRENCY = "usd";
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
const MIN_AMOUNT = 10.0;
const MAX_AMOUNT = 5000.0;
const AMOUNT_STEP = 5.0;

export {
    COOKIE_NAMES,
    COOKIE_TIME,
    BACKEND_HOST,
    LS_NAMES,
    CURRENCY,
    MIN_AMOUNT,
    MAX_AMOUNT,
    AMOUNT_STEP,
    REDIS_KEYS
}



let refreshColors = [
    'ring-gray-500',
    'ring-gray-900',
    'ring-red-500',
    'ring-orange-500',
    'ring-amber-500',
    'ring-yellow-500',
    'ring-green-500',
    'ring-teal-500',
    'ring-cyan-500',
    'ring-sky-500',
    'ring-blue-500',
    'ring-indigo-500',
    'ring-violet-500',
    'ring-purple-500',
    'ring-pink-500',
    'ring-rose-500',

    'bg-gray-500',
    'bg-gray-900',
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
]