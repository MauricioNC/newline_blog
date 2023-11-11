class ChangeRaitingFieldToOptionalFromPosts < ActiveRecord::Migration[7.1]
  def change
    change_column :posts, :raiting, :string, null: true
  end
end
