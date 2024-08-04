import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.APP_JWT_SIGNING_KEY
const encodedKey = new TextEncoder().encode(secretKey)

/**
 * Encrypts a payload using the application's JWT signing key and returns the signed JWT.
 *
 * @param payload - The data to be encrypted and included in the JWT.
 * @param expiresAt - The expiration time for the JWT, specified as a number (seconds since the Unix epoch), a string (a relative time like '7d'), or a Date object. Defaults to '7d' (7 days).
 * @returns The signed JWT.
 */
export async function encrypt(payload: any, expiresAt: number | string | Date = '7d') {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expiresAt).sign(encodedKey)
}

/**
 * Decrypts a JWT token using the application's secret key.
 *
 * @param data - The JWT token to decrypt, or an empty string if no token is provided.
 * @returns The decrypted payload of the JWT token.
 * @throws {Error} If the decryption fails for any reason.
 */
export async function decrypt(data: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(data, encodedKey, { algorithms: ['HS256'] })
    return payload
  } catch (error) {
    throw new Error('Decryption failed')
  }
}