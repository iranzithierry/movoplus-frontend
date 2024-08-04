import { User } from "@/api";
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNow } from 'date-fns';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { CartState } from "@/app/(shopping)/marketplace/product/[uuid]/components/product-options";

/**
 * Merges and applies Tailwind CSS utility classes to an element.
 *
 * @param {ClassValue[]} inputs - An array of class values to be merged and applied.
 * @returns {string} The merged and applied Tailwind CSS utility classes.
 */
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}


/**
 * Formats a date string as a relative time string (e.g. "2 minutes ago").
 *
 * @param dateString - The date string to format.
 * @returns A relative time string.
 */
const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}


/**
 * Extracts error values from a response object.
 *
 * @param response - The response object containing error information.
 * @returns The first error value, or the original response object if no error values are found.
 */
function extractErrorValues(response: any) {
  const values = [];
  for (const key in response) {
    if (Array.isArray(response[key])) {
      values.push(response[key][0].replace("This field", `${key} field`));
    }
  }
  if (values.length == 0) {
    return response
  }
  return values.shift();
}


/**
 * Pluralizes a word based on the provided value.
 *
 * @param value - The value to determine the plural form.
 * @param key - The word to be pluralized.
 * @returns The pluralized form of the word.
 */
function pluralize(value: any, key: string) {
  const irregularPlurals: { [key: string]: string } = {
    'child': 'children',
    'person': 'people',
    'man': 'men',
    'woman': 'women',
  }

  if (Array.isArray(value) ? value.length !== 1 : value !== 1) {
    if (irregularPlurals[key]) {
      return irregularPlurals[key]
    } else if (key.endsWith('y') && !['ay', 'ey', 'iy', 'oy', 'uy'].some(ending => key.endsWith(ending))) {
      return key.slice(0, -1) + 'ies'
    } else if (key.endsWith('s') || key.endsWith('x') || key.endsWith('z') || key.endsWith('ch') || key.endsWith('sh')) {
      return key + 'es'
    } else {
      return key + 's'
    }
  } else {
    return key
  }
}


/**
 * Generates CSS class names based on the provided color string.
 *
 * @param color - The color string to use for the CSS classes.
 * @returns A string containing the CSS class names for the background and ring colors.
 */
function getColorAttributes(color: string) {
  color = color.toLowerCase();
  if (color === "black") {
    return `bg-gray-900 ring-gray-900`;
  } else if (color === "white") {
    return `bg-white ring-gray-400`;
  } else {
    return `bg-${color}-500 ring-${color}-500`;
  }
}


/**
 * Formats a number or string representing money into a localized currency string.
 *
 * @param money - The number, bigint, or string representing the money amount to format.
 * @param currency - The currency code to use for formatting, defaulting to "RWF".
 * @returns The formatted money string.
 */
const formatMoney = (money: number | bigint | string, currency = "RWF") => {
  const format = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  });
  return format.format(parseFloat(money.toString()))
}


/**
 * Retrieves the user's avatar image URL based on the specified option.
 *
 * @param user - The user object containing the profile picture information.
 * @param option - The desired avatar image option, defaulting to 'original' if not provided.
 * @returns The URL of the user's avatar image for the specified option, or `null` if the profile picture is not available.
 */
type AvatarOptions = "original" | "thumbnail" | "medium_square_crop" | "small_square_crop";
function getUserAvatar(user: User, option: AvatarOptions = 'original') {
  return user?.profile_picture?.[option]
}


/**
 * Retrieves an item from the browser's local storage.
 *
 * @param key - The key of the item to retrieve from local storage.
 * @returns The parsed value of the item, or `null` if the item is not found or an error occurs.
 */
function getFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  }
}


/**
 * Stores a value in the browser's local storage under the specified key.
 *
 * @param key - The key to use for storing the value in local storage.
 * @param value - The value to store in local storage.
 */
function setToLocalStorage(key: string, value: any) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item to localStorage:', error);
    }
  }
}


/**
 * Deletes an item from the browser's local storage.
 *
 * @param key - The key of the item to delete from local storage.
 */
function deleteFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting item from localStorage:', error);
    }
  }
}

const findLsProductById = (id: string, lsCartState: CartState) => lsCartState.cartProducts.find((product) => product.id === id)
function removeEmptyKeys(obj: any): any {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
      return obj.map(removeEmptyKeys)
          .filter(item => item !== null && item !== undefined && item !== '');
  }
  if (typeof obj === 'object') {
      return Object.fromEntries(
          Object.entries(obj)
              .map(([key, value]): [string, any] => [key, removeEmptyKeys(value)])
              .filter(([key, value]) => value !== null && value !== undefined && value !== '')
      );
  }

  return obj;
}
function formatAmountForStripe(amount: number,currency: string): number {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}


export {
  cn,
  timeSince,
  extractErrorValues,
  pluralize,
  getColorAttributes,
  formatMoney,
  getUserAvatar,
  getFromLocalStorage,
  formatAmountForStripe,
  setToLocalStorage,
  deleteFromLocalStorage,
  findLsProductById,
  removeEmptyKeys
};