class Post < ApplicationRecord
  has_many_attached :images
  has_one_attached :banner
  has_rich_text :content

  belongs_to :user
  has_many :comments
  has_many :post_tags
  has_many :tags, through: :post_tags
end
