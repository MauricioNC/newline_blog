class AddTitleAndDescriptionToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :title, :string, null: false, default: nil
    add_column :posts, :description, :string, null: false, default: nil
  end
end
