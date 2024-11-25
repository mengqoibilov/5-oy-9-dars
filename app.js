
function populateRegions() {
  const regions = ["", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const regionFilter = document.getElementById("regionFilter");

  regions.forEach(region => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region || "Filter by Region";
      regionFilter.appendChild(option);
  });
}


function fetchCountries() {
  return fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(countries => countries);
}

function displayCountries(countries) {
  const container = document.getElementById("countriesContainer");
  container.innerHTML = '';
  countries.forEach(country => {
      const card = document.createElement('div');
      card.className = 'country-card';
      card.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common}">
          <h3>${country.name.common}</h3>
          <p>Region: ${country.region}</p>
          <p>Population: ${country.population.toLocaleString()}</p>
      `;
      container.appendChild(card);
  });
}

function filterAndSearch(countries) {
  const searchInput = document.getElementById("searchInput");
  const regionFilter = document.getElementById("regionFilter");

  function applyFilters() {
      const searchText = searchInput.value.toLowerCase();
      const selectedRegion = regionFilter.value;

      const filteredCountries = countries.filter(country => {
          const matchesSearch = country.name.common.toLowerCase().includes(searchText);
          const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
          return matchesSearch && matchesRegion;
      });

      displayCountries(filteredCountries);
  }

  searchInput.addEventListener("input", applyFilters);
  regionFilter.addEventListener("change", applyFilters);
}


populateRegions();
fetchCountries().then(countries => {
  displayCountries(countries);
  filterAndSearch(countries);
});

document.getElementById("toggleMode").addEventListener("click", () => {

  document.body.classList.toggle("light-mode");


  const header = document.querySelector("header");
  const searchContainer = document.querySelector(".search-container");
  const countriesContainer = document.getElementById("countriesContainer");

  header.classList.toggle("light-mode");
  searchContainer.classList.toggle("light-mode");
  countriesContainer.classList.toggle("light-mode");


  const countryCards = document.querySelectorAll(".country-card");
  countryCards.forEach((card) => {
    card.classList.toggle("light-mode");
  });
});
