import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL } from '../../../config';
import Loading from '../../components/Loading/Loading';
import LoadingButton from '../../components/LoadingButton';
import PageTitle from '../../layouts/PageTitle';
import './dropdown.style.css';

const AddMovie4 = () => {
  const initialValues = [];
  const [values, setValues] = useState(initialValues);
  const [allValues, setAllValues] = useState(initialValues);
  const [file, setFile] = useState('');
  const history = useHistory();
  const { movie_id } = useParams();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name === '' && values.type === '') {
      swal('Error', 'Please Fill all Fields', 'error');
      return;
    }
    setAllValues([...allValues, values]);
    setValues({
      ...values,
      type: '',
      name: '',
      designation: '',
      season: '',
    });
    document.querySelector('form').reset();
  };
  const saveHandler = async (e) => {
    // check all values length
    // if (allValues.length > 0) {
      // // axios
      setSubmitting(true);
      try {
        let res = await axios.post(
          `${API_URL}movie/other/${movie_id}`,
          allValues,
          header
        );
        swal('Success', 'Details added successfully', 'success');
        history.push(`/movie-view`);
      } catch (error) {
        const { status } = error.response;

        swal('Error', 'Something Went Wrong', 'error');
        if (status === 401) {
          localStorage.removeItem('userDetails');
          window.location.reload();
        }
      }
    // } else {
    //   swal('Error', 'Please add some details', 'error');
    //   return;
    // }
  };

  return (
    <>
      <PageTitle activeMenu='Add' motherMenu='Movie' pageContent='Add Movie' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Other Details</h4>
            </div>
            <div className='card-body'>
              <div className='table table-responsive'>
                <table className='table'>
                  <tr>
                    <td>Type</td>
                    <td>Name</td>
                    <td>Designation</td>
                    <td>Season</td>
                    <td>Action</td>
                  </tr>
                  {allValues.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.type === '1'
                          ? 'Producer'
                          : item.type === '2'
                          ? 'Music'
                          : item.type === '3'
                          ? 'Cinemotography'
                          : item.type === '4'
                          ? 'Film Edit'
                          : item.type === '5'
                          ? 'Art Direction'
                          : ''}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.designation}</td>
                      <td>{item.season}</td>
                      <td>
                        <button
                          className='btn btn-danger'
                          style={{ background: '#ff0000' }}
                          onClick={() =>
                            setAllValues(allValues.filter((i) => i !== item))
                          }>
                          <span className='fa fa-trash'></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor=''>Type</label>
                    <select
                      name='type'
                      className='form-control'
                      id=''
                      required={false}
                      onChange={(e) => handleChange(e)}>
                      <option value=''>------</option>
                      <option value='1'>Producer</option>
                      <option value='2'>Music</option>
                      <option value='3'>Cinemotography</option>
                      <option value='4'>Film Edit</option>
                      <option value='5'>Art Direction</option>
                    </select>
                  </div>
                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor=''>Name</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Name'
                      name='name'
                      required={false}
                      value={values.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor=''>Designation</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Designation'
                      name='designation'
                      required={false}
                      value={values.designation}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-3 mb-3'>
                    <label htmlFor=''>Season</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Season'
                      name='season'
                      value={values.season}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div
                    className='form-col-md-12 mt-3 d-flex '
                    style={{ justifyContent: 'space-between' }}>
                    <button type='submit' className='btn btn-primary'>
                      Add
                    </button>

                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className='btn btn-primary'
                        type='button'
                        onClick={() => saveHandler()}>
                        Submit
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

export default AddMovie4;
