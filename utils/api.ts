const fallbackBaseUrl = "https://example.invalid";

export const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_BASE_URL ?? fallbackBaseUrl;

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

export const buildApiUrl = (path: string) => {
    const normalizedBaseUrl = normalizeBaseUrl(API_BASE_URL);
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${normalizedBaseUrl}${normalizedPath}`;
};
