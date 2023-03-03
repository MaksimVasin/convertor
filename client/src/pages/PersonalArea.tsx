import { useEffect, useState, useContext } from 'react';
import { Container, Card, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getAllUserImages } from "../http/personalArea";
import { deleteUserImage } from '../http/userAPI';

const PersonalAreaPage = observer(function(): JSX.Element {

  const { user } = useContext(Context)
  const [images, setImages]: [any, any] = useState([])

  async function getImages() {
    const data = await getAllUserImages(user._user.id)
    setImages(data)
  }

  useEffect(() => {
    getImages()
  }, [])

  async function deleteImageById(id: string | number) {
    await deleteUserImage(user._user.id, +id)
    await getImages()
  }

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
          <Card style={{width: 200}} className="m-2" key={image.id}>
            <img style={{width: 100, height: 100}} alt="" src={image.dataSVG}></img>
            <div>{image.filename}</div>
            <Button className="m-2">Edit</Button>
            <Button className="m-2" onClick={() => deleteImageById(image.id)}>Delete</Button>
          </Card>
        ))
      }
    </Container>
  )
})

export default PersonalAreaPage