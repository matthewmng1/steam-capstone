import React, { useEffect, useState } from "react";
import "./SearchAppsForm.css"

function SearchAppsForm({ searchFor }){
  console.debug(
    "SearchAppsForm",
    "searchFor=", typeof searchFor,
  )

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const prevSearchTerm = localStorage.getItem("searchTerm");
    if(prevSearchTerm){
      setSearchTerm(prevSearchTerm);
      searchFor(prevSearchTerm.trim() || undefined);
    }
  }, [])

 function handleSubmit(e){
    e.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    localStorage.setItem("searchTerm", searchTerm.trim())
  }

  function handleChange(e){
    setSearchTerm(e.target.value);
  }

  return (
    <div className="searchform">
      <form onSubmit={handleSubmit}>
        <input
            className="searchform-input form-control form-control-lg flex-grow-1"
            name="searchTerm"
            placeholder="Search Steam Games..."
            value={searchTerm}
            onChange={handleChange}
        />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
    </div>
  )
}

export default SearchAppsForm;