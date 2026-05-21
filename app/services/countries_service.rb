class CountriesService
  include HTTParty
  base_uri 'https://restcountries.com/v3.1'
  default_timeout 5

  def self.all_countries
    fields = 'name,capital,region,population,flags,cca3,cca2,currencies'
    response = get("/all?fields=#{fields}")

    if response.success?
      { success: true, data: format_countries(response.parsed_response) }
    else
      { success: false, error: 'Failed to fetch countries', status: response.code }
    end
  rescue StandardError => e
    { success: false, error: e.message, status: 503 }
  end

  def self.by_name(name)
    response = get("/name/#{name}")

    if response.success?
      { success: true, data: format_country(response.parsed_response.first) }
    else
      { success: false, error: 'Country not found', status: response.code }
    end
  rescue StandardError => e
    { success: false, error: e.message, status: 503 }
  end

  def self.by_code(code)
    response = get("/alpha/#{code}")

    if response.success?
      country_data = response.parsed_response
      country_data = country_data.first if country_data.is_a?(Array)
      { success: true, data: format_country(country_data) }
    else
      { success: false, error: 'Country not found', status: response.code }
    end
  rescue StandardError => e
    { success: false, error: e.message, status: 503 }
  end

  private

  def self.format_countries(countries)
    countries.map { |country| format_country(country) }
  end

  def self.format_country(country)
    {
      name: country.dig('name', 'common'),
      capital: country['capital']&.first,
      region: country['region'],
      population: country['population'],
      flag: country.dig('flags', 'png'),
      flag_svg: country.dig('flags', 'svg'),
      code: country['cca3'],
      code_2: country['cca2'],
      currencies: format_currencies(country['currencies'])
    }
  end

  def self.format_currencies(currencies)
    return [] unless currencies

    currencies.map do |code, data|
      {
        code: code,
        name: data['name'],
        symbol: data['symbol']
      }
    end
  end
end
