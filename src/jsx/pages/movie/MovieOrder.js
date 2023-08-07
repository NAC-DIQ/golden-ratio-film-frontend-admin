import React, { useState, useRef, useEffect } from 'react';
import PageTitle from '../../layouts/PageTitle';
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import axios from 'axios';
import { API_URL } from '../../../config';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import swal from 'sweetalert';

const MovieOrder = () => {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [values, setValues] = useState([]);
  const [orderedMovies, setOrderedMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const userDetails = localStorage.getItem('userDetails');
  const user = JSON.parse(userDetails);
  const token = user.token;
  const header = {
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  };
  // use effect
  useEffect(() => {
    fetchMovies();
    fetchOrderedMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get(`${API_URL}movie`, header);
    console.log(response);
    setMovies(response.data);
  };
  const fetchOrderedMovies = async () => {
    const response = await axios.get(`${API_URL}movie/order/view`, header);
    setOrderedMovies(response.data);
    setIsLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}movie/order/add`, values, header);
      const data = res.data;

      // add to ordered movies
      const newOrderedMovies = [...orderedMovies, data];

      setOrderedMovies(newOrderedMovies);

      swal('Success', 'Movie Order Updated Successfully', 'success');
    } catch (error) {
      swal('Oops !', 'Something went wrong', 'error');
    }
  };

  const handleChange = (e) => {
    // change the state value of the input by name
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    // confirm with sweet alert
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this allocation!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await axios.delete(
            `${API_URL}movie/order/delete/${id}`,
            header
          );
          const data = res.data;

          // remove from ordered movies
          const newOrderedMovies = orderedMovies.filter(
            (movie) => movie._id !== id
          );

          setOrderedMovies(newOrderedMovies);

          swal('Success', 'Movie Allocation Deleted Successfully', 'success');
        } catch (error) {
          const { status } = error.response;

          swal('Error', 'Something Went Wrong', 'error');
          if (status === 401) {
            localStorage.removeItem('userDetails');
            window.location.reload();
          }
        }
      }
    });
  };

  return (
    <>
      <PageTitle
        activeMenu='Allocate'
        motherMenu='Movies'
        pageContent='Allocate Movies'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Movies</h4>
            </div>
            {isLoaded && (
              <div className='card-body'>
                <div className='row'>
                  <div className='table-responsive'>
                    <table className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Movie Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderedMovies.map((movie) => (
                          <tr key={movie._id}>
                            <td>{movie.type}</td>
                            <td>{movie.movie?.title}</td>
                            <td>
                              <button
                                className='btn btn-primary btn-xs'
                                onClick={() => handleDelete(movie._id)}>
                                <i className='fa fa-trash'></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {isLoaded ? (
              <div className='card-body'>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className='row'>
                    <div className='form-group col-sm-6'>
                      <label>Type</label>
                      <select
                        name='type'
                        id=''
                        className='form-control'
                        required
                        onChange={(e) => handleChange(e)}>
                        <option value=''>Select Type</option>
                        <option value='upcoming'>upcoming</option>
                        <option value='featured'>featured</option>
                      </select>
                    </div>
                    <div className='form-group col-sm-6'>
                      <label>Movie</label>
                      <select
                        className='form-control'
                        name='id'
                        required
                        onChange={(e) => handleChange(e)}>
                        <option value=''>Select Movie</option>
                        {movies.map((movie) => (
                          <option key={movie._id} value={movie._id}>
                            {movie.title} - ({movie.genre})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-sm-6 mt-5'>
                      <button type='submit' className='btn  btn-primary'>
                        Allocate
                      </button>
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

export default MovieOrder;
