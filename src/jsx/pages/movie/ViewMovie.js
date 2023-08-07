import React, { useState, useEffect } from 'react';
import PageTitle from '../../layouts/PageTitle';
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import axios from 'axios';
import { API_URL } from '../../../config';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import swal from 'sweetalert';
import moment from 'moment';

const ViewMovie = () => {
  const history = useHistory();
  const [movies, setMovie] = useState([]);
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
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const response = await axios.get(`${API_URL}movie`, header);
    setMovie(response.data);
    setIsLoaded(true);
    $('#example').DataTable();
  };
  const handleDelete = async (id) => {
    const result = await swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    if (result) {
      try {
        await axios.delete(`${API_URL}movie/${id}`, header);
        swal('Success', 'Movie Deleted Successfully', 'success');
        setMovie(movies.filter((movie) => movie._id !== id));
      } catch (error) {
        const { status } = error.response;

        swal('Error', 'Something Went Wrong', 'error');
        if (status === 401) {
          localStorage.removeItem('userDetails');
          window.location.reload();
        }
      }
    }
  };
  const handleEdit = (id) => {
    history.push(`/movie-edit/${id}`);
  };
  const handleView = (id) => {
    history.push(`/movie-view/${id}`);
  };

  return (
    <>
      <PageTitle
        activeMenu='View'
        motherMenu='Movie'
        pageContent='View Movie'
      />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>View Movie</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <div id='job_data' className='dataTables_wrapper'>
                  {isLoaded ? (
                    <table id='example' className='display'>
                      <thead>
                        <tr>
                          <th>Release Date</th>
                          <th>Movie Title</th>
                          <th>Image</th>
                          <th>Genre</th>
                          <th>Category</th>
                          <th>Trailer</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movies.map(
                          ({
                            _id,
                            title,
                            releaseDate,
                            image,
                            genre,
                            category,
                            trailer,
                            createdAt,
                          }) => (
                            <tr key={_id}>
                              <td>
                                {releaseDate ? moment(releaseDate).format('D-MM-YYYY') :'Not Given' }
                              </td>
                              <td>{title}</td>
                              <td>
                                <img
                                  className='img-responsive img '
                                  width='55'
                                  height='55'
                                  src={image}
                                  style={{ borderRadius: '50%' }}
                                  alt=''
                                />
                              </td>
                              <td>{genre}</td>
                              <td>{category}</td>
                              <td>
                                <a href={trailer} target='_blank'>
                                  <span className='fab fa-youtube fa-2x'></span>
                                </a>
                              </td>

                              <td>{createdAt}</td>
                              <td>
                                <span
                                  className='btn btn-success shadow btn-xs sharp me-1'
                                  onClick={() => handleView(_id)}>
                                  <i className='fa fa-eye'></i>
                                </span>
                                <span
                                  className='btn btn-dark shadow btn-xs sharp me-1'
                                  onClick={() => handleEdit(_id)}>
                                  <i className='fa fa-pen'></i>
                                </span>
                                <span
                                  className='btn btn-danger shadow btn-xs sharp'
                                  onClick={() => handleDelete(_id)}>
                                  <i className='fa fa-trash'></i>
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMovie;
