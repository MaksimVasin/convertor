import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from 'react';
import { Context } from "../index";
import { getAllUserImages } from "../http/personalArea";

const PersonalAreaPage = observer(function(): JSX.Element {

  const { user } = useContext(Context)
  const [images, setImages]: [any, any] = useState([])

  useEffect(() => {

    //console.log(user)
    async function getImages() {
      //await getAllUserImages()
      console.log('Достаю из стора')
      console.log(user._user.id)
      const data = await getAllUserImages(user._user.id)
      console.log('прилетело', data)
      setImages(data)

      if (data.length > 0) {
        console.log('Первая картинка')
        console.log(data[0].dataSVG)
        //console.log(data[0].dataPNG)
        //const blob = new Blob([data[0].dataPNG])
        //console.log(blob)
        //const url = URL.createObjectURL(blob)
        //console.log(data[0].dataPNG)
        //console.log(url)
      }
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