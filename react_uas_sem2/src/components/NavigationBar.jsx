import React, { useState, useEffect, useRef } from "react";
import { Navbar, NavDropdown, Nav, Container, Form, FormControl, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb as faLightbulbBold, faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faLightbulbRegular } from "@fortawesome/free-regular-svg-icons";
import "./styles/NavigationBarStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./styles/Assets/BookhavenLogo.png";
import { useContext } from "react";
        
function NavigationBar({ username }) {
  const [lightModeOn, setLightModeOn] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchOption, setSearchOption] = useState("#");
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();
  

  const showDropdown = (e) => {
    clearTimeout(dropdownTimeout);
    setShow(true);
  };
  
  const hideDropdown = (e) => {
    clearTimeout(dropdownTimeout);
    setDropdownTimeout(setTimeout(() => {
      setShow(false);
    }, 100));
  };

  const showDropdown2 = (e) => {
    clearTimeout(dropdownTimeout);
    setShow2(true);
  };

  const hideDropdown2 = (e) => {
    setTimeout(() => {
      setShow2(false);
    }, 300); // Delay the dropdown menu closing by 0.5 seconds
  };

  const handleBookSearch = async (searchTerm, searchOption) => {
    try {
      let url = `https://openlibrary.org/search.json?`;

      if (searchOption === "inauthor") {
        url += `author=${encodeURIComponent(searchTerm)}`;
      } else if (searchOption === "intitle") {
        url += `title=${encodeURIComponent(searchTerm)}`;
      } else if (searchOption === "inpublisher") {
        url += `publisher=${encodeURIComponent(searchTerm)}`;
      } else {
        url += `q=${encodeURIComponent(searchTerm)}`;
      }

      const response = await axios.get(url);
      console.log(response.data);

      navigate("/Search", { state: { searchData: response.data, searchQuery: searchTerm } });

    } catch (error) {
      console.error(error);
    }
  };

  const lightModeClick = () => {
    setLightModeOn(!lightModeOn);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isNavOpen && window.innerWidth >= 768) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNavOpen]);

  useEffect(() => {
    if (!isNavOpen) {
      const navCollapse = document.getElementById("navCollapse");
      navCollapse.classList.remove("flex-column");
    }
  }, [isNavOpen]);

  const navCollapseClass = isNavOpen
    ? "collapse navbar-collapse show collapsedNav flex-column"
    : "collapse navbar-collapse";

  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef(null);

  const toggleSearchBar = () => {
    if (window.innerWidth < 768) {
      if (isExpanded) {
        if (searchTerm.length > 0) {
          handleBookSearch(searchTerm, searchOption);
        }
      } else {
        setIsExpanded(true);
      }
    }
  };

  const handleSearchBlur = () => {
    if (isExpanded && searchTerm.length === 0) {
      setIsExpanded(false);
    }
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchOptionChange = (value) => {
    setSearchOption(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar
      expand="md"
      className="navigationBar"
    >
      <Container>
        <Navbar.Brand className="mr-auto">
          <Image
            src={logo}
            alt="logo"
            className="logo-image"
            onClick={() => navigate("/")}
          />
        </Navbar.Brand>

        <button
          type="button"
          className={`toggler ${isNavOpen ? "active" : ""}`}
          onClick={toggleNav}
        >
          <span className="spanBar"></span>
          <span className="spanBar"></span>
          <span className="spanBar"></span>
        </button>

        <div
          id="navCollapse"
          className={navCollapseClass}
          style={{
            height: isNavOpen ? "auto" : 0,
            transition: "height 0.3s ease-in-out",
          }}
        >
          <Form
            ref={formRef}
            className={`d-flex rounded-pill align-items-center ${
              isExpanded ? "search-form active" : ""
            }`}
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submission
              if (searchTerm.trim() !== "") {
                handleBookSearch(searchTerm, searchOption);
              }
            }}
          >
            {!isExpanded && (
              <div className="search-icon" onClick={toggleSearchBar}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
            {isExpanded && (
              <>
                <div className="select-containers">
                  <select
                    id="searchBy"
                    className="mr-2"
                    onChange={(e) => handleSearchOptionChange(e.target.value)}
                    value={searchOption}
                  >
                    <option value="#">All</option>
                    <option value="inauthor">Authors</option>
                    <option value="intitle">Titles</option>
                    <option value="inpublisher">Publishers</option>
                  </select>
                </div>
                <div className="input-container">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="flex-grow-1"
                    onChange={(e) => handleSearchTermChange(e.target.value)}
                    onBlur={handleSearchBlur}
                    value={searchTerm}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                    onClick={toggleSearchBar}
                  />
                </div>
              </>
            )}
          </Form>
          <Nav className="my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <NavDropdown
              title="Browse"
              id="dropdown-autoclose-outside"
              className="genreDropdown dropdown-cursor"
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <NavDropdown.Item onClick={() => navigate("/Search")}>Popular</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/Search")}>Best-Sellers</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/Search")}>Recommended</NavDropdown.Item>
              <NavDropdown
                title="Genre"
                id="genreDropdown"
                className="genre-dropdown custom-dropdown"
                show={show2}
                onMouseEnter={showDropdown2}
                onMouseLeave={hideDropdown2}
              >
                <div className="itemGenreDropdown">
                  <NavDropdown.Item>test</NavDropdown.Item>
                  <NavDropdown.Item>test</NavDropdown.Item>
                  <NavDropdown.Item>test</NavDropdown.Item>
                </div>
              </NavDropdown>
            </NavDropdown>
          </Nav>
          {!isNavOpen && (
            <Form
              className={`d-flex search-form rounded-pill align-items-center wholeSearchBar ${
                isNavOpen ? "" : "active"
              }`}
            >
              <div className="select-container">
                <select
                  id="searchBy"
                  className="mr-2"
                  onChange={(e) => handleSearchOptionChange(e.target.value)}
                  value={searchOption}
                >
                  <option value="#">All</option>
                  <option value="inauthor">Authors</option>
                  <option value="intitle">Titles</option>
                  <option value="inpublisher">Publishers</option>
                </select>
              </div>
              <div className="input-container">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="flex-grow-1"
                  onChange={(e) => handleSearchTermChange(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (searchTerm.trim() !== "") {
                        handleBookSearch(searchTerm, searchOption);
                        e.preventDefault();
                      } else {
                        e.preventDefault();
                      }
                    }
                  }}
                  value={searchTerm}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="search-icon"
                  onClick={() => {
                    handleBookSearch(searchTerm, searchOption);
                  }}
                />
              </div>
            </Form>
          )}

          <Nav className="rightSide">
            <Nav.Link
              className="bookShelf"
              onClick={() => {
                navigate("/MyBookshelf");
              }}
            >
              My Bookshelf
            </Nav.Link>
            <div>
              <Image
                src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
                className="profilePic"
              />
            </div>
            <Nav.Item className="username">{username}</Nav.Item>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;