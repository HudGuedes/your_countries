class AddNotNullConstraintsToCustomCountries < ActiveRecord::Migration
  def change
    change_column_null :custom_countries, :name, false
    change_column_null :custom_countries, :code, false
    change_column_null :custom_countries, :region, false
    change_column_null :custom_countries, :user_id, false
  end
end
