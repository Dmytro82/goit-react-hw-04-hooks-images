import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from '../imageGalleryItem';
import ButtonLoadMore from '../ButtonLoadMore';
import imageFinderApi from '../ServicesApi/imgApi';
import Loader from '../Loader';

export default function ImageGallery({
  getModalContent,
  imageName,
  toggleModal,
}) {
  const [fetchImages, setFetchImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemToScroll, setItemToScroll] = useState(null);
  //
  useEffect(() => {
    if (!imageName) {
      return;
    }

    const getImages = async () => {
      setIsLoading(true);
      const data = await imageFinderApi(imageName, page);
      try {
        if (data.total === 0) {
          toast.error('Images has not been found!');
          setFetchImages([]);
          setPage(1);
          setShowButton(false);
          return;
        }

        const quantityOfPage = data.total / 12;

        quantityOfPage > page ? setShowButton(true) : setShowButton(false);

        if (page === 1) {
          setFetchImages(data.hits);
          setItemToScroll(null);
          return;
        } else {
          setFetchImages(state => [...state, ...data.hits]);
          setItemToScroll(data.hits[data.hits.length - 1].id);
        }
      } catch {
        toast.error('Something wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    getImages(imageName, page);
  }, [imageName, page]);

  useEffect(() => {
    document.getElementById(itemToScroll)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [itemToScroll]);
  //
  const loadMoreImages = () => {
    setPage(page + 1);
    setShowButton(false);
  };

  const openModal = event => {
    if (event.target.nodeName === 'IMG') {
      toggleModal();
    }
  };

  const getItemContent = (largeImageURL, tags) => {
    const modalContent = {
      largeImageURL,
      tags,
    };
    getModalContent(modalContent);
  };

  return (
    <>
      {fetchImages.length > 0 && (
        <ImageGalleryList onClick={openModal}>
          {fetchImages.map(
            ({ id, tags, webformatURL, largeImageURL }, item) => (
              <ImageGalleryItem
                key={item}
                imageUrl={webformatURL}
                imageTag={tags}
                largeImageURL={largeImageURL}
                getItemContent={getItemContent}
                id={id}
              />
            ),
          )}
        </ImageGalleryList>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        showButton && <ButtonLoadMore onloadMoreImages={loadMoreImages} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  getModalContent: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
