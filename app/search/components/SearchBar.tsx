import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [query, setQuery] = useState<string>('')
    const router = useRouter()

    function handleQuery(e:any) {
        setQuery(e.target.value)
    }

    function handleQuerySearch() {
        //take in the user query and redirect.
        if(query.trim()) {
            router.push(`/results?query=${encodeURIComponent(query)}`)
        }

    }



  return (
    <div className="w-full max-w-xl bg-white/10 rounded-lg p-4 shadow-md mb-6 transition-all hover:bg-white/20 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search for a song, artist, or mood..."
        className="w-full p-3 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
        value={query}
        onChange={(e) => handleQuery(e)}
      />
      <button
        className="bg-pink-600 text-white py-2 px-4 rounded-md font-semibold transition-all hover:bg-pink-700 focus:ring-2 focus:ring-pink-400"
        onClick={handleQuerySearch}
      >
        Enter
      </button>
    </div>
  );
};

export default SearchBar;
