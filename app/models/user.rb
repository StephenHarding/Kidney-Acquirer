class User < ApplicationRecord
	has_many :high_scores
  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end
    def password=(raw_password)
    self.password_digest = BCrypt::Password.create(raw_password)
  end
    def self.find_from_credentials(username, password)
    user = find_by(username: username) # same as User.find_by( ... )
    return nil unless user
    user if user.is_password?(password)
  end
  validates :password, length: (8..20), allow_nil: true
  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
end
