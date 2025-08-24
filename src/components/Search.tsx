import { h } from 'preact';
import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import Fuse from 'fuse.js';

// The component receives the search data (allPosts) as a prop from Astro
export default function Search({ allPosts }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Memoize the Fuse instance for performance.
  // It only re-creates the index if `allPosts` changes.
  const fuse = useMemo(() => {
    const options = {
      keys: ['data.title', 'data.description', 'data.tags'],
      includeScore: true,
      threshold: 0.4,
    };
    return new Fuse(allPosts, options);
  }, [allPosts]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 0) {
      const searchResults = fuse.search(newQuery).slice(0, 5);
      setResults(searchResults);
      setIsExpanded(searchResults.length > 0);
    } else {
      setResults([]);
      setIsExpanded(false);
    }
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isExpanded) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex >= results.length - 1 ? 0 : prevIndex + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex <= 0 ? results.length - 1 : prevIndex - 1));
    } else if (e.key === 'Enter' && ((activeIndex !== -1 && results[activeIndex]) || results.length != 0)) {
      e.preventDefault();
      if (activeIndex !== undefined && activeIndex !== -1) window.location.href = `/blog/${results[activeIndex].item.slug}`;
      else window.location.href = `/blog/${results[0].item.slug}`;
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      setActiveIndex(-1);
    }
  };

  // Effect for global hotkeys (CMD+K or /)
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const tag = document.activeElement.tagName.toLowerCase();
      if (['input', 'textarea'].includes(tag)) return;
      if (event.key === '/' || ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Effect to handle clicks outside to close the results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    // Make width responsive: full on mobile, fixed on medium screens up
    <div className="relative w-full md:w-96" ref={resultsContainerRef}>
      <input
        ref={searchInputRef}
        id="search"
        className="search justify-self-end py-1 px-2 bg-transparent text-right hover:bg-[#1e1b4b] focus:bg-[#1e1b4b] focus:outline-none w-full"
        style={{ '::-webkit-search-cancel-button': '{ padding-left: 0.5rem; }' }}
        type="search"
        placeholder="🔎 CTRL + K or /"
        value={query}
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="autocomplete-results"
        aria-expanded={isExpanded}
        aria-activedescendant={activeIndex > -1 ? `result-item-${activeIndex}` : undefined}
      />
      {isExpanded && (
        <div id="autocomplete-results" role="listbox" className="absolute z-10 w-full bg-[#1e1b4b] shadow-lg">
          {results.map((result, index) => (
            <a
              key={result.item.slug}
              href={`/blog/${result.item.slug}`}
              id={`result-item-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              className={`block border-bottom border-indigo-900 p-4 cursor-pointer !no-underline ${activeIndex === index ? 'bg-[#2a275a]' : 'hover:bg-[#2a275a]'}`}
            >
              <div className="text-sm font-bold">{result.item.data.title}</div>
              <div className="flex gap-2 mt-2">
              {result.item.data.tags.map(tag => (
                <span class="bg-indigo-900 text-blue-200 px-1 py-1 text-xs rounded-full">
                  #{tag}
                </span>
              ))}</div>
              <div className="mt-4 text-xs text-gray-400 no-underline">{result.item.data.description}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
