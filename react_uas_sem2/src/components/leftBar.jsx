import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form, FormControl } from "react-bootstrap";
import "./styles/leftBar.css"

export default function GenreBar(){
    return (
        <div className="left-nav">
        <div className="left-nav-content">

        <div class="search-bar">
            <input type="search" className="input-text" name="search" placeholder="Search Books" pattern=".*\S.*" required />
        </div>

            <h5>Popular Book Authors</h5>
            <ul>
            <li>J.K Rowling</li>
            <li>George R.R Martin</li>
            <li>Gillian Flynn</li>
            <li>Dan Brown</li>
            <li>John Grisham</li>
            {/* Add more authors */}
            </ul>

            <h5>Genres</h5>
            <ul>
            <li>Genre 1</li>
            <li>Genre 2</li>
            <li>Genre 3</li>
            {/* Add more genres */}
            </ul>

            <h5>Book of the Month</h5>
            <ul>
            <li>Harry Potter</li>
            <li>Game of Thrones</li>
            <li>Monogatari</li>
            {/* Add more time ranges */}
            </ul>

            <h5>New Releases</h5>
            <ul>
            <li>Last 30 Days</li>
            <li>Last 60 Days</li>
            <li>Last 90 Days</li>
            {/* Add more time ranges */}
            </ul>

            <h5>Awarded Books</h5>
            <ul>
            <li>Harry Potter</li>
            <li>Game of Thrones</li>
            <li>Monogatari</li>
            {/* Add more time ranges */}
            </ul>

            <h5>Classics</h5>
            <ul>
            <li>Harry Potter</li>
            <li>Game of Thrones</li>
            <li>Monogatari</li>
            {/* Add more time ranges */}
            </ul>

            <h5>Biography</h5>
            <ul>
            <li>Martin Luther King</li>
            <li>Abraham Lincoln</li>
            <li>Vladimir Putin</li>
            {/* Add more time ranges */}
            </ul>

            <h5>Book Series</h5>
            <ul>
            <li>Harry Potter</li>
            <li>Game of Thrones</li>
            <li>Monogatari</li>
            {/* Add more book series */}
            </ul>

        </div>
    </div>

      );
    }      