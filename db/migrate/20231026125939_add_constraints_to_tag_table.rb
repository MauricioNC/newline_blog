class AddConstraintsToTagTable < ActiveRecord::Migration[7.1]
  def change
    change_column :tags, :tag, :string, null: false, default: nil
  end
end
