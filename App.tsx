import React, { useState, useEffect } from 'react';

// --- INSTRUCCIONES PARA LAS IMÁGENES ---
// 1. En la carpeta raíz de tu proyecto, crea una carpeta llamada `public`.
// 2. Dentro de `public`, crea otra carpeta llamada `images`.
// 3. Coloca tus fotos de gatitos dentro de la carpeta `public/images`.
//    Por ejemplo: `public/images/gatito1.jpg`, `public/images/gatito2.png`.
// 4. En la lista `galleryItems` de abajo, reemplaza las rutas en `imageSrc` con las tuyas.
//    La ruta debe empezar con `/images/`. Por ejemplo: '/images/mi-gatito.jpg'.

const galleryItems = [
  {
    // Ruta de la imagen 1: /images/kitten1.jpg
    imageSrc: 'public/images/kitten1.jpg',
    caption: 'Mi amor, sé que anoche metí la pata',
    fallback: 'https://placekitten.com/408/287',
  },
  {
    // Ruta de la imagen 2: /images/kitten2.jpg
    imageSrc: 'public/images/kitten2.jpg',
    caption: 'y te hice sentir mal.',
    fallback: 'https://placekitten.com/400/300',
  },
  {
    // Ruta de la imagen 3: /images/kitten3.jpg
    imageSrc: 'public/images/kitten3.jpg',
    caption: 'Lo siento con todo mi corazón',
    fallback: 'https://placekitten.com/450/300',
  },
  {
    // Ruta de la imagen 4: /images/kitten4.jpg
    imageSrc: 'public/images/kitten4.jpg',
    caption: 'Tú eres lo más importante para mí',
    fallback: 'https://placekitten.com/400/350',
  },
  {
    // Ruta de la imagen 5: /images/kitten5.jpg
    imageSrc: 'public/images/kitten5.jpg',
    caption: 'y no quiero perderte por un error tonto.',
    fallback: 'https://placekitten.com/350/400',
  },
  {
    // Ruta de la imagen 6: /images/kitten6.jpg
    imageSrc: 'public/images/kitten6.jpg',
    caption: 'Ni manchar el camino de lo que estamos construyendo juntos.',
    fallback: 'https://placekitten.com/400/400',
  },

    {
    // Ruta de la imagen 7: /images/kitten7.jpg
    imageSrc: 'public/images/kitten7.jpg',
    caption: '¿Me perdonas?',
    fallback: 'https://placekitten.com/400/400',
  },
];

type GalleryItem = {
    imageSrc: string;
    caption: string;
    fallback: string;
};

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const App: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const checkImages = async () => {
            const checkedItems = await Promise.all(
                galleryItems.map(async (item) => {
                    try {
                        const res = await fetch(item.imageSrc);
                        if (res.ok) {
                            return item; // La imagen local existe
                        }
                        // La imagen local no se encontró, usa el fallback
                        return { ...item, imageSrc: item.fallback };
                    } catch (error) {
                        // Error al buscar la imagen, usa el fallback
                        return { ...item, imageSrc: item.fallback };
                    }
                })
            );
            setItems(checkedItems);
        };
        checkImages();
    }, []);


  return (
    <div className="bg-slate-100 min-h-screen font-sans antialiased">
      <main className="max-w-sm w-full mx-auto py-8 px-4">
        
        <header className="text-center mb-8">
          <HeartIcon className="w-10 h-10 text-pink-500 mx-auto animate-pulse" />
          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            Para la dueña de mi corazón
          </h1>
        </header>

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              {/*
                Comentario para el desarrollador:
                La imagen para esta tarjeta se encuentra en la ruta: ${item.imageSrc}
                Asegúrate de que el archivo exista en la carpeta `public/images`.
              */}
              <img
                src={item.imageSrc}
                alt={`Gatito adorable ${index + 1}`}
                className="w-full h-auto object-cover"
              />
              <div className="p-5 text-center">
                <p className="text-slate-700 text-lg leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

         <footer className="text-center mt-10">
            <p className="text-slate-500 font-semibold text-lg">
              Te amo muchísimo. ❤️
            </p>
          </footer>
      </main>
    </div>
  );
};

export default App;