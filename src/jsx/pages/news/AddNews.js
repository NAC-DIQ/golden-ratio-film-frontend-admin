import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const AddNews = () => {
  const initialValues = [
    {
      type: '1',
      title: '',
      category: '',
      content: '',
    },
  ];
  const initialCategories = [];
  const [values, setValues] = useState(initialValues);

  const [file, setFile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    // change the state value of the input by name
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    setSubmitting(true);
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
    // form data with image
    const data = new FormData();
    data.append('type', values.type);
    data.append('title', values.title);
    data.append('category', values.category);
    data.append('content', values.content);
    data.append('image', file);
    // add a image to data

    // // axios
    try {
      await axios.post(`${API_URL}news`, data, header);
      swal('Success', 'News Added Successfully', 'success');
      setValues({
        type: '1',
        title: '',
      });
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}category`);

      setCategories(res.data.filter((category) => category.type === '1'));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle activeMenu='Add' motherMenu='News' pageContent='Add News' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add News</h4>
            </div>
            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Type of News</label>
                    <select
                      type='text'
                      name='type'
                      className='form-control input-default '
                      placeholder='input-default'
                      required
                      onChange={(e) => handleChange(e)}>
                      <option value=''>------</option>
                      <option value='1'>Default News </option>
                      <option value='2'>Top News </option>
                    </select>
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Category</label>
                    <select
                      type='text'
                      name='category'
                      className='form-control input-default '
                      placeholder='input-default'
                      required
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
                    <label htmlFor=''>Title</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Title'
                      name='title'
                      required
                      value={values.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Image
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : <br />
                        Top {ImageSize.topNews} <br /> Default
                        {ImageSize.defaultNews}
                      </small>
                    </label>
                    <div className='from-file'>
                      <input
                        type='file'
                        className='form-file-input form-control'
                        placeholder='image'
                        name='image'
                        required
                        onChange={(e) => handleFile(e)}
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <label htmlFor=''>External URL</label>
                    <input
                      type='url'
                      className='form-control input-default '
                      placeholder='URL'
                      name='content'
                      required={false}
                      value={values.content}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Add News
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

export default AddNews;
