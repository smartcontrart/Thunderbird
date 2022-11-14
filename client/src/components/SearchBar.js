import React, {useState, useEffect} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { search } from '../services/api.js'
import "./SearchBar.css"
import { withRouter } from "react-router";

const SearchBar = () => {

    const [searchResults, setSearchResults] = useState(null)
    const [searchQuery, setSearchQuery] = useState(null)
    const [showResults, setShowResults] = useState(false)
    
    useEffect(()=>{
        document.addEventListener("keydown", resetQuery);
        document.addEventListener("click", resetQuery);
        return function cleanup () {
            document.removeEventListener("keydown", resetQuery);
            document.removeEventListener("click", resetQuery);
          }
    }, [])

    async function handleChange(event){
        event.preventDefault()
        setSearchQuery(event.target.value)
        if(event.target.value === ""){
            setShowResults(false)
        }else{
            if(event.target.value.length>=3){
                let results = await search(event.target.value)
                if(results.length>0){
                    setShowResults(true)
                    setSearchResults(results)
                }
            }
        }
    }

    function resetQuery(event){
        if(event.keyCode === 27 || event.type==='click'){
            setSearchQuery("")
            setSearchResults(null)
            setShowResults(false)
        }
    }

    function renderSearchResults(){
        if(searchResults && showResults){
            return(
                <div id="search_results">
                    {searchResults.map((result)=>{
                        return(
                            <Row className="search_result_row">
                                <Link   to={`/videos/${result.name}`} 
                                        onClick={resetQuery} 
                                        className="video_list_link" 
                                        title={result.title}>
                                    {result.title}
                                </Link>
                                {/* <PublicRoute path='/videos/:id' component={WatchVideo}/> */}
                            </Row>
                        )
                    })}
                </div>
            )
        }else return null
    }

    return (
        <Form onSubmit={search} className="searchBar">
            <Row>
                <Col xs={9}>
                    <Form.Group className="mb-1" controlId="searchQuery">
                        <Form.Control type="search" placeholder="Search" onChange={handleChange} value={searchQuery}/>
                    </Form.Group>
                    {renderSearchResults()}
                </Col>

            <Col xs={2}>
                <Button variant="primary" type="submit">
                Search
                </Button>
            </Col>
            </Row>
        </Form>
  );
}

export default withRouter(SearchBar);