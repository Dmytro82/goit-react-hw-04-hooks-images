import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Container, Title, ContainerImg } from './App.styled';

import Searchbar from '../Searchbar';
import ImageGallery from '../imageGallery';
import Modal from '../Modal';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  const getModalContent = modalContent => {
    setModalContent(modalContent);
  };

  return (
    <>
      <Container>
        <Title>image-finder</Title>
      </Container>

      <ContainerImg>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          getModalContent={getModalContent}
          imageName={imageName}
          toggleModal={toggleModal}
        />
        <Toaster position="bottom-right" />
        {showModal && <Modal onClose={toggleModal} data={modalContent} />}
      </ContainerImg>
    </>
  );
}

// class App extends Component {
//   state = {
//     imageName: '',
//     showModal: false,
//     modalContent: null,
//   };

//   render() {
//     const { showModal, modalContent, imageName } = this.state;

//   }
// }

// // function App() {
// //   return (
// //     <Container>
// //       <Title>feedback</Title>
// //       <Section></Section>
// //       <Section></Section>
// //     </Container>
// //   );
// // }

// export default App;
