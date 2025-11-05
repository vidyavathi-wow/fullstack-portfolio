import styled from "styled-components";
import { COLORS } from "../utils/constants.js";

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  color: ${COLORS.textLight};
  font-size: 1.2rem;
  text-align: center;
`;

const Emoji = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const EmptyState = ({ message = "No tasks available" }) => {
  return (
    <EmptyWrapper>
      <p>{message}</p>
    </EmptyWrapper>
  );
};

export default EmptyState;
