// export const swapiGetterAPI = id => {
//   axios
//     .get(`https://swapi.dev/api/people/${id}/`)
//     .then(res => {
//       console.log('swapiGetterAPI then:', res, res.data.name)
//       return res.data.name
//     })
//     .catch(error => console.log(error))
// }
import axios from 'axios'

export const swapiGetterAPI = async id => {
  const res = await axios.get(`https://swapi.dev/api/people/${id}/`)
  // // swapiGetterAPI then: { data: { name: 'Luke Skywalker' } } Luke Skywalker
  // console.log('swapiGetterAPI then:', res, res.data.name)
  return res.data.name
}
