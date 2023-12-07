import { useState } from "react";
import classes from "./Search.module.css"
export default function Search({ onSearch }: { onSearch: (s: string) => void }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');

  const searchWithoutRepeat = (search: string) => {
    if (search === lastSearchTerm) return;

    setLastSearchTerm(search)
    onSearch(search)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={classes.background}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onKeyPress={handleKeyPress}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => searchWithoutRepeat(searchTerm)}> Search </button>
    </div>
  );
}
