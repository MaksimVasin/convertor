import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from 'react';
import { Context } from "../index";

const PersonalAreaPage = observer(function(): JSX.Element {

  //const { user } = useContext(Context)
  const [images, setImages]: [any, any] = useState([])

  useEffect(() => {

    //console.log(user)

  })

  return (
    <Container>
      <h2>Personal area page</h2>
    </Container>
  )
})

export default PersonalAreaPage