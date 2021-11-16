import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  console.log("🚀 ~ Search ~ term", term);
  const [results, setResults] = useState([]);
  console.log("🚀 ~ Search ~ results", results);

  useEffect(() => {
    const search = async (term) => {
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
      search(term);
    }
  }, [term]);

  const renderedResults = results.map((results) => {
    return (
      <div key={results.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`http://en.wikipedia.org?curid=${results.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{results.title}</div>
          <spn dangerouslySetInnerHTML={{ __html: results.snippet }}></spn>
        </div>
      </div>
    );
  });

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
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
