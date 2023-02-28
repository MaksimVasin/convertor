import { Button, Container, Spinner } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

import { observer } from "mobx-react-lite"
import { useEffect, useState, useContext } from 'react';
import { Context } from "../index";
import { convert, upload } from "../http/convertAPI";
import { addImage } from '../http/userAPI';

const ConvertorPage = observer(function(): JSX.Element {

  const [image, setImage]: [File | null, any] = useState(null)

  const [pathImagePNG, setPathImagePNG]: [string, any] = useState('')
  const [pathImageSVG, setPathImageSVG]: [string, any] = useState('')

  const {user} = useContext(Context)

  useEffect(() => {
    if (image === null) return;

    async function convertImage() {
      
      if (image == null) return
      const newImageName = await upload(image)
      setPathImagePNG(newImageName)
      const result = await convert(newImageName)
      
      console.log(result)
      setPathImageSVG(result)

    }
    convertImage()
  }, [image])

  function onImageChange(e: any) {
    setImage(e.target.files[0]);
  }

  async function saveImage() {
    if (!image) return
    console.log('___1. На фронте отравляю', pathImageSVG, pathImagePNG)
    await addImage(user._user.id, image.name.split('.').slice(0, -1).join('.'), pathImageSVG, pathImagePNG)
    console.log('Вроде сохранил')
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