import passport from "passport";
import { Request } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./app.config"
import { NotFoundException } from "../utils/appError";
import { ProviderEneum } from "../enums/account-provider.enum";
import { loginOrCreateAccountSercice } from "../services/auth.service";

passport.use(
    new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: true
    }, async (req: Request, accessToken, refreshToken, profile, done) => {
        try {
            const {email, sub: googleId, picture} = profile._json;
            console.log(googleId, "profile")
            console.log(googleId, "googleId")
            if (!googleId){
                throw new NotFoundException("Google ID not found");
            }
            const { user } = await loginOrCreateAccountSercice({
                provider: ProviderEneum.GOOGLE,
                displayName: profile.displayName,
                providerId: googleId,
                picture: picture,
                email: email,
            })
        } catch(error) {
            done(error, false);
        }
    }
    )
);

passport.serializeUser((user: any, done) => done(null, user));

passport.deserializeUser((user: any, done) => done(null, user));