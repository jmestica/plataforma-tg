import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import { Carousel } from 'antd';
import newsImage from "../../assets/news.png";
import searchImage from "../../assets/search.png"
import "../Buscador/Buscador.css";
import "./Noticias.css";



function Noticias() {

  const dotStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };



  return (


    <>

      <h1 className="section-title">Noticias</h1>
      <p className="section-description">
        Aquí encontrarás las novedades de la red.
      </p>
      <div className='section-news'>

        <Card
          bordered
          style={{
            width: 800,
            height: 600,
          }}
          cover={
            <Carousel autoplay>
              <div>
                <img alt="example" src={newsImage} style={{ width: 800 }} />
              </div>
              <div>
                <img alt="example" src={searchImage} style={{ width: 800 }} />
              </div>
              <div>
                <img alt="example" src={newsImage} style={{ width: 800 }} />
              </div>
              <div>
                <img alt="example" src={searchImage} style={{ width: 800 }} />
              </div>
            </Carousel>
          }
          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="delete" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
            title="Noticia 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae pretium risus. Curabitur sem tortor, gravida vitae mauris sit amet, interdum rutrum massa. Cras convallis nisl massa. Phasellus eros lectus, bibendum sit amet purus id, porta imperdiet ligula. Etiam volutpat, velit in rutrum luctus, ligula risus ultrices turpis, in posuere lectus justo a lectus. Pellentesque at cursus lacus. Morbi id velit pretium, vulputate dui a, cursus turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sapien sapien, placerat quis rutrum vel, porta eget nisl. Integer convallis ex sed est semper gravida. Ut at nisi feugiat, placerat metus in, elementum leo.
      Sed elit est, semper maximus eros in, pellentesque dignissim nunc. In sollicitudin lacus enim, eget tempor libero elementum eu. Vestibulum porttitor diam nec tellus pulvinar accumsan. In viverra id mi et ornare. In sollicitudin molestie orci, nec tincidunt tellus feugiat eu. Nullam id lectus vitae magna sodales accumsan. Mauris sem metus, elementum quis erat id, rhoncus aliquam risus. Praesent purus leo, dapibus a pharetra non, rhoncus vel metus. Vestibulum nibh ex, venenatis a felis in, pellentesque aliquam odio. Curabitur nec sapien consectetur, mollis nulla non, semper ante. Mauris eu mi laoreet lectus gravida aliquet quis vel ipsum. Donec lobortis est a nulla egestas ornare. Curabitur nisl ipsum, ultricies id scelerisque ac, gravida eget justo. Quisque et tincidunt mi.
      Fusce tellus metus, lacinia nec felis et, feugiat pretium tortor. Quisque erat libero, tempus nec magna ut, malesuada dictum tortor. Integer quis eros id ex molestie rhoncus nec vel sem. Sed tristique vitae arcu a pretium. Quisque pharetra enim sem, at tristique orci tincidunt malesuada. Nunc libero est, tristique ac viverra eget, posuere a neque. Donec ligula orci, aliquam dignissim neque vel, dapibus vehicula nunc. Etiam sagittis tellus ut eros luctus lobortis. Proin molestie arcu sit amet urna tincidunt, eget laoreet massa convallis. Fusce id tempor est. Mauris ut tortor a libero pellentesque placerat. Vivamus tincidunt felis lorem. Pellentesque nibh nisl, porttitor ut finibus ut, ultrices sit amet felis. Vestibulum vel efficitur felis, in ultrices velit."
          />
        </Card>

      </div>


    </>
  )
}

export default Noticias