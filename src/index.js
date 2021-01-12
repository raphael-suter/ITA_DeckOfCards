import React, { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, ListGroup } from "react-bootstrap";

const App = () => {
  const [deckID, setDeckID] = useState("");
  const [cards, setCards] = useState([]);

  const newDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => response.json())
      .then(({ deck_id }) => {
        setDeckID(deck_id);
      });
  };

  const newCard = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then((response) => response.json())
      .then(({ cards: newCards }) => {
        setCards([...newCards, ...cards]);
      });
  };

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center">
        <Button onClick={newDeck}>New Deck</Button>
        <p className="m-0 ml-3">{deckID}</p>
      </div>
      <Button className="mt-4" onClick={newCard}>
        New Card
      </Button>
      <ListGroup className="mt-4 flex-row">
        {cards.map(({ image }) => (
          <img className="mr-4" style={{ width: "200px" }} src={image} />
        ))}
      </ListGroup>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
