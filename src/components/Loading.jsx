import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
function Loading() {
  return (
    <LoadingContainer>
      <CircularProgress color="secondary" />
    </LoadingContainer>
  );
}
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Loading;
