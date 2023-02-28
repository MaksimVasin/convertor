import { useEffect, useState, useContext } from 'react';
import { Button, Container, Spinner, Form } from 'react-bootstrap'
import { observer } from "mobx-react-lite"
import { Context } from "../index";
import { convert, upload } from "../http/convertAPI";
import { addImage } from '../http/userAPI';

const ConvertorPage = observer(function(): JSX.Element {

  const [image, setImage]: [File | null, any] = useState(null)

  const [pathImagePNG, setPathImagePNG]: [string, any] = useState('')
  const [pathImageSVG, setPathImageSVG]: [string, any] = useState('')

  const {user} = useContext(Context)

  useEffect(() => {
    if (!image) return;

    async function convertImage() {
  
      const pathNewImagePNG = await upload(image)
      setPathImagePNG(pathNewImagePNG)
      
      const pathNewImageSVG = await convert(pathNewImagePNG)
      setPathImageSVG(pathNewImageSVG)

    }
    convertImage()
  }, [image])

  function onImageChange(e: any) {
    setImage(e.target.files[0]);
  }

  async function saveImage() {
    if (!image) return
    await addImage(user._user.id, image.name.split('.').slice(0, -1).join('.'), pathImageSVG, pathImagePNG)
  }

  return (
    <Container>
      <h2>Convertor</h2>      
      <Form.Group style={{width: 400}} controlId="formFile" className="mb-3">
        <Form.Control 
          type="file"
          accept="image/png"
          onChange={onImageChange}
        />
      </Form.Group>
      <img style={{width: 300, height: 300}} src={pathImagePNG} alt="" />
      <hr/>
      <h3>SVG:</h3>
      {
        Boolean(!pathImageSVG && pathImagePNG) && <Spinner animation={"grow"}/>
      }
      {
        pathImageSVG &&
          <div>
            <img style={{width: 300, height: 300}} src={pathImageSVG} alt="" />
            <Button className="m-2" onClick={saveImage}>Save</Button>
            <Button className="m-2">Edit</Button>
            <Button className="m-2">Download</Button>
          </div>
      }
    </Container>
  )
})

export default ConvertorPage