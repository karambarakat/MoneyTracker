"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _crypto = _interopRequireDefault(require("crypto"));
var _uuid = require("uuid");
var _tokens = require("./..\\utils\\tokens");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  displayName: {
    type: String,
    default: function () {
      return 'user-' + (0, _uuid.v4)().split('-')[0];
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'not a valid email'
    },
    index: true,
    unique: true
  },
  // @ts-ignore
  providers: {
    type: Array,
    required: true,
    validate: {
      validator: function (providers) {
        return !providers.some(provider => provider !== 'google' && provider !== 'local');
      },
      message: 'either google or local'
    }
  },
  googleInfo: {
    type: _mongoose.default.Schema.Types.Mixed
  },
  password: {
    type: String
  },
  picture: {
    type: String
  }
}, {
  timestamps: true
});

/**
 * validation: require password if the provider is local
 * @tested : AUTH_EMAIL > "/auth/local/register : no password"
 */
UserSchema.pre('save', async function (next) {
  if (this.providers.some(provider => provider === 'local')) {
    if (!this.password) {
      const error = new Error('user validation failed: password is required field');
      error.name = 'ValidationError';
      // @ts-ignore
      error.errors = {
        password: {
          name: 'validatorError',
          message: 'password is required field'
        }
      };
      next(error);
    } else next();
  } else next();
});

/**
 * methods attached to any instance of User, used to generate token, match password
 */
UserSchema.methods.doc = function () {
  delete this._doc.password;
  delete this._doc.googleInfo;
  return {
    ...this._doc,
    token: (0, _tokens.generateToken)(this._id, this.email)
  };
};
UserSchema.methods.matchPasswords = function (given) {
  const salt = process.env.SALT;
  const hash = _crypto.default.pbkdf2Sync(given, salt, 100, 64, 'sha512').toString('hex');
  return hash === this.password;
};

/**
 * hashing of the password before saving to the database
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();else {
    const salt = process.env.SALT;
    this.password = _crypto.default.pbkdf2Sync(this.password, salt, 100, 64, 'sha512').toString('hex');
  }
});
UserSchema.pre('updateOne', async function (next) {
  if (!this._update.password) next();else {
    const salt = process.env.SALT;
    this._update.password = _crypto.default.pbkdf2Sync(this._update.password, salt, 100, 64, 'sha512').toString('hex');
  }
});
const user = _mongoose.default.model('user', UserSchema);
const m = new user();
m.matchPasswords;
m._id;
var _default = _mongoose.default.model('user', UserSchema);
exports.default = _default;