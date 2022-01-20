import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Container, Title, ContainerImg } from './App.styled';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../imageGallery/imageGallery';
import Modal from '../Modal/Modal';

class App extends Component {
  state = {
    imageName: '',
    showModal: false,
    modalContent: null,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  getModalContent = modalContent => {
    this.setState({ modalContent });
  };

  render() {
    const { showModal, modalContent, imageName } = this.state;
    return (
      <>
        <Container>
          <Title>image-finder</Title>
        </Container>

        <ContainerImg>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery
            getModalContent={this.getModalContent}
            imageName={imageName}
            openModal={this.toggleModal}
          />
          <Toaster position="bottom-right" />
          {showModal && (
            <Modal onClose={this.toggleModal} data={modalContent} />
          )}
        </ContainerImg>
      </>
    );
  }
}

// function App() {
//   return (
//     <Container>
//       <Title>feedback</Title>
//       <Section></Section>
//       <Section></Section>
//     </Container>
//   );
// }

export default App;
