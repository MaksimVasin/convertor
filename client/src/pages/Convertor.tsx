import { useEffect, useState, useContext } from 'react';
import { Button, Container, Spinner, Form, Badge } from 'react-bootstrap'
import { observer } from "mobx-react-lite"
import { Context } from "../index";
import { convert, deleteImage, upload } from "../http/convertAPI";
import { addUserImage } from '../http/userAPI';

const ConvertorPage = observer(function(): JSX.Element {

  const [image, setImage]: [File | null, any] = useState(null)

  const [prevPath, setPrevPath]: [string, any] = useState('')
  const [pathImagePNG, setPathImagePNG]: [string, any] = useState('')
  const [pathImageSVG, setPathImageSVG]: [string, any] = useState('')

  const {user} = useContext(Context)

  useEffect(() => {
    if (!image) return;

    async function convertImage() {

      if (prevPath !== pathImagePNG) await deleteImage(pathImageSVG, pathImagePNG)
  
      const pathNewImagePNG = await upload(image)
      setPathImagePNG(pathNewImagePNG)
      setPathImageSVG('')
      
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
    if (prevPath === pathImagePNG && pathImagePNG) return
    setPrevPath(pathImagePNG)
    await addUserImage(user._user.id, image.name.split('.').slice(0, -1).join('.'), pathImageSVG, pathImagePNG)
  }

  function downloadImage() { // создается ссылка, нажимается и удаляется
    const downloadUrl = pathImageSVG
    const downloadLink = document.createElement("a")
    downloadLink.href = downloadUrl
    downloadLink.download = `${image?.name.split('.').slice(0, -1).join('.')}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
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
            {
              Boolean(prevPath === pathImagePNG && pathImagePNG) ?
              <Badge bg="success">Сохранено</Badge> :
              <Button className="m-2" onClick={saveImage}>Save</Button>
            }
            <Button className="m-2">Edit</Button>
            {/* <a download href={pathImageSVG}>Test</a> */}
            <Button className="m-2" onClick={downloadImage}>Download</Button>
          </div>
      }
    </Container>
  )
})

export default ConvertorPage