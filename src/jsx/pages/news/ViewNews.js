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
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import swal from 'sweetalert';

const ViewNews = () => {
  const history = useHistory();
  const [newses, setNews] = useState([]);
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
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const response = await axios.get(`${API_URL}news`);
    setNews(response.data);
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
        await axios.delete(`${API_URL}news/${id}`, header);
        swal('Success', 'News Deleted Successfully', 'success');
        setNews(newses.filter((news) => news._id !== id));
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
    history.push(`/news-edit/${id}`);
  };

  return (
    <>
      <PageTitle activeMenu='View' motherMenu='News' pageContent='View News' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>View News</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <div id='job_data' className='dataTables_wrapper'>
                  {isLoaded ? (
                    <table id='example' className='display'>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Created By</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newses.map(
                          ({
                            _id,
                            type,
                            title,
                            image,
                            content,
                            category,
                            createdAt,
                            createdBy,
                          }) => (
                            <tr key={_id}>
                              <td>{type === '1' ? `Main News` : `Top News`}</td>
                              <td>
                                <img
                                  className='img-responsive img'
                                  width='55'
                                  height='55'
                                  src={image}
                                  alt=''
                                />
                              </td>
                              <td>{title}</td>
                              <td>{category?.title}</td>
                              <td>{createdBy?.name}</td>
                              <td>{createdAt}</td>
                              <td>
                                <a
                                  className='btn btn-success shadow btn-xs sharp me-1'
                                  href={content}
                                  target='_blank'>
                                  <i className='fa fa-eye'></i>
                                </a>
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

export default ViewNews;
