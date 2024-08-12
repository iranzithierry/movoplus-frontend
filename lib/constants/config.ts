/**
 * Defines the names of cookies used in the application.
 * - `ACCESS_TOKEN`: The name of the cookie that stores the access token.
 * - `REFRESH_TOKEN`: The name of the cookie that stores the refresh token.
 * - `REDIRECT_BACK`: The name of the cookie that stores the URL to redirect back to after authentication.
 */
const COOKIE_NAMES = {
    ACCESS_TOKEN: "access.token",
    REFRESH_TOKEN: "refresh.token",
    REDIRECT_BACK: "redirect.back",
    SESSION_ID: "session.id"
}


const REDIS_KEYS = {
    ACCESS_TOKEN: "access.token.{sessionId}",
}


/**
 * Defines the names of local storage keys used in the application.
 * @property {string} CART_STATE - The key used to store the state of the shopping cart.
 */
const LS_NAMES = {
    CART_STATE: "cart.state",
}


/**
 * Defines the expiration times for various cookies used in the application.
 * - `ACCESS_TOKEN`: The expiration time for the access token cookie, in seconds (8 hours).
 * - `REFRESH_TOKEN`: The expiration time for the refresh token cookie, in seconds (5 days).
 * - `REDIRECT_BACK`: The expiration time for the redirect back cookie, in seconds (2 hours).
 */
const COOKIE_TIME = {
    ACCESS_TOKEN: 8 * 60 * 60,
    REFRESH_TOKEN: 5 * 24 * 60 * 60,
    REDIRECT_BACK: 2 * 60 * 60,
    SESSION_ID: 10 * 24 * 60 * 60
}


/**
 * Defines the URL of the backend server for the application. If the `BACKEND_HOST` environment variable is set, its value will be used. Otherwise, the default value of `'http://127.0.0.1:8000'` will be used.
 */
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


/**
 * An array of CSS class names for various colors, used for styling UI elements.
 * The classes include both ring and background colors, covering a range of grays, reds, oranges, yellows, greens, blues, and purples.
 * This array is likely used to provide a set of predefined color options for the application.
 */
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