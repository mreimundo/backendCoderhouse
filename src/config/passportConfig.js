const { generateHash, isValidPassword } = require('../utils/bcryptUtils')
const passport = require('passport')
const local = require('passport-local')
const jwt = require('passport-jwt')
const github = require('passport-github2')
const CartManagerMDB = require('../dao/mongoManagers/cartManager')
const UserManagerMDB = require('../dao/mongoManagers/userManager')
const { logRed } = require('../utils/consoleUtils')
const { cookieExtractor } = require('../utils/sessionUtils')
const { SECRET_KEY } = require('../constants/sessionConstants')

const usersDao = new UserManagerMDB()
const cartsDao = new CartManagerMDB()

const LocalStrategy = local.Strategy
const GithubStrategy = github.Strategy
const JwtStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () =>{
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done)=>{
            const { name, lastName, email, age } = req.body
            if(!name || !lastName || !age || !email || !password){
                console.log('missing fields');
                return done(null, false)
            }
            try {
                const user = await usersDao.getByEmail(username)
                const cart = await cartsDao.addCart()
                if(user){
                    logRed('User already exist');
                    return done(null, false, 'User already exist')
                }
                const newUser = {
                    name,
                    lastName, 
                    email,
                    age,
                    password: generateHash(password),
                    cart: cart._id
                }
                let result = await usersDao.addUser(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error getting user: ' + error)
            }
        }

    )),
    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async(username, password, done) =>{
            try {
                const user = await usersDao.getByEmail(username)
                if(!user){
                    return done(null, false, 'user not found')
                }
                if(!isValidPassword(user, password)){
                    return done(null, false, 'wrong password')
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use(
        new GithubStrategy({
            clientID: 'Iv1.52a3edb5ca3da766',
            clientSecret: '2890f4b8c136344a261390873774a0216b337bd2',
            callbackURL: 'http://localhost:8080/api/session/github/callback'
        },
        async (accessToken, refreshToken, profile, done)=>{
            try {
                const userData = profile._json
                const user = await usersDao.findOne({ email: userData.email})
                if(!user){
                    const newUser = {
                        name: userData.name.split(' ')[0],
                        lastName: userData.name.split(' ')[1],
                        age: userData.age || 0,
                        email: userData.email || ' ',
                        password: ' ',
                        githubLogin: userData.login,
                        cart: cart._id
                    }
                    const response = usersDao.create(newUser)
                    const userResponse = response._doc
                    done(null, userResponse)
                    return
                }else{
                    done(null, user)
                }
            } catch (error) {
                console.log('Github login error: ' + error);
                done(error)
            }
        }
    ))
    
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY
    }, async (jwt_payload, done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
    const user = await usersDao.findById(id);
    done(null, user);
});

module.exports = initializePassport