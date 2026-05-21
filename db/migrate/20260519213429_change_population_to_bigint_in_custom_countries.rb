class ChangePopulationToBigintInCustomCountries < ActiveRecord::Migration
  def change
    change_column :custom_countries, :population, :bigint
  end
end
