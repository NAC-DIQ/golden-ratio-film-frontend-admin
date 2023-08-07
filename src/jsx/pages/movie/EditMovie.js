import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import moment from 'moment';
import PageTitle from '../../layouts/PageTitle';
import './EditMovie.styled.css';

const EditMovie = () => {
  const initialValues = [];
  const initialCategories = [];
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [thumbnail, setThumbnail] = useState('');
  const [banner, setBanner] = useState('');
  const [gallery, setGallery] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [existingGallery, setExistingGallery] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [currentCat, setCurrentCat] = useState({
    id: '',
    name: '',
  });
  const history = useHistory();
  // get token from localstorage
  const userDetails = localStorage.getItem('userDetails');
  const user = JSON.parse(userDetails);
  const token = user.token;
  const header = {
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  };

  const handleChange = (e) => {
    // change the state value of the input by name
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleFile = (e, type) => {
    let file = e.target.files[0];
    switch (type) {
      case 'thumbnail':
        setThumbnail(file);
        break;
      case 'banner':
        setBanner(file);
        break;
      case 'gallery':
        //handle multiple images
        let files = e.target.files;
        let filesArr = Array.from(files);
        // filesArr.map((file) => {
        //   setGallery([...gallery, file]);
        // });
        setGallery(e.target.files);

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMovie();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}category`);

      setCategories(res.data.filter((category) => category.type === '2'));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMovie = async () => {
    try {
      const res = await axios.get(`${API_URL}movie/${id}`);
      console.log(res.data);
      setIsLoaded(true);
      setValues(res.data);
      setThumbnail(res.data.image);
      setBanner(res.data.banner);
      setExistingGallery(res.data.gallery);
      // categoreis

      // get current categories
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof values.category);
    setSubmitting(true);

    // form data with image
    const data = new FormData();
    data.append('title', values.title);
    data.append('genre', values.genre);
    if (values.releaseDate) {
      data.append('releaseDate', values.releaseDate);
    }
    if (values.releaseDate == '') {
      data.append('releaseDate', values.releaseDate);
    }

    if (typeof values.category === 'object') {
      data.append('category', values.category._id);
    } else {
      data.append('category', values.category);
    }

    if (values.trailer) {
      data.append('trailer', values.trailer);
    }
    if (values.trailer == '') {
      data.append('trailer', values.trailer);
    }

    data.append('synopsis', values.synopsis);
    data.append('image', thumbnail);
    data.append('banner', banner);
    // // add a image to data
    // check gallery has files
    if (gallery) {
      let filesArr = Array.from(gallery);
      filesArr.map((file, index) => {
        data.append('gallery', file);
      });
    }

    // axios
    try {
      let res = await axios.patch(`${API_URL}movie/${id}`, data, header);
      console.log(res);

      history.push(`/movie-edit/1/${id}`);
      // setValues({});
    } catch (error) {
      const { status } = error.response;

      swal('Error', 'Something Went Wrong', 'error');
      if (status === 401) {
        localStorage.removeItem('userDetails');
        window.location.reload();
      }
    }
  };
  const deleteGallery = async (image_id) => {
    try {
      const res = await axios.delete(
        `${API_URL}movie/gallery/${id}/${image_id}`,
        header
      );
      setExistingGallery(
        [...existingGallery].filter((image) => image._id !== image_id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle
        activeMenu='Edit'
        motherMenu='Movie'
        pageContent='Edit Movie'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Edit Movie</h4>
            </div>
            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Title</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Title'
                      name='title'
                      required='false'
                      value={values.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Genre</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Genre'
                      name='genre'
                      required='false'
                      value={values.genre}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Category</label>
                    <select
                      type='text'
                      name='category'
                      className='form-control input-default '
                      placeholder='input-default'
                      required='false'
                      onChange={(e) => handleChange(e)}>
                      {isLoaded && (
                        <option value={values.category?._id}>
                          {values.category?.title}
                        </option>
                      )}
                      {/* <option value={values.category._id}>
                        {values.category.title}
                      </option> */}
                      {isLoaded &&
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Trailer</label>
                    <input
                      type='url'
                      className='form-control input-default '
                      placeholder='Trailer'
                      name='trailer'
                      value={values.trailer}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Release Date</label>
                    <input
                      type='date'
                      className='form-control input-default '
                      placeholder='Release Date'
                      name='releaseDate'
                      value={moment(values.releaseDate).format('YYYY-MM-DD')}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Banner
                      {
                        // check the thumbnail is not an object
                        typeof banner != 'object' && (
                          <img
                            src={banner}
                            style={{
                              width: '50px',
                              height: '50px',
                              marginLeft: 25,
                            }}
                          />
                        )
                      }
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : {ImageSize.movieBanner}
                      </small>
                    </label>
                    <div className='from-file'>
                      <input
                        type='file'
                        className='form-file-input form-control'
                        placeholder='Banner'
                        name='banner'
                        accept='image/*'
                        onChange={(e) => handleFile(e, 'banner')}
                      />
                    </div>
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Thumbnail
                      {
                        // check the thumbnail is not an object
                        typeof thumbnail != 'object' && (
                          <img
                            src={thumbnail}
                            style={{
                              width: '50px',
                              height: '50px',
                              marginLeft: 25,
                            }}
                          />
                        )
                      }
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : {ImageSize.movieThumbnail}
                      </small>
                    </label>

                    <div className='from-file'>
                      <input
                        type='file'
                        className='form-file-input form-control'
                        placeholder='Thumbnail'
                        name='thumbnail'
                        accept='image/*'
                        onChange={(e) => handleFile(e, 'thumbnail')}
                      />
                    </div>
                  </div>

                  <div className='form-group col-md-12 mb-3'>
                    <label htmlFor=''>Synopsis</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Synopsis'
                      name='synopsis'
                      required='false'
                      value={values.synopsis}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Gallery</label>
                    <small className='d-inline-block m-3'>
                      Recommended Size (WxH) : {ImageSize.movieGallery}
                    </small>
                    <div className='from-file'>
                      <input
                        type='file'
                        className='form-file-input form-control'
                        placeholder='Gallery'
                        multiple
                        name='gallery[]'
                        accept='image/*'
                        onChange={(e) => handleFile(e, 'gallery')}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='row'>
                      {existingGallery?.map((file, index) => (
                        <div className='col-md-2 gallery-holder' key={index}>
                          <img
                            src={file.url}
                            style={{ width: 50, height: 50 }}
                          />
                          <span
                            onClick={() => deleteGallery(file._id)}
                            className='trash-btn fa fa-trash'></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Edit Movie
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMovie;
