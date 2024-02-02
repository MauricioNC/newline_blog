class AddBodyFieldToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :body, :text, null: false
  end
end
