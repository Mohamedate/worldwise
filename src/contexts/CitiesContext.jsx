import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const ourCities = [
  {
    cityName: "Cairo",
    country: "Egypt",
    date: "2023-08-04T07:13:44.345Z",
    notes: "",
    position: {
      lat: "30.06476805606543",
      lng: "31.256103515625004",
    },
    id: 1,
  },
  {
    cityName: "Medina",
    country: "Saudi Arabia",
    date: "2023-08-04T07:14:02.506Z",
    notes: "",
    position: {
      lat: "24.491118927260423",
      lng: "39.66064453125001",
    },
    id: 2,
  },
  {
    cityName: "Sanaa",
    country: "Yemen",
    date: "2023-08-04T07:14:09.185Z",
    notes: "",
    position: {
      lat: "15.308218502032851",
      lng: "44.23095703125001",
    },
    id: 3,
  },
];

const initialState = {
  cities: ourCities,
  isLoading: false,
  currentCity: {},
  error: "",
  idGenerate: 5,
};

function reducer(state, { type, payloads }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "citiesLoaded":
      return { ...state, isLoading: false, cities: payloads };
    case "cityLoaded":
      return { ...state, isLoading: false, currentCity: payloads };
    case "cityCreated":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, payloads],
        currentCity: payloads,
        idGenerate: state.idGenerate + 5,
      };

    case "deleteCity":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payloads),
        currentCity: {},
      };

    case "regected":
      return { ...state, isLoading: false, error: payloads };

    default:
      throw new Error("unknown action");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, idGenerate }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // useEffect(() => {
  //   async function fetchCities() {
  //     dispatch({ type: "loading" });
  //     try {
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();

  //       dispatch({ type: "citiesLoaded", payloads: data });
  //     } catch {
  //       dispatch({
  //         type: "regected",
  //         payloads: "there is error in fetch data",
  //       });
  //     }
  //   }
  //   fetchCities();
  // }, []);

  function getCity(id) {
    dispatch({ type: "loading" });
    const city = cities.filter((city) => city.id == id).at(0);

    dispatch({ type: "cityLoaded", payloads: city });
  }

  function createCity(newCity) {
    const finalNewCity = {
      id: idGenerate + 1,
      ...newCity,
    };
    dispatch({ type: "cityCreated", payloads: finalNewCity });
  }

  function deleteCity(id) {
    dispatch({ type: "deleteCity", payloads: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        idGenerate,
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("the context used in outside the provider");
  return context;
};
export { useCities, CitiesProvider };
