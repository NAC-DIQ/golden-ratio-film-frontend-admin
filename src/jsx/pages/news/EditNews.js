import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const EditNews = () => {
  const initialValues = [
    {
      type: '1',
      title: '',
      category: '',
      content: '',
    },
  ];
  const initialCategories = [];
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const history = useHistory();

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
    console.log(values.category);
    setSubmitting(true);
    // check if the category is object or string

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
    data.append('title', values.title);
    if (typeof values.category === 'object') {
      data.append('category', values.category?._id);
    } else {
      data.append('category', values.category);
    }
    if (typeof values.type === 'object') {
      data.append('type', values.type?._id);
    } else {
      data.append('type', values.type);
    }
    data.append('content', values.content);
    if (file) {
      data.append('image', file);
    }

    // // axios
    try {
      await axios.patch(`${API_URL}news/${id}`, data, header);
      swal('Success', 'News Updated Successfully', 'success');
      document.querySelector('form').reset();
      setSubmitting(false);
      history.goBack();
    } catch (error) {
      swal('Error', 'Something Went Wrong', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNews();
    if (isLoaded) {
      console.log(values);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}category`);

      setCategories(res.data.filter((category) => category.type === '1'));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_URL}news/${id}`);
      setValues(res.data);
      setIsLoaded(true);
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
      <PageTitle activeMenu='Edit' motherMenu='News' pageContent='Edit News' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Edit News</h4>
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
                      <option value={values.type}>
                        {values?.type == '1' ? 'Default News' : 'Top News'}
                      </option>
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
                      {isLoaded && (
                        <option value={values.category?._id}>
                          {values?.category?.title}
                        </option>
                      )}
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
                      Image (leave blank for no change)
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : Top {ImageSize.topNews} <br />
                        Default {ImageSize.defaultNews}
                      </small>
                    </label>
                    <div className='from-file d-flex'>
                      <img
                        src={values.image}
                        className='img img-responsive '
                        width='55'
                        height='55'
                      />
                      <input
                        type='file'
                        className='form-file-input form-control'
                        placeholder='image'
                        name='image'
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
                      required
                      value={values.content}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Edit News
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

export default EditNews;
