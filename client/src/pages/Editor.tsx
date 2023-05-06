import { Container } from "react-bootstrap";
import SvgEditor from "../components/SvgEditor/SvgEditor";

export function EditorPage(): JSX.Element {
  return (
    <Container fluid style={{marginTop: '8px'}}>
      <SvgEditor/>
    </Container>
  )
}