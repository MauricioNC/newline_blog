class Post < ApplicationRecord
  has_one_attached :image
  has_rich_text :content

  belongs_to :user
  has_many :comments
end
