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

const EditMovie3 = () => {
  const initialValues = [];
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const { movie_id } = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    setSubmitting(true);

    // axios
    try {
      let res = await axios.post(
        `${API_URL}movie/production/${movie_id}`,
        values,
        header
      );
      swal('Success', 'Production added successfully', 'success');
      history.push(`/movie-edit/4/${movie_id}`);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${API_URL}movie/${movie_id}`, header);

      if (res.data?.production.length > 0) {
        let length = res.data?.production.length;
        // get a last index values of production and store it to movieProductions
        let lastIndex = res.data?.production[length - 1];
        setValues(lastIndex);
      } else {
        setValues(res.data.production);
      }
    } catch (error) {
      swal('Error', 'Something Went Wrong', 'error');
    }
  };

  return (
    <>
      <PageTitle
        activeMenu='Edit'
        motherMenu='Movie'
        pageContent='Edit Movie'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Edit Production Details</h4>
            </div>

            <div className='card-body'>
              <form
                onSubmit={(e) => handleSubmit(e)}
                encType='multipart/form-data'>
                <div className='row'>
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Directed By</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Directed By'
                      name='directed_by'
                      required
                      value={values.directed_by}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Written By</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Written By'
                      name='written_by'
                      required
                      value={values.written_by}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Country of Origin</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Country of Origin'
                      name='country_of_origin'
                      required
                      value={values.country_of_origin}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Language</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Language'
                      name='language'
                      required
                      value={values.language}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-group col-md-4 mb-3'>
                    <label htmlFor=''>Run Time</label>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Run Time'
                      name='run_time'
                      required
                      value={values.run_time}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div
                    className='form-col-md-12 mt-3 d-flex '
                    style={{ justifyContent: 'space-between' }}>
                    {submitting ? (
                      <LoadingButton />
                    ) : (
                      <button type='submit' className='btn btn-primary'>
                        Save
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

export default EditMovie3;
