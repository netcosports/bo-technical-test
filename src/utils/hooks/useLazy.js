import { useEffect, useState } from 'react';

import useDebounce from './useDebounce';

/**
 * hook to fetch data with pagination
 * @param api the api endpoint
 * @param limit the number of items to fetch
 * @param selectApi the api endpoint to feed the select dropdown filter
 * @param filterKeys object - the keys on which to apply the filters
 * @param additionalQueries object - some additional queries to use on the main api endpoint
 * @return {Object}
 */

const useLazy = (api, limit, selectApi, filterKeys, additionalQueries = {}) => {
  const [data, setData] = useState([]);
  const [afterCursor, setAfterCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [selectFilter, setSelectFilter] = useState('all');
  const [filter, setFilter] = useState('');
  const [baseQueries, setBaseQueries] = useState({ ...additionalQueries, limit: limit || 10 });

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const {
        items,
        cursor: { after },
      } = await api.findAll(baseQueries);

      setAfterCursor(after);
      setData(items);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchMoreData = async () => {
    const queries = { ...baseQueries, after: afterCursor };
    if (!!afterCursor) {
      try {
        const {
          items,
          cursor: { after },
        } = await api.findAll(queries);

        setAfterCursor(after);
        setData([...data, ...items]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  const fetchInitialData = async () => {
    const dataForSelect = await selectApi.findAll();
    setSelectData(dataForSelect);
  };

  const refreshList = () => {
    setData([]);
    setAfterCursor(null);
    fetchInitialData();
    fetchData();
  };

  const updateQueries = (q) => {
    setBaseQueries(q);
  };

  const queryUpdate = useDebounce(updateQueries, 500);

  const updateFilter = (value) => {
    setFilter(value);
    const { main } = filterKeys;
    const initialQueries = { ...baseQueries };

    if (filter !== '') {
      initialQueries[main] = value;
    } else if (!!initialQueries[main]) {
      delete initialQueries[main];
    }
    queryUpdate(initialQueries);
  };

  const updateSelectFilter = (value) => {
    const { select } = filterKeys;
    const initialQueries = { ...baseQueries };

    if (value !== 'all') {
      initialQueries[select] = value;
    } else if (!!initialQueries[select]) {
      delete initialQueries[select];
    }
    setBaseQueries(initialQueries);

    setSelectFilter(value);
  };

  useEffect(() => {
    fetchData();
  }, [baseQueries]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  return {
    data,
    fetchMoreData,
    isLoading,
    selectData,
    refreshList,
    selectFilter,
    filter,
    setFilter,
    updateSelectFilter,
    updateFilter,
  };
};

export default useLazy;
