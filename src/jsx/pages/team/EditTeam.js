import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, ImageSize } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const EditTeam = () => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    data.append('type', values.type);
    data.append('name', values.name);
    data.append('designation', values.designation);
    if (values.linkedin) {
      data.append('linkedin', values.linkedin);
    }
    data.append('content', values.content);
    if (file) {
      data.append('image', file);
    }

    // // axios
    try {
      await axios.patch(`${API_URL}team/${id}`, data, header);
      swal('Success', 'Team Updated Successfully', 'success');
      document.querySelector('form').reset();
      setSubmitting(false);
      history.goBack();
    } catch (error) {
      swal('Error', 'Something Went Wrong', 'error');
    }
  };

  useEffect(() => {
    fetchTeam();
    if (isLoaded) {
      console.log(values);
    }
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${API_URL}team/${id}`, header);
      setValues(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle activeMenu='Edit' motherMenu='Team' pageContent='Edit Team' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Edit Team</h4>
            </div>
            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Type of Team </label>
                    <select
                      type='text'
                      name='type'
                      className='form-control input-default '
                      placeholder='input-default'
                      required
                      onChange={(e) => handleChange(e)}>
                      <option value={values.type}>
                        {values?.type === '1'
                          ? ' Management'
                          : values?.type === '2'
                          ? 'Executives'
                          : 'Advisory Board'}
                      </option>
                      <option value='1'>Management </option>
                      <option value='2'>Executives </option>
                      <option value='3'>Advisory Board</option>
                    </select>
                  </div>

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
                    <label htmlFor=''>Designation</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Designation'
                      name='designation'
                      required
                      value={values.designation}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Linkedin URL</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Linkedin URL'
                      name='linkedin'
                      value={values.linkedin}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>
                      Image (leave blank for no change)
                      <small className='d-inline-block m-3'>
                        Recommended Size (WxH) : {ImageSize.teamMember}
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
                    <label htmlFor=''>Content</label>
                    <textarea
                      name='content'
                      onChange={(e) => handleChange(e)}
                      className='form-control h-300'
                      value={values.content}></textarea>
                  </div>

                  <div className='form-col-md-12 mt-3'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Update Team Member
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

export default EditTeam;
