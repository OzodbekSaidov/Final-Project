import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f2f6fc;
  text-align: center;
  padding: 20px;
`;

const MapBackground = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  filter: brightness(0.9);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(125, 125, 125, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #3b2d2d;
  font-weight: bold;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const Subtext = styled.p`
  font-size: 18px;
  margin-top: 10px;
  color: #3b2d2d;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const About = () => {
  return (
    <Container>
      <MapBackground>
        <Overlay>
          <div>
            <Title>Найдите ближайшую заправку легко и быстро!</Title>
            <Subtext>
              Наш сервис поможет вам найти ближайшие заправочные станции за
              считанные секунды. Просто откройте карту и начните путешествие без
              лишних забот
            </Subtext>
            <Subtext>
              Точные данные и удобный интерфейс — всё для вашего комфорта
            </Subtext>
          </div>
        </Overlay>
      </MapBackground>
      <h4>OOO"" 2025</h4>
    </Container>
  );
};

export default About;
