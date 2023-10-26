class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :tags, null: false, array: true, default: []
      t.string :raiting, null: false
      t.text :content, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
