import { Container, Spinner } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

import { observer } from "mobx-react-lite"
import { useEffect, useState, useContext } from 'react';
//import { Context } from "../index";
import { testConvert, testUpload } from "../http/convertAPI";

const ConvertorPage = observer(function(): JSX.Element {

  const [image, setImage]: [File | null, any] = useState(null)
  const [imageURL, setImageURL]: [string, any] = useState('')

  const [convertImage, setConvertImage]: [any, any] = useState(null);
  //const {user} = useContext(Context)

  useEffect(() => {
    if (image === null) return;
    const newImageURL = URL.createObjectURL(image)
    setImageURL(newImageURL)
    setConvertImage(null)

    async function convert() {
      
      if (image == null) return
      await testUpload(image)
      const result = await testConvert(image.name)

      setConvertImage(result)
    }
    convert()
  }, [image])

  function onImageChange(e: any) {
    setImage(e.target.files[0]);
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
      <img style={{width: 300, height: 300}} src={imageURL} alt="" />
      <hr/>
      <h3>SVG:</h3>
      {
        Boolean(!convertImage && imageURL) && <Spinner animation={"grow"}/>
      }
      {
        convertImage && <img style={{width: 300, height: 300}} src={convertImage} alt="" />
      }
    </Container>
  )
})

export default ConvertorPage