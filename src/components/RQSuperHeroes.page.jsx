import React, { useState } from "react";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
    // if (data.data.length == 4 && data) {
    //   setInterval(false);
    // }
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
    // if (error) {
    //   setInterval(false);
    // }
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    isError: addIsError,
    error: addError,
    isLoading: addIsLoading,
  } = useAddSuperHeroData();

  const handleAddHero = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  console.log({
    isLoading,
    isFetching,
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      {addIsLoading && <h1>adding data.....</h1>}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>add hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
          </div>
        );
      })}

      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroesPage;
