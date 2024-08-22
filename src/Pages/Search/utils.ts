import React from "react";
import { Category } from "../../shared/types";
import { getStarWarsEntities } from "../../shared/API";
import { capitalize } from "../../shared/utils";

const RESULTS_PER_CATEGORY = 3;

export const useFilteredList = (
  data: Awaited<ReturnType<typeof getStarWarsEntities>> | undefined,
  searchTerm: string
) => {
  const filteredItems = React.useMemo(() => {
    const options = [
      Category.PEOPLE,
      Category.FILMS,
      Category.STARSHIPS,
      Category.VEHICLES,
      Category.SPECIES,
      Category.PLANETS,
    ].reduce(
      (acc: { name: string; children: { name: string }[] }[], category) => {
        const categoryItems =
          data?.[category]?.results?.slice(0, RESULTS_PER_CATEGORY) ?? [];

        const children = categoryItems.reduce(
          (acc: { name: string }[], item) => {
            const entityName = "name" in item ? item.name : item.title;
            if (!entityName.includes(searchTerm)) {
              return acc;
            }
            return [...acc, { name: entityName }];
          },
          []
        );

        if (children.length === 0) {
          return acc;
        }

        const viewAllItem = {
          name: `View all ${capitalize(category)}`,
          href: `/category/${category}`,
        };
        const categoryObj = {
          name: capitalize(category),
          children: [...children, viewAllItem],
        };

        return [...acc, categoryObj];
      },
      []
    );
    return options;
  }, [data, searchTerm]);
  return filteredItems;
};
