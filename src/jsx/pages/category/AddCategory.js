import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { API_URL } from '../../../config';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';

const Addcategory = () => {
  const initialValues = [
    {
      type: '1',
      title: '',
    },
  ];
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    // change the state value of the input by name
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const data = {
      type: values.type,
      title: values.title,
    };
    // axios
    try {
      await axios.post(`${API_URL}category`, data, header);
      swal('Success', 'Category Added Successfully', 'success');
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

  return (
    <>
      <PageTitle
        activeMenu='Add'
        motherMenu='Category'
        pageContent='Add Category'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Category</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className='row'>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Type of Category</label>
                    <select
                      type='text'
                      name='type'
                      className='form-control input-default '
                      placeholder='input-default'
                      required
                      onChange={(e) => handleChange(e)}>
                      <option value=''>------</option>
                      <option value='1'>News Category</option>
                      <option value='2'>Movie Category</option>
                    </select>
                  </div>
                  <div className='form-group col-md-6 mb-3'>
                    <label htmlFor=''>Category</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Category'
                      name='title'
                      required
                      value={values.title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-col-md-12'>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Add Category
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

export default Addcategory;
