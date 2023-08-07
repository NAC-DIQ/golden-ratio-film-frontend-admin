import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const EditCast = () => {
  const initialValues = [];
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
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
  const handleFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // check if the category is object or string

    // form data with image
    const data = new FormData();
    data.append('name', values.name);

    if (file) {
      data.append('image', file);
    }

    // // axios
    try {
      await axios.patch(`${API_URL}cast/${id}`, data, header);
      swal('Success', 'Cast Updated Successfully', 'success');
      document.querySelector('form').reset();
      setSubmitting(false);
      history.goBack();
    } catch (error) {
      swal('Error', 'Something Went Wrong', 'error');
    }
  };

  useEffect(() => {
    fetchCast();
    if (isLoaded) {
      console.log(values);
    }
  }, []);

  const fetchCast = async () => {
    try {
      const res = await axios.get(`${API_URL}cast/${id}`, header);
      setValues(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle activeMenu='Edit' motherMenu='Cast' pageContent='Edit Cast' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Edit Cast</h4>
            </div>
            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-6 mb-3'>
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

                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Image (leave blank for no change)
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : {ImageSize.starCast}
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

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Edit Cast
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

export default EditCast;
