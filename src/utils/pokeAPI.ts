import got from "got";
const base: string = "https://pokeapi.co/api/v2";

export const getPokeApi = async (name: string, endPoint: string) => {
  try {
    const res = await got(base + endPoint + name);
    return JSON.parse(res.body);
  } catch (error) {
    console.log(error);
  }
};
