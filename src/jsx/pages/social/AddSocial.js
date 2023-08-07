import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const AddSocial = () => {
  const initialValues = [
    {
      type: 'twitter',
      url: '',
    },
  ];
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
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
    data.append('url', values.url);
    data.append('image', file);
    // add a image to data

    // // axios
    try {
      await axios.post(`${API_URL}social`, data, header);
      swal('Success', 'Social Added Successfully', 'success');
      setValues({
        type: 'twitter',
        url: '',
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

  return (
    <>
      <PageTitle
        activeMenu='Add'
        motherMenu='Social'
        pageContent='Add Social'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Social</h4>
            </div>
            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Type</label>
                    <select
                      type='text'
                      name='type'
                      className='form-control input-default '
                      placeholder='input-default'
                      required
                      onChange={(e) => handleChange(e)}>
                      <option value=''>------</option>
                      <option value='twitter'>Twitter </option>
                      <option value='instagram'>Instagram </option>
                    </select>
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Url</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Url'
                      name='url'
                      required
                      value={values.url}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Image
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : {ImageSize.socialMedia}
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

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Add Social
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

export default AddSocial;
