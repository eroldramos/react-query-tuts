import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//     return axios.get("http://localhost:4000/superheroes/"+heroId);
//   };

const fetchSuperHero = ({ queryKey }) => {
  let heroId = queryKey[1];
  return axios.get("http://localhost:4000/superheroes/" + heroId);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id == parseInt(heroId));

      console.log(hero);
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
