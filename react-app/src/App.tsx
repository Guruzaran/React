import Button from "./components/Button";
function App() {
  // let items = ["New York", "San Fransisco", "Tokyo", "London"];
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };

  const onClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      /> */}
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}
      <Button handleClick={onClick} children="Click Me" color="danger" />
    </div>
  );
}

export default App;
