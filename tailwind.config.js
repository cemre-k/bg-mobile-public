/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Koyu Tema (Varsayılan)
                "header-bg": "var(--header-bg, #2E2E2E)",
                "card-bg": "var(--card-bg, #0a0a0a)",
                background: "var(--background, #0a0a0a)",
                "text-color": "var(--text-color, #FFFFFF)",
                "card-info-bar-bg": "var(--card-info-bar-bg, #0d1117)",
                "card-stats-bg": "var(--card-stats-bg, #0d1117)",
                "card-profile-bg": "var(--card-profile-bg, #0d1117)",
                "card-body-bg": "var(--card-body-bg, #0d1117)",
                "search-box-bg": "var(--search-box-bg, #151515)",
                "border-color": "var(--border-color, #1f2937)",
                "secondary-text": "var(--secondary-text, #E0E0E0)",
                "icon-color": "var(--icon-color, #94a3b8)",

                // Landing Sayfası
                "landing-bg": "var(--landing-bg, #0a0a0a)",
                "landing-text": "var(--landing-text, #FFFFFF)",
                "landing-secondary-text":
                    "var(--landing-secondary-text, rgba(255, 255, 255, 0.9))",
                "landing-nav-bg":
                    "var(--landing-nav-bg, rgba(255, 255, 255, 0.1))",
                "landing-nav-border":
                    "var(--landing-nav-border, rgba(255, 255, 255, 1))",
                "landing-step-bg":
                    "var(--landing-step-bg, rgba(255, 255, 255, 0.05))",
                "landing-step-border":
                    "var(--landing-step-border, rgba(255, 255, 255, 0.1))",
                "landing-step-text": "var(--landing-step-text, #FFFFFF)",

                // Form Elemanları
                "input-bg": "var(--input-bg, #212121)",
                "input-background": "var(--input-background, #212121)",
                "text-secondary": "var(--text-secondary, #94a3b8)",
                "placeholder-color": "var(--placeholder-color, #94a3b8)",
                "button-secondary-bg": "var(--button-secondary-bg, #2E2E2E)",
                "button-secondary-border":
                    "var(--button-secondary-border, #1f2937)",
                "button-secondary-text":
                    "var(--button-secondary-text, #E0E0E0)",
                "button-secondary-hover-bg":
                    "var(--button-secondary-hover-bg, #3E3E3E)",
                "button-secondary-hover-border":
                    "var(--button-secondary-hover-border, #2f3a48)",

                // Badge Renkleri
                "badge-acik-bg":
                    "var(--badge-acik-bg, rgba(16, 185, 129, 0.2))",
                "badge-acik-color": "var(--badge-acik-color, #10b981)",
                "badge-ozel-bg":
                    "var(--badge-ozel-bg, rgba(88, 166, 255, 0.2))",
                "badge-ozel-color": "var(--badge-ozel-color, #58a6ff)",
                "badge-ucretli-bg":
                    "var(--badge-ucretli-bg, rgba(249, 197, 19, 0.2))",
                "badge-ucretli-color": "var(--badge-ucretli-color, #f9c513)",
                "primary-color": "var(--primary-color, #00de46c9)",

                // Chat & Messages
                "chat-bg": "var(--chat-bg, #0a0a0a)",
                "message-bg": "var(--message-bg, #1a1a1a)",
            },
        },
    },
    plugins: [],
};
