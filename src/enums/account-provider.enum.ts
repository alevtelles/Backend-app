export const ProviderEnum = {
    GOOGLE: "google",
    GITHUB: "github",
    LINKEDIN: "linkedin",
    EMAIL: "email",
    FACEBOOK: "facebook",
}

export type ProviderEnumType = keyof typeof ProviderEnum;