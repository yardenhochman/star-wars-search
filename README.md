# Star Wars repository

## Quick start

To run this project please run

```js
pnpm i && pnpm dev

```

Or any prefered package manager.
next open [Local Host URL](http://localhost:5173)

## Stack and libraries:

- Vite Typescript setup
- React Query
- React Router
- React Spectrum

## Notes and considerations

### Component and Page files:

I realize some teams like to keep files very short and split code into many different files. I realize the CategoryPage file would be considered big for some teams, and so I would say, I don't think there is a clear cut decision here. I would shorten it if that were the style of the company/group/team I'm currently working with. Personally I always try to strike a balance between having relevant logic in front of the developer so he doesn't need to search through too many files to find out what is happening, not to mention over abstraction, with having too long files that can make us developers tired.

Examples:

- Category page has almost all its logic self contained, since it is not reused anywhere else. Person Form though, is in a separate file since it is used twice - once to add and once to edit the table.
- Search page - API logic is in a separate file, and so is the useFilteredList hook, just to make the file a tad smaller. Some teams might have actually preferred to keep the logic here rather than in a separate file.

### Form handling

Nowdays I tend to move into sticking to web fundamentals and utilizing the formData web standard. At least when nothing too dynamic is happening. An example of this is the search input in the homepage, which updates the state on each keystroke, whereas in the PersonForm in comparison, the JS state is only updated once save is clicked via form submission (which has the added advantage that "enter" and "space" keys also work out of box).

### Optimizations

Of course, with how the Category page dynamically receives its params, it would have been easy to make all the other tables.

I would have like to use debounce for the searchTerm. I played around with useDeferredValue, but it introduced a bug and I decided it wasn't worth the hassle as I needed to move on to other projects.
