'use client';

import { Search, X } from 'lucide-react';
import React, { useRef } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import Typewriter from 'typewriter-effect';
import { cn } from './lib/utils';

interface SearchInputProps<T> {
  className?: string;
  urlPath?: string;
  placeholderExamples?: string[];
  onSearch: (query: string) => Promise<T[]>;
  renderItem: (item: T, onClick: () => void) => React.ReactNode;
  noResultsText?: string;
}

export function SearchInput<T>({
  className,
  urlPath = '',
  placeholderExamples = ['Пошук...'],
  onSearch,
  renderItem,
  noResultsText = 'Нічого не знайдено 😢',
}: SearchInputProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [results, setResults] = React.useState<T[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = React.useRef(null);

  useClickAway(containerRef, () => setFocused(false));
  React.useEffect(() => {
    onSearch('').then((response) => {
      if (response && response.length > 0) {
        setResults(response);
      } else {
        setResults([]);
      }
    }).catch(() => setResults([]));
  }, [onSearch]);

  useDebounce(
    async () => {
      if (!searchQuery) {
        setResults([]);
        return;
      }

      try {
        const response = await onSearch(searchQuery);

        if (!response || response.length === 0) {
          setResults([]);
        } else {
          setResults(response);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setResults([]);
  };

  const handlePlaceholderClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

      <div
        ref={containerRef}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        {searchQuery.length > 0 && (
          <X
            aria-label="Очистити пошук"
            className="absolute top-1/2 translate-y-[-50%] right-3 h-5 text-gray-400"
            onClick={() => setSearchQuery('')}
          />
        )}

        <input
          ref={inputRef}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          value={searchQuery}
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {!searchQuery && !focused && (
          <div
            className="absolute top-1/2 left-11 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            onClick={handlePlaceholderClick}>
            <Typewriter
              options={{
                strings: placeholderExamples,
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                cursor: '|',
                cursorClassName: 'text-gray-400',
                wrapperClassName: 'text-sm',
              }}
            />
          </div>
        )}

        {focused && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}>
            {results.length > 0 ? (
              results.map((item, idx) => (
                <div key={idx}>{renderItem(item, onClickItem)}</div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">{noResultsText}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
