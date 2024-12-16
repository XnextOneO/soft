"use server";

import { headers } from "next/headers";

/**
 * Retrieves the user's locale based on the "Accept-Language" header.
 * Falls back to the default locale if the header is unavailable.
 * @returns {Promise<string>} The short locale code (e.g., "en", "ru").
 */
export async function getUserLocale(): Promise<string> {
  const DEFAULT_LOCALE = "ru"; // Define constants for better readability and maintainability

  try {
    const headersList = headers();
    const acceptLanguage = headersList.get("Accept-Language") || DEFAULT_LOCALE;

    // Parse the locale from the Accept-Language header
    const [localeLong] = acceptLanguage.split(",");
    const [localeShort] = localeLong.split("-");

    return localeShort.toLowerCase();
  } catch (error) {
    console.error("Failed to retrieve user locale:", error);
    return DEFAULT_LOCALE; // Fallback to default locale in case of any errors
  }
}
