require "jwt"

class JwtTokenService
  SECRET_KEY = Rails.application.credentials.secret_key_base

  def self.encode(payload, exp = 1.minutes.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY, 'none')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY, false)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError => e
    e.message
  end
end
