import User from "@models/User"
import passport from "passport"

export default function () {

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        async function main() {
            const user = await User.findById(id)
            user ? done(null, user) : done(null, false)
        }
        main().catch((e) => done(e, false))
    })
}


