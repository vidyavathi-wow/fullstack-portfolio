import PropTypes from 'prop-types';

const AboutMe = ({ name, age, favHobby }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
      }}
    >
      <h2>About Me</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Favorite Hobby:</strong> {favHobby}
      </p>
    </div>
  );
};

AboutMe.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  favHobby: PropTypes.string.isRequired,
};

export default AboutMe;
