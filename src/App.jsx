import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroesPage from "./components/SuperHeroes.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import DynamicParallelPage from "./components/DynamicParallel.page";
import DependentQueriesPage from "./components/DependentQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import InfiniteQueriesPage from "./components/InfiniteQueryies.page";

const queryClient = new QueryClient();

function App() {
  const routes = [
    { path: "/rq-super-heroes/:heroId", element: <RQSuperHeroPage /> },
    { path: "/super-heroes", element: <SuperHeroesPage /> },
    { path: "/rq-parallel", element: <ParallelQueriesPage /> },
    {
      path: "/rq-dynamic-parallel",
      element: <DynamicParallelPage heroIds={[1, 3]} />,
    },
    {
      path: "/rq-dependent-queries",
      element: <DependentQueriesPage email="vishwas@example.com" />,
    },
    {
      path: "/rq-paginated",
      element: <PaginatedQueriesPage />,
    },

    {
      path: "/rq-infinite",
      element: <InfiniteQueriesPage />,
    },

    {
      path: "/rq-super-heroes",
      element: <RQSuperHeroesPage />,
    },
    { path: "/", element: <HomePage /> },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">RQ Dynamic Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dependent-queries">RQ Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            {routes.map((route, index) => {
              return <Route key={index} {...route} />;
            })}
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
