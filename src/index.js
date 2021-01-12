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

  const compare = ({ value: value1 }, { value: value2 }) => {
    const values = [
      "ACE",
      "KING",
      "QUEEN",
      "JACK",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ];

    const index1 = values.indexOf(value1);
    const index2 = values.indexOf(value2);

    if (index1 > index2) {
      return 1;
    } else {
      return -1;
    }
  };

  const filter = (suit) => {
    return cards
      .filter(({ suit: currentSuit }) => currentSuit === suit)
      .sort(compare)
      .map(({ image }) => (
        <img className="mr-2" style={{ width: "100px" }} src={image} />
      ));
  };

  return (
    <Container className="m-5">
      <div className="d-flex align-items-center">
        <Button onClick={newDeck}>New Deck</Button>
        <p className="m-0 mx-3">{deckID}</p>
        <Button onClick={newCard} disabled={!deckID}>
          New Card
        </Button>
      </div>
      <ListGroup className="mt-2 flex-row">{filter("HEARTS")}</ListGroup>
      <ListGroup className="mt-2 flex-row">{filter("CLUBS")}</ListGroup>
      <ListGroup className="mt-2 flex-row">{filter("SPADES")}</ListGroup>
      <ListGroup className="mt-2 flex-row">{filter("DIAMONDS")}</ListGroup>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
