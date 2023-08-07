import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import Loading from '../../components/Loading/Loading';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';
import './dropdown.style.css';

const AddMovie2 = () => {
  const initialValues = [];
  const [values, setValues] = useState(initialValues);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCastOpen, setIsCastOpen] = useState(false);
  const [file, setFile] = useState('');
  const history = useHistory();
  const [casts, setCasts] = useState([]);
  const [allCasts, setAllCasts] = useState([]);
  const [fullCastList, setFullcastList] = useState([]);
  const { movie_id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [castSearch, setCastSearch] = useState('');
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
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values.cast_id);
    setSubmitting(true);

    // form data with image
    const data = new FormData();
    data.append('name', values.name);
    data.append('type', values.type);
    if (values.type === '2') {
      if (values.cast_id === '') {
        swal('Oops !', 'Please select cast', 'error');
        return;
      }
    }
    data.append('exist_id', values.cast_id);
    data.append('image', file);
    data.append('character', values.character);
    if (values.session) {
      data.append('season', values.season);
    }
    // // add a image to data

    // axios
    try {
      let res = await axios.post(
        `${API_URL}movie/seriescast/${movie_id}`,
        data,
        header
      );
      setCasts(res.data.seriescast);

      setValues({
        type: '1',
        cast_id: '',
        name: '',
        type: '',
        character: '',
        season: '',
      });
      setFile('');
      document.querySelector('form').reset();
      setSubmitting(false);
    } catch (error) {
      const { status } = error.response;

      swal('Error', 'Something Went Wrong', 'error');
      if (status === 401) {
        localStorage.removeItem('userDetails');
        window.location.reload();
      }
    }
  };
  const castDelete = async (id) => {
    // prompt for confirming delete
    const result = await swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (result) {
      try {
        const res = await axios.delete(
          `${API_URL}movie/seriescast/${movie_id}/${id}`,
          header
        );
        const newCasts = casts.filter((cast) => cast._id !== id);
        setCasts(newCasts);
      } catch (error) {
        const { status } = error.response;

        swal('Error', 'Something Went Wrong', 'error');
        if (status === 401) {
          localStorage.removeItem('userDetails');
          window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    fetchCasts();
    fetchAllCasts();
    setValues({
      ...values,
      type: '1',
    });
  }, []);
  const fetchCasts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}movie/seriescast/${movie_id}`,
        header
      );
      setCasts(res.data.seriescast);
      setIsLoaded(true);
      console.log(casts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCasts = async () => {
    try {
      const res = await axios.get(`${API_URL}cast`, header);
      setAllCasts(res.data);
      setFullcastList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const PickCast = (id, image, name) => {
    console.log(id);
    setValues({
      ...values,
      cast_id: id,
      image: image,
      name: name,
    });
    setIsCastOpen(false);
  };

  const nextPage = () => {
    history.push(`/movie-add/3/${movie_id}`);
  };

  const handleCastSearch = (e) => {
    setCastSearch(e.target.value);
    // filter the cast
    const filteredCasts = fullCastList.filter((cast) => {
      return cast.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setAllCasts(filteredCasts);
  };

  return (
    <>
      <PageTitle activeMenu='Add' motherMenu='Movie' pageContent='Add Movie' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Series Cast</h4>
            </div>
            {isLoaded ? (
              <div className='card-body'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='table responsive'>
                      <table className='table'>
                        <tr>
                          <th>Name</th>
                          <th>Avatar</th>
                          <th>Character Name</th>
                          <th>Season</th>
                          <th>Action</th>
                        </tr>
                        {casts.map((cast, index) => (
                          <tr key={index}>
                            <td>{cast.cast.name}</td>
                            <td>
                              {cast.cast.image ? (
                                <img
                                  src={cast.cast.image}
                                  alt=''
                                  className='img img-rounded'
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                  }}
                                />
                              ) : (
                                ''
                              )}
                            </td>
                            <td>
                              {cast.character != '' &&
                              cast.character != undefined &&
                              cast.character != 'undefined'
                                ? cast.character
                                : ''}
                            </td>
                            <td>{cast.season}</td>
                            <td>
                              <button
                                className='btn btn-primary'
                                style={{ backgroundColor: '#ff0000' }}
                                onClick={() => castDelete(cast._id)}>
                                <span className='fa fa-trash'></span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e)}
                  encType='multipart/form-data'>
                  <div className='row'>
                    <div className='form-group col-md-4 mb-3'>
                      <label htmlFor=''>Type</label>
                      <select
                        name='type'
                        onChange={(e) => handleChange(e)}
                        className='form-control'>
                        <option value='1'>New Cast</option>
                        <option value='2'>Existing Cast</option>
                      </select>
                    </div>
                    {values.type === '1' ? (
                      <>
                        <div className='form-group col-md-3 mb-3'>
                          <label htmlFor=''>Name</label>
                          <input
                            type='text'
                            className='form-control input-default '
                            placeholder='Name'
                            name='name'
                            required
                            value={values.name}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>

                        <div className='form-group col-md-3 mb-3'>
                          <label htmlFor=''>
                            Image
                            <small className='d-inline-block m-3'>
                              Recommended Size (WxH) : {ImageSize.seriesCast}
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
                      </>
                    ) : (
                      <div className='form-group col-md-3 mb-3'>
                        <label htmlFor=''>Select One</label>
                        <div className='custom-dropdown-container form-control'>
                          <div
                            className='custom-dropdown-header'
                            onClick={() => setIsCastOpen(!isCastOpen)}>
                            {isCastOpen ? (
                              'Select One'
                            ) : (
                              <>
                                {values.name ? (
                                  <div className='cast-holder'>
                                    <img src={values.image} alt='' />
                                    <h3>{values.name}</h3>
                                  </div>
                                ) : (
                                  'Select One'
                                )}
                              </>
                            )}
                          </div>
                          {isCastOpen && (
                            <div className='custom-dropdown-list-container'>
                              <input
                                type='text'
                                value={castSearch}
                                onChange={(e) => handleCastSearch(e)}
                                className='cast-search'
                              />
                              {allCasts.map((cast, index) => (
                                <div
                                  className='custom-dropdown-list'
                                  key={index}
                                  onClick={() =>
                                    PickCast(cast._id, cast.image, cast.name)
                                  }>
                                  <div className='cast-holder'>
                                    <img src={cast?.image} alt='' />
                                    <h3>{cast?.name}</h3>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className='form-group col-md-4 mb-3'>
                      <label htmlFor=''>Character Name</label>
                      <input
                        type='text'
                        name='character'
                        onChange={(e) => handleChange(e)}
                        // required
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-4 mb-3'>
                      <label htmlFor=''>Season</label>
                      <input
                        type='text'
                        name='season'
                        onChange={(e) => handleChange(e)}
                        className='form-control'
                      />
                    </div>

                    <div
                      className='form-col-md-12 mt-3 d-flex '
                      style={{ justifyContent: 'space-between' }}>
                      {submitting ? (
                        <LoadingButton />
                      ) : (
                        <button type='submit' className='btn btn-primary'>
                          Add Cast
                        </button>
                      )}
                      <button
                        type='button'
                        onClick={() => nextPage()}
                        className='btn btn-dark'>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovie2;
