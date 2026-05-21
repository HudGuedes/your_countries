class CreateCustomCountries < ActiveRecord::Migration
  def change
    create_table :custom_countries do |t|
      t.string :name
      t.string :capital
      t.string :region
      t.integer :population
      t.string :flag
      t.string :code
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
