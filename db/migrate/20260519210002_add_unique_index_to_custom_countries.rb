class AddUniqueIndexToCustomCountries < ActiveRecord::Migration
  def change
    add_index :custom_countries, [:user_id, :code], unique: true, name: 'index_custom_countries_on_user_id_and_code'
  end
end
