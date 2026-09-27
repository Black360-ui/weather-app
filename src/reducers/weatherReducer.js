export const initialWeatherState ={
  city: "",
  country: "",
  temperature: null,
  condition: "",
  weatherIcon: "",
  feelsLike: null,
  humidity: null,
  windSpeed: null,
  pressure: null,
  loading:false,
  error:null,
  forecast: [],
};


export const weatherReducer = (state, action) => {
  switch (action.type){
    case "SET_WEATHER":
      return {
        ...action.payload,
        loading:false,
        error: null,
      }

      case "SET_LOADING":
        return{
          ...state,
          loading:true,
          error: null,
        }
        case"SET_ERROR":
        return{
          ...state,
          loading:false,
          error:action.payload,

        }
        case "STOP_LOADING":
          return {
            ...state,
            loading: false,
          };


      case "RESET_WEATHER":
      return initialWeatherState

      default:
        return state

  }

}

