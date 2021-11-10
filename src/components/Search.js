import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  console.log("🚀 ~ Search ~ results", results);

  useEffect(() => {
    const search = async () => {
      console.log("🚀 ~ search ~ term", term);
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term) {
      search();
    }
  }, [term]);

  return (
    <div>
      <div className="ui form">
        <div className="field"></div>
        <label>Enter Search Term</label>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="input"
        />
      </div>
    </div>
  );
};

export default Search;
