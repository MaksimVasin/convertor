import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getAllUserImages } from "../http/personalArea";
import { deleteUserImage } from '../http/userAPI';
import { EDITOR_ROUTE } from '../utils/consts';

const PersonalAreaPage = observer(function(): JSX.Element {

  const navigate = useNavigate()
  const { user } = useContext(Context)
  const [images, setImages]: [any, any] = useState([])

  async function getImages() {
    const data = await getAllUserImages(user._user.id)
    setImages(data)
  }

  function handleEditClick(id: number) {
    navigate(`${EDITOR_ROUTE}/${id}`)
  }

  useEffect(() => {
    getImages()
  }, [])

  async function deleteImageById(id: number) {
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
          id: number
        }) => (
          <Card style={{width: 200}} className="m-2" key={image.id}>
            <img style={{width: 100, height: 100}} alt="" src={image.dataSVG}></img>
            <div>{image.filename}</div>
            <Button className="m-2" onClick={() => handleEditClick(image.id)}>Edit</Button>
            <Button className="m-2" onClick={() => deleteImageById(image.id)}>Delete</Button>
          </Card>
        ))
      }
    </Container>
  )
})

export default PersonalAreaPage