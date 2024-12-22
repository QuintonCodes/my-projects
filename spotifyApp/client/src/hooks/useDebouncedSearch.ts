import { useEffect, useRef, useState } from "react";

const useDebouncedSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const timeoutRef = useRef<number | undefined>(undefined);

  const debouncedSetSearchQuery = (query: string) => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setSearchQuery(query);
    }, 300);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    debouncedSetSearchQuery(query);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { searchQuery, handleSearchInputChange };
};

export default useDebouncedSearch;
