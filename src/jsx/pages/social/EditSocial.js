import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import Loading from '../../components/Loading/Loading';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const EditSocial = () => {
  const initialValues = [
    {
      type: 'twitter',
      url: '',
    },
  ];
  const { id } = useParams();
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

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
    console.log(values.category);
    setSubmitting(true);
    // check if the category is object or string

    // form data with image
    const data = new FormData();
    data.append('type', values.type);
    data.append('url', values.url);
    if (file) {
      data.append('image', file);
    }

    // // axios
    try {
      await axios.patch(`${API_URL}social/${id}`, data, header);
      swal('Success', 'Social Updated Successfully', 'success');
      history.push('/social-view');
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
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      const res = await axios.get(`${API_URL}social/${id}`, header);
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
      <PageTitle
        activeMenu='Edit'
        motherMenu='Social'
        pageContent='Edit Social'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Edit Social</h4>
            </div>
            {isLoaded ? (
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
                        <option value={values.type}>{values.type}</option>
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
                        Image (leave blank for no change)
                        <small className='d-inline-block m-3'>
                          Recommended Size (WxH) : {ImageSize.socialMedia}
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
                          Edit Social
                        </button>
                      )}
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

export default EditSocial;
