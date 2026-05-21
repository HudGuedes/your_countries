class CustomCountry < ActiveRecord::Base
  belongs_to :user

  before_validation :normalize_code

  validates :name, presence: true
  validates :code, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 3 }
  validates :region, presence: true
  validates :user_id, presence: true
  validates :population, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  def as_json(options = {})
    {
      id: id,
      name: name,
      capital: capital,
      region: region,
      population: population,
      flag: flag,
      flag_svg: nil,
      code: code,
      code_2: code&.slice(0, 2),
      currencies: [],
      source: 'custom'
    }
  end

  private

  def normalize_code
    self.code = code&.upcase&.strip
  end
end
