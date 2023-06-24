import styled from 'styled-components';

export const QuestionsBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  & > * {
    height: 100px;
    min-height: fit-content;
  }
`;
