import { fetchImages } from '../sevices/fetchImages.service';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageSkeleton } from './ImageSkeleton/ImageSkeleton';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallary, setGallary] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [error, setError] = useState(null);

  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages({ q: query, page });
        setGallary(prevGallary => [...prevGallary, ...data.hits]);
        if (!data.totalHits) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        if (page < Math.ceil(data.totalHits / perPage)) {
          setIsShowBtn(true);
        } else {
          setIsShowBtn(false);
          toast.info(
            `You've reached the end of search results. Begin a new search!`
          );
          return;
        }
      } catch (error) {
        setError(
          'Sorry, there was a negative effect. Please refresh the page.'
        );
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData({ q: query, page });
    }
  }, [query, page]);

  const getQuery = searchWord => {    
    setQuery(searchWord);
    setGallary([]);
    setPage(1);
    setError(null);
    setIsShowBtn(false);
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSearch={getQuery} />

      {gallary.length > 0 && <ImageGallery gallary={gallary} />}

      {isLoading && <ImageSkeleton />}

      {error && <ErrorMessage error={error} />}

      {isShowBtn && <ButtonLoadMore onClick={changePage} />}

      <ToastContainer theme="colored" />
    </>
  );
};
