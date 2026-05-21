const countriesService = {
  async getAll(page = 1, perPage = 24, search = '') {
    let url = `/countries?page=${page}&per_page=${perPage}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const data = await api.get(url);
    return data;
  },
};

const customCountriesService = {
  async create(country) {
    const data = await api.post('/custom_countries', { custom_country: country });
    return data.country;
  },

  async update(id, country) {
    const data = await api.put(`/custom_countries/${id}`, { custom_country: country });
    return data.country;
  },

  async delete(id) {
    return await api.delete(`/custom_countries/${id}`);
  },
};
