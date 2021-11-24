import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  console.log("🚀 ~ Search ~ term", term);
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
      console.log("🚀 ~ search ~ data", data);
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutid = setTimeout(() => {
        console.log("🚀 ~ timeoutid ~ setTimeout", setTimeout);
        if (term) {
          search();
        }
      }, 1000);

      return () => {
        clearTimeout(timeoutid);
        console.log("🚀 ~ return ~ clearTimeout", clearTimeout);
      };
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
