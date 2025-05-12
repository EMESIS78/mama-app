import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

const personas = [
  { nombre: 'Yhomira', mensaje: 'Gracias por tu fuerza y ternura. ¡Feliz Día de la Madre! De parte de tus queridos y amados hijos Kalessi y Dariel', color: '#fce4ec' },
  { nombre: 'Evelyn', mensaje: 'Tu sonrisa es el mejor regalo. ¡Te quiero mucho!', color: '#e3f2fd' },
  { nombre: 'Sandra', mensaje: 'Mamita gracias por todo te amo mucho y te mando un abrazo fuerte. ¡Gracias mamá! Te quiere Gael', color: '#f3e5f5' },
  { nombre: 'Ana', mensaje: 'Eres mi guía y mi inspiración. Me siento orgulloso y afortunado de ser tu hijo(a) ¡Feliz día mamita! Recuerda que te queremos Nahomi, Fabricio y Zaid', color: '#fff8e1' },
  { nombre: 'Fabiana', mensaje: 'Tu amor me hace fuerte. Nos alegra mucho tenerte aún con nosotros mamita querida, Dios permita tenerte siempre con nosotros mas tiempo ¡Disfruta tu día! De parte de toda tu familia la que te quiere y te ama', color: '#e8f5e9' }
];

const mensajes = [
  "¡Feliz Día de la Madre!",
  "Gracias por tu amor incondicional.",
  "Eres mi ejemplo a seguir.",
  "Te quiero mucho, mamá.",
  "Tu abrazo es mi lugar seguro.",
  "Tus consejos nos alimentan en conocimiento"
];

function App() {
  const [indexPersona, setIndexPersona] = useState(0);
  const [indexMensaje, setIndexMensaje] = useState(0);
  const [mostrarBienvenida, setMostrarBienvenida] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBienvenida(false);
    }, 4000); // 4 segundos

    return () => clearTimeout(timer);
  }, []);

  const siguientePersona = () => {
    setIndexPersona((prev) => (prev + 1) % personas.length);
    setIndexMensaje(0);
  };

  const anteriorPersona = () => {
    setIndexPersona((prev) => (prev - 1 + personas.length) % personas.length);
    setIndexMensaje(0);
  };

  const siguienteMensaje = () => {
    setIndexMensaje((prev) => (prev + 1) % mensajes.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: siguientePersona,
    onSwipedRight: anteriorPersona,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (mostrarBienvenida) {
    return (
      <div className="bienvenida">
        <div className="hearts-background">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        <h1 className="titulo-bienvenida">¡Feliz Día Mamitas!</h1>
      </div>
    );
  }

  return (
    <div
      className="carousel"
      style={{ backgroundColor: personas[indexPersona].color }}
      {...handlers}
    >
      <div className="hearts-background">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="card">
        <h2>{personas[indexPersona].nombre}</h2>
        <p>{personas[indexPersona].mensaje}</p>
        <p className="mensaje-extra">{mensajes[indexMensaje]}</p>
        <button className="boton" onClick={siguienteMensaje}>
          Ver otro mensaje
        </button>
      </div>

      <div className="botones">
        <button onClick={anteriorPersona}>⟨</button>
        <button onClick={siguientePersona}>⟩</button>
      </div>

      <p className="swipe-tip">Desliza para ver más nombres</p>
    </div>
  );
}

export default App;