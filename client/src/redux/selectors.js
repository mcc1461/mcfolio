import { createSelector } from "reselect";

// Input selector
const selectPortfolioData = (state) => state.root.portfolioData;

// Memoized selector for projects
export const selectMemoizedProjects = createSelector(
  [selectPortfolioData],
  (portfolioData) => {
    return [...(portfolioData?.projects || [])].sort(
      (a, b) => a.order - b.order
    );
  }
);

// Memoized selector for experiences
export const selectMemoizedExperiences = createSelector(
  [selectPortfolioData],
  (portfolioData) => {
    return [...(portfolioData?.experiences || [])].sort(
      (a, b) => a.order - b.order
    );
  }
);

// Memoized selector for skills
export const selectMemoizedSkills = createSelector(
  [selectPortfolioData],
  (portfolioData) => {
    return [...(portfolioData?.abouts[0]?.skills || [])].sort(); // Assuming skills are nested
  }
);
