class RemoveTagsFieldFromPosts < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :tags
  end
end
