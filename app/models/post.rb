class Post < ApplicationRecord
  has_many_attached :images, dependent: :destroy
  has_one_attached :banner, dependent: :destroy

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags, dependent: :destroy
  has_many :likes, dependent: :destroy

  after_destroy :destroy_attached_banner

  protected

  def destroy_attached_banner
    self.banner.purge if self.banner.attached?
  end
end
