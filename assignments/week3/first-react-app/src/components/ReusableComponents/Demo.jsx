import Button from "./Button.jsx";
import Header from "./Header.jsx";
import Card from "./Card.jsx";

const Demo = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Header title="Component Demo" subtitle="Showing prop combinations" level={1} />

      <Card title="Button Examples">
        <Button label="Default Button" />
        <Button label="Disabled Button" disabled={true} />
        <Button label="Submit Button" type="submit" />
      </Card>
       <Card title="Button Examples">
        This is the children of this component
      </Card>

      <Card title="Nested Components Example">
        <Header title="Inside Card" level={3} />
        <p>This is a card with a nested header and button:</p>
        <Button label="Click Me" onClick={() => alert("Button clicked!")} />
      </Card>

      <Card content="This card only has content, no title" />
    </div>
  );
};

export default Demo;