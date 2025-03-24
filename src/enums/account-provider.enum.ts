export const ProviderEneum = {
    GOOGLE: "google",
    GITHUB: "github",
    LINKEDIN: "linkedin",
    EMAIL: "email",
    FACEBOOK: "facebook",
}

export type ProviderEnumType = keyof typeof ProviderEneum;