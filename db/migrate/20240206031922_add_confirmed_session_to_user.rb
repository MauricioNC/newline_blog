class AddConfirmedSessionToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :confirmed_session, :boolean, default: false
  end
end
