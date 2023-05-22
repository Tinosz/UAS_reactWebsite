import {
  Navbar,
  NavDropdown,
  Dropdown,
  Nav,
  Container,
  Form,
  FormControl,
  Image,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb as faLightbulbBold,
  faMoon,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faLightbulbRegular } from "@fortawesome/free-regular-svg-icons";
import "./styles/NavigationBarStyles.css";
import axios from "axios";

function NavigationBar() {
  const [lightModeOn, setLightModeOn] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchOption, setSearchOption] = useState("#");
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const showDropdown = (e) => {
    clearTimeout(dropdownTimeout);
    setShow(true);
  };
  const hideDropdown = (e) => {
    setTimeout(() => {
      setShow(false);
    }, 300); // Delay the dropdown menu closing by 0.5 seconds
  };
  const [show2, setShow2] = useState(false);

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

  return (
    <Navbar expand="md" className="navigationBar">
      <Container>
        <Navbar.Brand href="#home" className="mr-auto">
          Logo
        </Navbar.Brand>
        <div className="wholeSearchBarToggler">
          <Form
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
                    onChange={(e) => {
                      setSearchOption(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    onBlur={handleSearchBlur}
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
        </div>
        <div className={`themeModeWrapperToggler ${isNavOpen ? "active" : ""}`}>
          <FontAwesomeIcon
            icon={lightModeOn ? faLightbulbRegular : faLightbulbBold}
            onClick={lightModeClick}
            className="themeMode"
          />
        </div>

        <button
          type="button"
          className={`toggler ${isNavOpen ? "active" : ""}`}
          onClick={toggleNav}
        >
          <span className="spanBar"></span>
          <span className="spanBar"></span>
          <span className="spanBar"></span>
        </button>

        <div id="navCollapse" className={navCollapseClass}>
          <Nav className="my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <NavDropdown
              title="Browse"
              id="dropdown-autoclose-outside"
              className="genreDropdown"
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <div className="dropdownedItem">

              <NavDropdown.Item>Popular</NavDropdown.Item>
              <NavDropdown.Item>Best-Sellers</NavDropdown.Item>
              <NavDropdown.Item>Recommended</NavDropdown.Item>
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
              </div>
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
                  onChange={(e) => {
                    setSearchOption(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
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

          {!isNavOpen && (
            <div className="themeModeWrapper">
              <FontAwesomeIcon
                icon={lightModeOn ? faLightbulbRegular : faLightbulbBold}
                onClick={lightModeClick}
                className="themeMode"
              />
            </div>
          )}

          <Nav className="rightSide">
            <Nav.Link className="bookShelf">My Bookshelf</Nav.Link>
            <Image
              src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
              className="profilePic"
            />
            <Nav.Item className="username">Username</Nav.Item>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;