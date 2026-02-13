import { useState, useCallback } from 'react';

export default function useFilterState() {
  const [filters, setFilters] = useState({
    'Name': { included: [], excluded: [] },
    'Job title': { included: [], excluded: [] },
    'Company': { included: [], excluded: [] },
    'Location': { included: [], excluded: [] },
    'Industry': { included: [], excluded: [] },
    'Seniority': { included: [], excluded: [] },
    'Department': { included: [], excluded: [] },
    'Tech Stack': { included: [], excluded: [] },
    'Lookalike': { included: [], excluded: [] },
  });

  const toggleInclude = useCallback((filterName, itemId) => {
    setFilters(prev => {
      const f = prev[filterName];
      const isIncluded = f.included.includes(itemId);
      return {
        ...prev,
        [filterName]: {
          included: isIncluded ? f.included.filter(i => i !== itemId) : [...f.included, itemId],
          excluded: f.excluded.filter(i => i !== itemId),
        }
      };
    });
  }, []);

  const toggleExclude = useCallback((filterName, itemId) => {
    setFilters(prev => {
      const f = prev[filterName];
      const isExcluded = f.excluded.includes(itemId);
      return {
        ...prev,
        [filterName]: {
          included: f.included.filter(i => i !== itemId),
          excluded: isExcluded ? f.excluded.filter(i => i !== itemId) : [...f.excluded, itemId],
        }
      };
    });
  }, []);

  const removeInclude = useCallback((filterName, itemId) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        included: prev[filterName].included.filter(i => i !== itemId),
      }
    }));
  }, []);

  const removeExclude = useCallback((filterName, itemId) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        excluded: prev[filterName].excluded.filter(i => i !== itemId),
      }
    }));
  }, []);

  const getFilter = useCallback((filterName) => filters[filterName] || { included: [], excluded: [] }, [filters]);

  const getActiveCount = useCallback(() => {
    return Object.values(filters).reduce((count, f) => count + f.included.length + f.excluded.length, 0);
  }, [filters]);

  const resetAll = useCallback(() => {
    setFilters(prev => {
      const reset = {};
      Object.keys(prev).forEach(key => {
        reset[key] = { included: [], excluded: [] };
      });
      return reset;
    });
  }, []);

  return { filters, toggleInclude, toggleExclude, removeInclude, removeExclude, getFilter, getActiveCount, resetAll };
}