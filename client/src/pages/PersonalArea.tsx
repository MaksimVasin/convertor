import { useEffect, useState, useContext } from 'react';
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getAllUserImages } from "../http/personalArea";

const PersonalAreaPage = observer(function(): JSX.Element {

  const { user } = useContext(Context)
  const [images, setImages]: [any, any] = useState([])

  useEffect(() => {

    async function getImages() {
      const data = await getAllUserImages(user._user.id)
      setImages(data)
    }
    getImages()

  }, [])

  return (
    <Container>
      <h2>Personal area page</h2>
      {
        images && images.map((image: {
          dataPNG: string,
          dataSVG: string,
          filename: string,
          id: string | number
        }) => (
          <div key={image.id}>
            <img style={{width: 100, height: 100}} alt="" src={image.dataSVG}></img>
            <div>{image.filename}</div>
          </div>
        ))
      }
    </Container>
  )
})

export default PersonalAreaPage