import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const AddMovie = () => {
  const initialValues = [];
  const initialCategories = [];
  const [values, setValues] = useState(initialValues);
  const [thumbnail, setThumbnail] = useState('');
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [gallery, setGallery] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
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
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}category`);

      setCategories(res.data.filter((category) => category.type === '2'));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    setSubmitting(true);

    // form data with image
    const data = new FormData();
    data.append('title', values.title);
    data.append('genre', values.genre);
    data.append('category', values.category);
    if (values.trailer) {
      data.append('trailer', values.trailer);
    }
    if (values.trailer == '') {
      data.append('trailer', values.trailer);
    }
    data.append('synopsis', values.synopsis);
    data.append('image', thumbnail);
    data.append('banner', banner);
    if (values.releaseDate) {
      data.append('releaseDate', values.releaseDate);
    }
    if (values.releaseDate == '') {
      data.append('releaseDate', values.releaseDate);
    }
    // // add a image to data
    if(gallery){
      let filesArr = Array.from(gallery);
      filesArr.map((file, index) => {
        data.append('gallery', file);
      });
    }

    // axios
    try {
      let res = await axios.post(`${API_URL}movie`, data, header);

      document.querySelector('form').reset();
      setSubmitting(false);
      history.push(`/movie-add/1/${res.data._id}`);
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

  return (
    <>
      <PageTitle activeMenu='Add' motherMenu='Movie' pageContent='Add Movie' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Movie</h4>
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
                      <option value=''>------</option>
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
                      required={false}
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
                        required='false'
                        onChange={(e) => handleFile(e, 'banner')}
                      />
                    </div>
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Thumbnail
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
                        required='false'
                        onChange={(e) => handleFile(e, 'thumbnail')}
                      />
                    </div>
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Gallery
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : {ImageSize.movieGallery}
                      </small>
                    </label>
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

                  <div className='form-group col-md-6 mb-3'>
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

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Add Movie
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

export default AddMovie;
