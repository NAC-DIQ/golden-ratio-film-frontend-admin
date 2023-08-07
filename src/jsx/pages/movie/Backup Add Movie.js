import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { API_URL } from '../../../config';
import PageTitle from '../../layouts/PageTitle';

const AddMovie = () => {
  const initialValues = [];
  const initialCategories = [];
  const [values, setValues] = useState(initialValues);
  const [thumbnail, setThumbnail] = useState('');
  const [banner, setBanner] = useState('');
  const [gallery, setGallery] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  const [starcastInput, setStarCastInput] = useState([
    {
      actorname0: '',
      actorimage0: '',
    },
  ]);

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

    // form data with image
    const data = new FormData();
    // data.append('title', values.title);
    // data.append('genre', values.genre);
    // data.append('category', values.category);
    // data.append('trailer', values.trailer);
    // data.append('synopsis', values.synopsis);
    // data.append('image', thumbnail);
    // data.append('banner', banner);
    // // add a image to data
    // let filesArr = Array.from(gallery);
    // filesArr.map((file, index) => {
    //   data.append('gallery', file);
    // });

    // console.log(starcastInput);

    starcastInput.map((starcast, index) => {
      data.append(`starcast[${index}]`, starcast[`actorname${index}`]);
      data.append(`starcastimage`, starcast[`actorimage${index}`]);
    });

    console.log(data);
    // axios
    try {
      // await axios.post(`https://ensrw10h5s7c.x.pipedream.net/`, data, header);
      await axios.post(`${API_URL}movie`, data, header);
      swal('Success', 'Movie Added Successfully', 'success');
      // setValues({});
    } catch (error) {
      swal('Error', 'Something Went Wrong', 'error');
    }
  };

  // Dynamic Files

  const handleAddStarCast = () => {
    const multivalues = [...starcastInput];
    // find the last index value is not null
    if (starcastInput.length > 0) {
      const lastIndex = starcastInput.length - 1;
      const lastValue = starcastInput[lastIndex];
      // check if the actor image is empty or not
      if (lastValue[`actorimage${lastIndex}`] === '') {
        swal('Error', 'Please Upload Actor Images', 'error');
        return;
      }
    }

    multivalues.push({
      [`actorname${starcastInput.length}`]: '',
      [`actorimage${starcastInput.length}`]: '',
    });
    setStarCastInput(multivalues);
  };

  const handleRemoveStarCast = (index) => {
    const multivalues = [...starcastInput];
    multivalues.splice(index, 1);
    setStarCastInput(multivalues);
  };

  const handleStarCastInputChange = (event, type, index) => {
    const multivalues = [...starcastInput];
    if (type === 'text') {
      multivalues[index][event.target.name] = event.target.value;
    } else {
      console.log(event.target);
      multivalues[index][event.target.name] = event.target.files[0];
    }
    setStarCastInput([...multivalues]);
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
                  <div className='form-group col-md-6 mb-3'>
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

                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Trailer</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Trailer'
                      name='trailer'
                      required='false'
                      value={values.trailer}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Banner</label>
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
                    <label htmlFor=''>Thumbnail</label>
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
                    <label htmlFor=''>Gallery</label>
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

                  <hr />
                  <div className='col-md-12'>
                    <h3>Star Cast</h3>
                    {starcastInput.map((inputField, index) => (
                      <div key={`${inputField}~${index}`} className='row'>
                        <div className='form-group col-sm-5'>
                          <label htmlFor='name'>Name</label>
                          <input
                            type='text'
                            className='form-control'
                            id='name'
                            required
                            name={`actorname${index}`}
                            onChange={(event) =>
                              handleStarCastInputChange(event, 'text', index)
                            }
                          />
                        </div>
                        <div className='form-group col-sm-5'>
                          <label htmlFor='image'>Image</label>
                          <input
                            type='file'
                            className='form-control'
                            id='image'
                            required
                            name={`actorimage${index}`}
                            onChange={(event) =>
                              handleStarCastInputChange(event, 'image', index)
                            }
                          />
                        </div>
                        <div className='form-group col-sm-2'>
                          <button
                            className='btn btn-danger mt-3'
                            type='button'
                            onClick={() => handleRemoveStarCast(index)}>
                            <span className='fa fa-trash'></span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className='btn btn-link'
                      type='button'
                      onClick={() => handleAddStarCast()}>
                      +
                    </button>
                  </div>

                  <div className='form-col-md-12 mt-3'>
                    <button type='submit' className='btn btn-primary'>
                      Add Movie
                    </button>
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
