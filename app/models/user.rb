class User < ApplicationRecord
  has_one :token
  has_many :posts, dependent: :destroy
  has_many :comments, through: :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
end
